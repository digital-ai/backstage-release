import { SetupServerApi, setupServer } from 'msw/node';
import {
  error401ResponseHandler,
  error403ResponseHandler,
  error404ResponseHandler,
  error500ResponseHandler,
  mockTestHandlers,
} from '../mocks/mock.test.handlers';
import { releaseConfig, releasesBackendApiResponse } from '../mocks/mockData';
import { ReleaseList } from '@digital-ai/plugin-dai-release-common';
import { ReleaseOverviewApi } from './ReleaseOverviewApi';
import { getVoidLogger } from '@backstage/backend-common';

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

describe('Backend API tests for Releases', () => {
  const server = configureMockServer();
  server.resetHandlers(...mockTestHandlers);

  it('Should throw error if instance is not in config', async () => {
    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      releaseConfig,
      getVoidLogger(),
    );

    await expect(
      async () =>
        await releaseOverviewApi.getReleases(
          'true',
          'true',
          'true',
          'true',
          'true',
          'true',
          'true',
          '',
          '',
          '',
          'risk',
          '0',
          '100',
          'default2',
        ),
    ).rejects.toThrow(
      "Couldn't find a release instance 'default2' in the config",
    );
  });

  it('Should get releases from Release API', async () => {
    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      releaseConfig,
      getVoidLogger(),
    );

    const releaseList: ReleaseList = await releaseOverviewApi.getReleases(
      'true',
      'true',
      'true',
      'true',
      'true',
      'true',
      'true',
      '',
      '',
      '',
      'risk',
      '0',
      '100',
      'default',
    );

    expect(releaseList.total).toEqual(releasesBackendApiResponse.total);
    expect(releaseList.releases).toEqual(releasesBackendApiResponse.releases);
  });

  it('Get 401 response from releases from Release API', async () => {
    server.resetHandlers(...error401ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      releaseConfig,
      getVoidLogger(),
    );

    await expect(
      async () =>
        await releaseOverviewApi.getReleases(
          'true',
          'true',
          'true',
          'true',
          'true',
          'true',
          'true',
          '',
          '',
          '',
          'risk',
          '0',
          '100',
          'default',
        ),
    ).rejects.toThrow(
      'Access Denied: Missing or invalid release Token. Unauthorized to Use Digital.ai Release',
    );
  });

  it('Get 403 response from releases from Release API', async () => {
    server.resetHandlers(...error403ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      releaseConfig,
      getVoidLogger(),
    );

    await expect(
      async () =>
        await releaseOverviewApi.getReleases(
          'true',
          'true',
          'true',
          'true',
          'true',
          'true',
          'true',
          '',
          '',
          '',
          'risk',
          '0',
          '100',
          'default',
        ),
    ).rejects.toThrow(
      'Permission Denied: The configured release User lacks necessary permission in Digital.ai Release',
    );
  });

  it('Get 404 response from getReleases from Release API', async () => {
    server.resetHandlers(...error404ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      releaseConfig,
      getVoidLogger(),
    );
    await expect(
      async () =>
        await releaseOverviewApi.getReleases(
          'true',
          'true',
          'true',
          'true',
          'true',
          'true',
          'true',
          '',
          '',
          '',
          'risk',
          '0',
          '100',
          'default',
        ),
    ).rejects.toThrow('Release service request not found');
  });

  it('Get 500 response from getReleases from Release API', async () => {
    server.resetHandlers(...error500ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      releaseConfig,
      getVoidLogger(),
    );

    await expect(
      async () =>
        await releaseOverviewApi.getReleases(
          'true',
          'true',
          'true',
          'true',
          'true',
          'true',
          'true',
          '',
          '',
          '',
          'risk',
          '0',
          '100',
          'default',
        ),
    ).rejects.toThrow('failed to fetch data, status 500 Unexpected error');
  });
});
