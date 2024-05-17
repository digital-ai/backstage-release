import { SetupServerApi, setupServer } from 'msw/node';
import {
  config,
  configWithEmptyHost,
  configWithEmptyToken,
  configWithMissingToken,
  releasesBackendApiResponse, releasesFallbackBackendApiResponse,
} from '../mocks/mockData';
import {
  error401ResponseHandler,
  error403ResponseHandler,
  error404ResponseHandler,
  error500ResponseHandler,
  mockTestHandlers, mockTestHandlersfallBack,
} from '../mocks/mock.test.handlers';
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

  it('Should throw error if config hostname is empty', async () => {
    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
        configWithEmptyHost,
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
            ),
    ).rejects.toThrow(
        "Error: Invalid type in config for key 'daiRelease.host' in 'mock-config', got empty-string, wanted string",
    );
  });

  it('Should throw error if config token is empty', async () => {
    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
        configWithEmptyToken,
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
            ),
    ).rejects.toThrow(
        "Error: Invalid type in config for key 'daiRelease.token' in 'mock-config', got empty-string, wanted string",
    );
  });

  it('Should throw error if config token is missing', async () => {
    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
        configWithMissingToken,
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
            ),
    ).rejects.toThrow(
        "Error: Missing required config value at 'daiRelease.token",
    );
  });

  it('Should get releases from Release API', async () => {
    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
        config,
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
    );

    expect(releaseList.total).toEqual(releasesBackendApiResponse.total);
    expect(releaseList.releases).toEqual(releasesBackendApiResponse.releases);
  });

  it('Get 401 response from releases from Release API', async () => {
    server.resetHandlers(...error401ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
        config,
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
            ),
    ).rejects.toThrow(
        'Access Denied: Missing or invalid release Token. Unauthorized to Use Digital.ai Release',
    );
  });

  it('Get 403 response from releases from Release API', async () => {
    server.resetHandlers(...error403ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
        config,
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
            ),
    ).rejects.toThrow(
        'Permission Denied: The configured release User lacks necessary permission in Digital.ai Release',
    );
  });

  it('Get 404 response from getReleases from Release API', async () => {
    server.resetHandlers(...error404ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
        config,
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
            ),
    ).rejects.toThrow('Release service request not found');
  });

  it('Get 500 response from getReleases from Release API', async () => {
    server.resetHandlers(...error500ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
        config,
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
            ),
    ).rejects.toThrow('failed to fetch data, status 500 Unexpected error');
  });

  it('Get response from getReleases from Release API - using search api for xlr version < 24.1', async () => {
    server.resetHandlers(...mockTestHandlersfallBack);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
        config,
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
    );

    expect(releaseList.total).toEqual(releasesFallbackBackendApiResponse.total);
    expect(releaseList.releases).toEqual(releasesFallbackBackendApiResponse.releases);
  });
})
