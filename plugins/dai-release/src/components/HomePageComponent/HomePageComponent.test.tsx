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
import { fireEvent, screen } from '@testing-library/react';
import {
  mockReleaseList,
  releaseInstanceConfigResponse,
} from '../../mocks/mocks';
import { HomePageComponent } from './HomePageComponent';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const identityApi = {
  getCredentials: jest.fn(),
} as unknown as IdentityApi;

describe('HomePageComponent', () => {
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
      rest.get('http://example.com/api/dai-release/releases', (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json(mockReleaseList),
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
  it('should display the popover when clicking the IconButton for meta information', async () => {
    server.use(
      rest.get('http://example.com/api/dai-release/releases', (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json(mockReleaseList),
        ),
      ),
    );
    const rendered = await renderContent();
    const moreVertIcons = rendered.getAllByTestId('moreVertIcon');
    expect(moreVertIcons.length).toBeGreaterThan(0);

    fireEvent.click(moreVertIcons[0]);
    // Verify that the popover is displayed with the expected content
    const metaInfoButton = await screen.findByText('Meta information');
    expect(metaInfoButton).toBeInTheDocument();

    // Simulate a click on the "Meta information" button
    fireEvent.click(metaInfoButton);

    // Verify that the popover displays "No data available"

    const noDataText = await screen.findByText('No data available.');
    expect(noDataText).toBeInTheDocument();
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
      <HomePageComponent />
    </TestApiProvider>,
  );
}
