import { DaiReleaseApiClient, daiReleaseApiRef } from '../../api';
import { DiscoveryApi, discoveryApiRef } from '@backstage/core-plugin-api';
import {
  TestApiProvider,
  renderInTestApp,
  setupRequestMockHandlers,
} from '@backstage/test-utils';
import { HomePageComponent } from './HomePageComponent';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('HomePageComponent', () => {
  const server = setupServer();
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('http://example.com/api/dai-release/releases', (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json({}),
        ),
      ),
    );
  });

  it('should render the home page', async () => {
    const rendered = await renderContent();
    const image = rendered.getByAltText('Release logo') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("http://localhost/releaseLogoWhite.png");
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
        [daiReleaseApiRef, new DaiReleaseApiClient({ discoveryApi })],
      ]}
    >
      <HomePageComponent />
    </TestApiProvider>,
  );
}
