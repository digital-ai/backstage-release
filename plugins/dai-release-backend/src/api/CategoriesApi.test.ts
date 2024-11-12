import { SetupServerApi, setupServer } from 'msw/node';
import {
  error401ResponseHandler,
  error403ResponseHandler,
  error404ResponseHandler,
  error500ResponseHandler,
  mockTestHandlers,
} from '../mocks/mock.test.handlers';
import { CategoriesApi } from './CategoriesApi';
import { ReleaseCategories } from '@digital-ai/plugin-dai-release-common';
import { ReleaseConfig } from '../service/releaseInstanceConfig';
import { categoriesBackendPluginApiResponse } from '../mocks/mockCategories';
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

describe('Backend API tests for Categories', () => {
  const server = configureMockServer();
  server.resetHandlers(...mockTestHandlers);

  it('Should throw error if instance is not in config', async () => {
    const categoriesApi = CategoriesApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () => await categoriesApi.getCategoriesApi('default2'),
    ).rejects.toThrow(
      "Couldn't find a release instance 'default2' in the config",
    );
  });

  it('Should get templates from Categories API', async () => {
    const categoriesApi = CategoriesApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    const categories: ReleaseCategories =
      await categoriesApi.getCategoriesApi('default');

    expect(categories).toEqual(categoriesBackendPluginApiResponse);
  });

  it('Get 401 response from releases for Categories API', async () => {
    server.resetHandlers(...error401ResponseHandler);

    const categoriesApi = CategoriesApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () => await categoriesApi.getCategoriesApi('default'),
    ).rejects.toThrow(
      'Access Denied: Missing or invalid release Token. Unauthorized to Use Digital.ai Release',
    );
  });

  it('Get 403 response from releases for Categories API', async () => {
    server.resetHandlers(...error403ResponseHandler);

    const categoriesApi = CategoriesApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () => await categoriesApi.getCategoriesApi('default'),
    ).rejects.toThrow(
      'Permission denied or the requested functionality is not supported',
    );
  });

  it('Get 404 response from release for Categories API', async () => {
    server.resetHandlers(...error404ResponseHandler);

    const categoriesApi = CategoriesApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () => await categoriesApi.getCategoriesApi('default'),
    ).rejects.toThrow('Release service request not found');
  });

  it('Get 500 response from release for Categories API', async () => {
    server.resetHandlers(...error500ResponseHandler);

    const categoriesApi = CategoriesApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () => await categoriesApi.getCategoriesApi('default'),
    ).rejects.toThrow('failed to fetch data, status 500 Unexpected error');
  });
});
