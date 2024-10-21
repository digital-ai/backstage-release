import {
  ReleaseList,
  TemplateList,
} from '@digital-ai/plugin-dai-release-common';
import { SetupServerApi, setupServer } from 'msw/node';
import {
  config,
  releasesBackendApiResponse,
  releasesFallbackBackendApiResponse,
} from '../mocks/mockData';
import {
  error401ResponseHandler,
  error403ResponseHandler,
  error404ResponseHandler,
  error500ResponseHandler,
  mockTestHandlers,
  mockTestHandlersfallBack,
} from '../mocks/mock.test.handlers';
import { ReleaseConfig } from '../service/releaseInstanceConfig';
import { ReleaseOverviewApi } from './ReleaseOverviewApi';
import { mockServices } from '@backstage/backend-test-utils';
import { templateBackendPluginApiResponse } from '../mocks/mockTemplateData';

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
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
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

  it('Should throw error if instance is not in config for templates', async () => {
    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () =>
        await releaseOverviewApi.getTemplates('', [], '0', '100', 'default2'),
    ).rejects.toThrow(
      "Couldn't find a release instance 'default2' in the config",
    );
  });

  it('Should get releases from Release API', async () => {
    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
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

  it('Should get templates from Template API', async () => {
    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    const templateList: TemplateList = await releaseOverviewApi.getTemplates(
      '',
      [],
      '0',
      '100',
      'default',
    );

    expect(templateList.templates).toEqual(
      templateBackendPluginApiResponse.templates,
    );
  });

  it('Get 401 response from releases from Release API', async () => {
    server.resetHandlers(...error401ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
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

  it('Get 401 response from releases for Template API', async () => {
    server.resetHandlers(...error401ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () =>
        await releaseOverviewApi.getTemplates('', [], '0', '100', 'default'),
    ).rejects.toThrow(
      'Access Denied: Missing or invalid release Token. Unauthorized to Use Digital.ai Release',
    );
  });

  it('Get 403 response from releases from Release API', async () => {
    server.resetHandlers(...error403ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
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
      'Permission denied or the requested functionality is not supported',
    );
  });

  it('Get 403 response from releases for Template API', async () => {
    server.resetHandlers(...error403ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () =>
        await releaseOverviewApi.getTemplates('', [], '0', '100', 'default'),
    ).rejects.toThrow(
      'Permission denied or the requested functionality is not supported',
    );
  });

  it('Get 404 response from getReleases from Release API', async () => {
    server.resetHandlers(...error404ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
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

  it('Get 404 response from release for Template API', async () => {
    server.resetHandlers(...error404ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );
    await expect(
      async () =>
        await releaseOverviewApi.getTemplates('', [], '0', '100', 'default'),
    ).rejects.toThrow('Release service request not found');
  });

  it('Get 500 response from getReleases from Release API', async () => {
    server.resetHandlers(...error500ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
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

  it('Get 500 response from release for Template API', async () => {
    server.resetHandlers(...error500ResponseHandler);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
    );

    await expect(
      async () =>
        await releaseOverviewApi.getTemplates('', [], '0', '100', 'default'),
    ).rejects.toThrow('failed to fetch data, status 500 Unexpected error');
  });

  it('Get response from getReleases from Release API - using search api for xlr version < 24.1', async () => {
    server.resetHandlers(...mockTestHandlersfallBack);

    const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
      ReleaseConfig.fromConfig(config),
      mockServices.logger.mock(),
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

    expect(releaseList.total).toEqual(releasesFallbackBackendApiResponse.total);
    expect(releaseList.releases).toEqual(
      releasesFallbackBackendApiResponse.releases,
    );
  });
});
