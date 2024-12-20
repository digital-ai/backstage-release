import { SetupServerApi, setupServer } from 'msw/node';
import {
  error401ResponseHandler,
  error403ResponseHandler,
  error404ResponseHandler,
  error500ResponseHandler,
  mockTestHandlers,
} from '../mocks/mock.test.handlers';
import { FolderBackendResponse } from '@digital-ai/plugin-dai-release-common';
import { FoldersApi } from './FoldersApi';
import { ReleaseConfig } from '../service/releaseInstanceConfig';
import { config } from '../mocks/mockData';
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

describe('Backend API tests for Folders in Release', () => {
  const server = configureMockServer();
  server.resetHandlers(...mockTestHandlers);

  it('Should get folders from Release API', async () => {
    const foldersApi = FoldersApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    const folderList: FolderBackendResponse =
      await foldersApi.getFoldersListApi('default');
    expect(folderList.totalPages).toEqual(0);
    expect(folderList.totalElements).toEqual(3);
  });

  it('Get 401 response from get folders from Release API', async () => {
    server.resetHandlers(...error401ResponseHandler);

    const foldersApi = FoldersApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () => await foldersApi.getFoldersListApi('default'),
    ).rejects.toThrow(
      'Access Denied: Missing or invalid release Token. Unauthorized to Use Digital.ai Release',
    );
  });

  it('Get 403 response from get folders from Release API', async () => {
    server.resetHandlers(...error403ResponseHandler);

    const foldersApi = FoldersApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () => await foldersApi.getFoldersListApi('default'),
    ).rejects.toThrow(
      'Permission denied or the requested functionality is not supported',
    );
  });

  it('Get 404 response from get folders from Release API', async () => {
    server.resetHandlers(...error404ResponseHandler);

    const foldersApi = FoldersApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () => await foldersApi.getFoldersListApi('default'),
    ).rejects.toThrow('Release service request not found');
  });

  it('Get 500 response from get folders from release API', async () => {
    server.resetHandlers(...error500ResponseHandler);

    const foldersApi = FoldersApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () => await foldersApi.getFoldersListApi('default'),
    ).rejects.toThrow('failed to fetch data, status 500 Unexpected error');
  });
});
