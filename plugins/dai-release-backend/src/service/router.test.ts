import {
  FoldersListBackendResponse,
  config,
  releaseInstanceConfigResponse,
  releasesBackendApiResponse,
} from '../mocks/mockData';
import {
  HttpAuthService,
  PermissionsService,
} from '@backstage/backend-plugin-api';
import {
  error403ResponseHandler,
  error404ResponseHandler,
  error500ResponseHandler,
  mockTestHandlers,
} from '../mocks/mock.test.handlers';
import {
  templateBackendPluginApiResponse,
  templateGitMetaInfoResponse,
} from '../mocks/mockTemplateData';
import {
  workflowsBackendResponse,
  workflowsRedirectRequest,
  workflowsRedirectRequestError,
  workflowsTriggerBackendResponse,
} from '../mocks/mockWorkflowsData';
import { AuthorizeResult } from '@backstage/plugin-permission-common';
import { categoriesBackendPluginApiResponse } from '../mocks/mockCategories';
import { createRouter } from './router';
import express from 'express';
import { mockServices } from '@backstage/backend-test-utils';
import request from 'supertest';
import { setupServer } from 'msw/node';

let app: express.Express;
const permissionApi = {
  authorize: jest.fn(),
  authorizeConditional: jest.fn(),
} as unknown as PermissionsService;

function configureMockServer(permission: boolean) {
  const server = setupServer();

  beforeAll(async () => {
    if (permission) {
      const router = await createRouter({
        config: config,
        logger: mockServices.logger.mock(),
        httpAuth: {
          credentials: jest.fn().mockResolvedValue({}),
        } as unknown as HttpAuthService,
        permissions: permissionApi,
      });
      app = express().use(router);
    } else {
      const router = await createRouter({
        config: config,
        logger: mockServices.logger.mock(),
        httpAuth: mockServices.httpAuth.mock(),
      });
      app = express().use(router);
    }
    // Start the interception.
    server.listen();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    if (permission) {
      jest.spyOn(permissionApi, 'authorize').mockImplementation(async () => [
        {
          result: AuthorizeResult.ALLOW,
        },
      ]);
    }
  });

  afterEach(() => {
    // Remove any mockTestHandlers you may have added
    // in individual tests (runtime mockTestHandlers).
    server.resetHandlers();
  });

  afterAll(() => {
    // Disable request interception and clean up.
    server.close();
  });

  return server;
}

describe('router api tests with permissions ALLOW', () => {
  const server = configureMockServer(true);
  server.resetHandlers(...mockTestHandlers);

  describe('GET /health', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('GET /releases with instance name input', () => {
    it('returns ok', async () => {
      const response = await request(app)
        .get('/releases')
        .query('instanceName=default')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(releasesBackendApiResponse);
    });

    it('GET 404 from release for /releases', async () => {
      server.resetHandlers(...error404ResponseHandler);
      const response = await request(app)
        .get('/releases')
        .query('instanceName=default');
      expect(response.body.error.message).toEqual(
        'Release service request not found',
      );
    });

    it('GET 403 from release for /releases', async () => {
      server.resetHandlers(...error403ResponseHandler);
      const response = await request(app)
        .get('/releases')
        .query('instanceName=default');
      expect(response.status).toEqual(403);
      expect(response.body.error.message).toContain(
        'Permission denied or the requested functionality is not supported',
      );
    });

    it('GET 500 from release for /releases', async () => {
      server.resetHandlers(...error500ResponseHandler);
      const response = await request(app)
        .get('/releases')
        .query('instanceName=default');
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        'failed to fetch data, status 500',
      );
    });
  });

  describe('GET /templates with instance name input', () => {
    it('returns ok', async () => {
      server.resetHandlers(...mockTestHandlers);
      const response = await request(app)
        .get('/templates')
        .query('instanceName=default')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(templateBackendPluginApiResponse);
    });

    describe('GET /folders with instance name input', () => {
      it('returns ok', async () => {
        server.resetHandlers(...mockTestHandlers);
        const response = await request(app)
          .get('/folders')
          .query({
            instanceName: 'default',
          })
          .set('authorization', 'Bearer someauthtoken');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(FoldersListBackendResponse);
      });
    });

    it('GET 404 from release for /templates', async () => {
      server.resetHandlers(...error404ResponseHandler);
      const response = await request(app)
        .get('/templates')
        .query('instanceName=default');
      expect(response.body.error.message).toEqual(
        'Release service request not found',
      );
    });

    it('GET 403 from release for /templates', async () => {
      server.resetHandlers(...error403ResponseHandler);
      const response = await request(app)
        .get('/templates')
        .query('instanceName=default');
      expect(response.status).toEqual(403);
      expect(response.body.error.message).toContain(
        'Permission denied or the requested functionality is not supported',
      );
    });

    it('GET 500 from release for /templates', async () => {
      server.resetHandlers(...error500ResponseHandler);
      const response = await request(app)
        .get('/templates')
        .query('instanceName=default');
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        'failed to fetch data, status 500',
      );
    });
  });

  describe('GET /categories with instance name input', () => {
    it('returns ok', async () => {
      server.resetHandlers(...mockTestHandlers);
      const response = await request(app)
        .get('/categories')
        .query('instanceName=default')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(categoriesBackendPluginApiResponse);
    });

    it('GET 404 from release for /categories', async () => {
      server.resetHandlers(...error404ResponseHandler);
      const response = await request(app)
        .get('/categories')
        .query('instanceName=default');
      expect(response.body.error.message).toEqual(
        'Release service request not found',
      );
    });

    it('GET 403 from release for /categories', async () => {
      server.resetHandlers(...error403ResponseHandler);
      const response = await request(app)
        .get('/categories')
        .query('instanceName=default');
      expect(response.status).toEqual(403);
      expect(response.body.error.message).toContain(
        'Permission denied or the requested functionality is not supported',
      );
    });

    it('GET 500 from release for /categories', async () => {
      server.resetHandlers(...error500ResponseHandler);
      const response = await request(app)
        .get('/categories')
        .query('instanceName=default');
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        'failed to fetch data, status 500',
      );
    });
  });

  describe('GET /instances', () => {
    it('returns ok', async () => {
      const response = await request(app)
        .get('/instances')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(releaseInstanceConfigResponse);
    });
  });

  describe('GET /releases without instance name input', () => {
    it('returns ok', async () => {
      const response = await request(app)
        .get('/releases')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        "Couldn't find a release instance '' in the config",
      );
    });
  });

  describe('GET /templates without instance name input', () => {
    it('returns ok', async () => {
      const response = await request(app)
        .get('/templates')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        "Couldn't find a release instance '' in the config",
      );
    });
  });

  describe('GET /categories without instance name input', () => {
    it('returns ok', async () => {
      const response = await request(app)
        .get('/categories')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        "Couldn't find a release instance '' in the config",
      );
    });
  });

  describe('GET /folders without instance name input', () => {
    it('returns error for no instance name', async () => {
      const response = await request(app)
        .get('/folders')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        "Couldn't find a release instance '' in the config",
      );
    });
  });

  describe('POST /workflows without instance name input', () => {
    it('POST 500 from release for /workflows', async () => {
      const response = await request(app)
        .post('/workflows')
        .query({
          pageNumber: '1',
          resultsPerPage: '10',
        })
        .set('authorization', 'Bearer someauthtoken')
        .send({
          searchInput: 'test',
          categories: ['cat1', 'cat2'],
          author: 'author1',
        });
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        "Couldn't find a release instance '' in the config",
      );
    });
  });

  describe('POST /workflow/redirect without instance name', () => {
    it('POST 500 from release for /workflow/redirect', async () => {
      const response = await request(app)
        .post('/workflow/redirect')
        .set('authorization', 'Bearer someauthtoken')
        .send(workflowsRedirectRequest);
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        "Couldn't find a release instance '' in the config",
      );
    });
  });

  describe('POST /workflow/redirect', () => {
    it('POST 500 from release for /workflow/redirect due to User permission', async () => {
      const response = await request(app)
        .post('/workflow/redirect')
        .set('authorization', 'Bearer someauthtoken')
        .send(workflowsRedirectRequestError);
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        "Couldn't find a release instance '' in the config",
      );
    });
  });

  describe('GET /folders and emulate 500 Error', () => {
    it('GET 500 from Get Folders Data', async () => {
      const response = await request(app)
        .get('/folders')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(500);
      expect(response.body.error.message).toContain(
        "Couldn't find a release instance '' in the config",
      );
    });
  });
});

describe('router api tests - with permissions DENY', () => {
  const server = configureMockServer(true);
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(permissionApi, 'authorize').mockImplementation(async () => [
      {
        result: AuthorizeResult.DENY,
      },
    ]);
  });
  server.resetHandlers(...mockTestHandlers);
  describe('GET /releases', () => {
    it('GET 403 from release for /releases', async () => {
      server.resetHandlers(...error403ResponseHandler);
      const response = await request(app).get('/releases');
      expect(response.status).toEqual(403);
      expect(response.body.error.message).toContain(
        'Access Denied: Unauthorized to access the Backstage Release plugin',
      );
    });
  });
  describe('GET /templates', () => {
    it('GET 403 from release for /templates', async () => {
      server.resetHandlers(...error403ResponseHandler);
      const response = await request(app).get('/templates');
      expect(response.status).toEqual(403);
      expect(response.body.error.message).toContain(
        'Access Denied: Unauthorized to access the Backstage Release plugin',
      );
    });
  });
  describe('GET /categories', () => {
    it('GET 403 from release for /categories', async () => {
      server.resetHandlers(...error403ResponseHandler);
      const response = await request(app).get('/categories');
      expect(response.status).toEqual(403);
      expect(response.body.error.message).toContain(
        'Access Denied: Unauthorized to access the Backstage Release plugin',
      );
    });
  });
  describe('POST /workflows', () => {
    it('POST 403 from release for /workflows', async () => {
      server.resetHandlers(...error403ResponseHandler);
      const response = await request(app)
        .post('/workflows')
        .query({
          instanceName: 'Production',
          pageNumber: '1',
          resultsPerPage: '10',
        })
        .set('authorization', 'Bearer someauthtoken')
        .send({
          searchInput: 'test',
          categories: ['cat1', 'cat2'],
          author: 'author1',
        });
      expect(response.status).toEqual(403);
      expect(response.body.error.message).toContain(
        'Access Denied: Unauthorized to access the Backstage Release plugin',
      );
    });
  });
  describe('POST /workflow/redirect', () => {
    it('POST 403 from release for /workflow/redirect', async () => {
      const response = await request(app)
        .post('/workflow/redirect')
        .query({
          instanceName: 'default',
        })
        .set('authorization', 'Bearer someauthtoken')
        .send(workflowsRedirectRequest);
      expect(response.status).toEqual(403);
      expect(response.body.error.message).toContain(
        'Access Denied: Unauthorized to access the Backstage Release plugin',
      );
    });
  });
  describe('GET /folders', () => {
    it('GET 403 from Get Folders Data', async () => {
      const response = await request(app)
        .get('/folders')
        .query({
          instanceName: 'default',
        })
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(403);
      expect(response.body.error.message).toContain(
        'Access Denied: Unauthorized to access the Backstage Release plugin',
      );
    });
  });
});

describe('router api tests - without permissions', () => {
  const server = configureMockServer(false);
  server.resetHandlers(...mockTestHandlers);
  describe('GET /releases', () => {
    it('returns ok', async () => {
      const response = await request(app)
        .get('/releases')
        .query('instanceName=default')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(releasesBackendApiResponse);
    });
  });
  describe('GET /templates', () => {
    it('returns ok', async () => {
      const response = await request(app)
        .get('/templates')
        .query('instanceName=default')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(templateBackendPluginApiResponse);
    });
  });
  describe('GET /template/meta', () => {
    it('GET GIT meta information of template', async () => {
      const response = await request(app)
        .get('/template/meta')
        .query('instanceName=default&folderId=Applications/Folder1')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(templateGitMetaInfoResponse);
    });
  });
  describe('GET /categories', () => {
    it('returns ok', async () => {
      const response = await request(app)
        .get('/categories')
        .query('instanceName=default')
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(categoriesBackendPluginApiResponse);
    });
  });
  describe('POST /workflows', () => {
    it('Get workflows data from release', async () => {
      const response = await request(app)
        .post('/workflows')
        .query({
          instanceName: 'default',
          pageNumber: '1',
          resultsPerPage: '10',
        })
        .set('authorization', 'Bearer someauthtoken')
        .send({
          searchInput: 'test',
          categories: ['cat1', 'cat2'],
          author: 'author1',
        });
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(workflowsBackendResponse);
    });
  });

  describe('POST /workflow/redirect', () => {
    it('Get redirect Link', async () => {
      const response = await request(app)
        .post('/workflow/redirect')
        .query({
          instanceName: 'default',
        })
        .set('authorization', 'Bearer someauthtoken')
        .send(workflowsRedirectRequest);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(workflowsTriggerBackendResponse);
    });
  });

  describe('GET /folders', () => {
    it('returns ok', async () => {
      const response = await request(app)
        .get('/folders')
        .query({
          instanceName: 'default',
        })
        .set('authorization', 'Bearer someauthtoken');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(FoldersListBackendResponse);
    });
  });
});
