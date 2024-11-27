import { SetupServerApi, setupServer } from 'msw/node';
import {
  config,
  workflowsBackendResponse,
  workflowsTriggerBackendResponse,
  workflowsFoldersBackendResponse
} from '../mocks/mockWorkflowsData';
import {
  error401ResponseHandler,
  error403ResponseHandler,
  error404ResponseHandler,
  error500ResponseHandler,
  mockTestHandlers,
} from '../mocks/mock.test.handlers';
import { ReleaseConfig } from '../service/releaseInstanceConfig';
import { WorkflowsOverviewApi } from './WorkflowsOverviewApi';
import { mockServices } from '@backstage/backend-test-utils';

function configureMockServer(): SetupServerApi {
  const server = setupServer();

  beforeAll(() => {
    // Start the interception.
    server.listen();
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

describe('WorkflowsOverviewApi', () => {
  const server = configureMockServer();
  server.resetHandlers(...mockTestHandlers);
// Workflows API Success CASES
  it('redirects to workflow run page successfully', async () => {
    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    const redirectUrl = await workflowsOverviewApi.redirectToWorkflowRunPage(
      'default',
      'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf',
      'AWS Lambda setup function with Digital.ai Deploy',
    );

    expect(redirectUrl).toEqual(workflowsTriggerBackendResponse.url);
  });

  it('gets workflows overview successfully', async () => {
    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    const workflows = await workflowsOverviewApi.getWorkflowsOverviewApi(
      'default',
      '1',
      '1',
      'test',
      ['cat1', 'cat2'],
      'author1',
    );

    expect(workflows).toEqual(workflowsBackendResponse);
  });

  it('gets workflow folder list successfully', async () => {
    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    const folders = await workflowsOverviewApi.getWorkflowsFolderListApi('invalidInstance',
      '0',
      '1'
    );

    expect(folders).toEqual(workflowsFoldersBackendResponse);
  });

// Workflows API Errors for CASES without instances
  it('Throws error if instance is not in config for redirects to workflow run page', async () => {
    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () =>
        await workflowsOverviewApi.redirectToWorkflowRunPage(
          'invalidInstance',
          'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf',
          'AWS Lambda setup function with Digital.ai Deploy',
        ),
    ).rejects.toThrow(
      "Couldn't find a release instance 'invalidInstance' in the config",
    );
  });

  it('throws error if instance is not in config for getWorkflowsOverviewApi', async () => {
    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () =>
        await workflowsOverviewApi.getWorkflowsOverviewApi(
          'invalidInstance',
          '0',
          '10',
          'test',
          ['cat1', 'cat2'],
          'author1',
        ),
    ).rejects.toThrow(
      "Couldn't find a release instance 'invalidInstance' in the config",
    );
  });

  it('throws error if instance is not in config for Get workflow list', async () => {
    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () =>
        await workflowsOverviewApi.getWorkflowsFolderListApi(
              '0',
              '1'
            ),
    ).rejects.toThrow(
      "Couldn't find a release instance 'invalidInstance' in the config",
    );
  });

// Redirects to workflow overall api Tests
  it('Get 401 response from releases for Workflow Overall API', async () => {
    server.resetHandlers(...error401ResponseHandler);

    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () =>
        await workflowsOverviewApi.getWorkflowsOverviewApi(
          'default',
          '0',
          '10',
          'test',
          ['cat1', 'cat2'],
          'author1',
        ),
    ).rejects.toThrow(
      'Access Denied: Missing or invalid release Token. Unauthorized to Use Digital.ai Release',
    );
  });

  it('Get 403 response from releases from Workflow API', async () => {
    server.resetHandlers(...error403ResponseHandler);
    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () =>
        await workflowsOverviewApi.getWorkflowsOverviewApi(
          'default',
          '0',
          '10',
          'test',
          ['cat1', 'cat2'],
          'author1',
        ),
    ).rejects.toThrow(
      'Permission denied or the requested functionality is not supported',
    );
  });

  it('Get 404 response from releases from Workflow API', async () => {
    server.resetHandlers(...error404ResponseHandler);

    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () =>
        await workflowsOverviewApi.getWorkflowsOverviewApi(
          'default',
          '0',
          '10',
          'test',
          ['cat1', 'cat2'],
          'author1',
        ),
    ).rejects.toThrow('Release service request not found');
  });

  it('Get 500 response from releases from Workflow API', async () => {
    server.resetHandlers(...error500ResponseHandler);

    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () =>
        await workflowsOverviewApi.getWorkflowsOverviewApi(
          'default',
          '0',
          '10',
          'test',
          ['cat1', 'cat2'],
          'author1',
        ),
    ).rejects.toThrow('failed to fetch data, status 500 Unexpected error');
  });
// Redirects to workflow run page Error Case Tests
  it('Get 401 response from releases for redirects to workflow run', async () => {
    server.resetHandlers(...error401ResponseHandler);

    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () =>
        await workflowsOverviewApi.redirectToWorkflowRunPage(
          'default',
          'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf',
          'AWS Lambda setup function with Digital.ai Deploy',
        ),
    ).rejects.toThrow(
      'Access Denied: Missing or invalid release Token. Unauthorized to Use Digital.ai Release',
    );
  });

  it('Get 403 response from releases from redirects to workflow run', async () => {
    server.resetHandlers(...error403ResponseHandler);
    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () =>
        await workflowsOverviewApi.redirectToWorkflowRunPage(
          'default',
          'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf',
          'AWS Lambda setup function with Digital.ai Deploy',
        ),
    ).rejects.toThrow(
      'Permission denied or the requested functionality is not supported',
    );
  });

  it('Get 404 response from releases from redirects to workflow run', async () => {
    server.resetHandlers(...error404ResponseHandler);

    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () =>
        await workflowsOverviewApi.redirectToWorkflowRunPage(
          'default',
          'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf',
          'AWS Lambda setup function with Digital.ai Deploy',
        ),
    ).rejects.toThrow('Release service request not found');
  });

  it('Get 500 response from releases from redirects to workflow run', async () => {
    server.resetHandlers(...error500ResponseHandler);

    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () =>
        await workflowsOverviewApi.redirectToWorkflowRunPage(
          'default',
          '0',
          '1'
        ),
    ).rejects.toThrow('failed to fetch data, status 500 Unexpected error');
  });
// Redirects to workflow Get Folder Error Case Tests
  it('Get 401 response from releases for get workflow folder', async () => {
    server.resetHandlers(...error401ResponseHandler);

    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () =>
        await workflowsOverviewApi.getWorkflowsFolderListApi(
          'default',
          '0',
          '1'
        ),
    ).rejects.toThrow(
      'Access Denied: Missing or invalid release Token. Unauthorized to Use Digital.ai Release',
    );
  });

  it('Get 403 response from releases for get workflow folder', async () => {
    server.resetHandlers(...error403ResponseHandler);
    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () =>
        await workflowsOverviewApi.getWorkflowsFolderListApi(
          'default',
          '0',
          '1'
        ),
    ).rejects.toThrow(
      'Permission denied or the requested functionality is not supported',
    );
  });

  it('Get 404 response from releases for get workflow folder', async () => {
    server.resetHandlers(...error404ResponseHandler);

    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () =>
        await workflowsOverviewApi.getWorkflowsFolderListApi(
          'default',
          '0',
          '1'
        ),
    ).rejects.toThrow('Release service request not found');
  });

  it('Get 500 response from releases for get workflow folder', async () => {
    server.resetHandlers(...error500ResponseHandler);

    const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () =>
        await workflowsOverviewApi.getWorkflowsFolderListApi(
          'default',
          '0',
          '1'
        ),
    ).rejects.toThrow('failed to fetch data, status 500 Unexpected error');
  });
});
