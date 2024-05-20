import {
  AuthorizeResult,
  PermissionEvaluator,
} from '@backstage/plugin-permission-common';
import {
  error403ResponseHandler,
  error404ResponseHandler,
  error500ResponseHandler,
  mockTestHandlers,
} from '../mocks/mock.test.handlers';
import {
  config,
  releaseInstanceConfigResponse,
  releasesBackendApiResponse,
} from '../mocks/mockData';
import { createRouter } from './router';
import express from 'express';
import { getVoidLogger } from '@backstage/backend-common';
import request from 'supertest';
import { setupServer } from 'msw/node';

let app: express.Express;
const permissionApi = {
  authorize: jest.fn(),
  authorizeConditional: jest.fn(),
} as unknown as PermissionEvaluator;

function configureMockServer(permission: boolean) {
  const server = setupServer();

  beforeAll(async () => {
    if (permission) {
      const router = await createRouter({
        config: config,
        logger: getVoidLogger(),
        permissions: permissionApi,
      });
      app = express().use(router);
    } else {
      const router = await createRouter({
        config: config,
        logger: getVoidLogger(),
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
      console.log(response.body.error.message);
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
        'Permission Denied: The configured release User lacks necessary permission in Digital.ai Release',
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
});
