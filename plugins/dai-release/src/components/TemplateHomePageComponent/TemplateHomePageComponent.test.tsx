import { DaiReleaseApiClient, daiReleaseApiRef } from '../../api';
import {
  DiscoveryApi,
  IdentityApi,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import {
  TestApiProvider,
  renderInTestApp,
  setupRequestMockHandlers,
} from '@backstage/test-utils';
import { TemplateHomePageComponent } from './TemplateHomePageComponent';
import React from 'react';
import { releaseInstanceConfigResponse } from '../../mocks/mocks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const identityApi = {
  getCredentials: jest.fn(),
} as unknown as IdentityApi;

describe('TemplateHomePageComponent', () => {
  beforeEach(() => {
    jest
      .spyOn(identityApi, 'getCredentials')
      .mockImplementation(async () => ({ token: 'token' }));
  });

  const server = setupServer();
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('http://example.com/api/dai-release/templates', (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json({}),
        ),
      ),
      rest.get('http://example.com/api/dai-release/instances', (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json(releaseInstanceConfigResponse),
        ),
      ),
    );
  });

  it('should render the home page', async () => {
    const rendered = await renderContent();
    const image = rendered.getByAltText('Release logo') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('releaseLogoWhite');
  });
});

const discoveryApi: DiscoveryApi = {
  getBaseUrl: async () => 'http://example.com/api/dai-release',
};

async function renderContent() {
  return await renderInTestApp(
    <TestApiProvider
      apis={[
        [discoveryApiRef, discoveryApi],
        [
          daiReleaseApiRef,
          new DaiReleaseApiClient({ discoveryApi, identityApi }),
        ],
      ]}
    >
      <TemplateHomePageComponent />
    </TestApiProvider>,
  );
}
