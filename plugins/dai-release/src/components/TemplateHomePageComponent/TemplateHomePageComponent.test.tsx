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
import { fireEvent, screen, waitFor } from '@testing-library/react';
import {
  mockEmptyTemplateList,
  mockTemplateGitMetaInfo,
  mockTemplateList,
} from '../../mocks/templatesMocks';
import React from 'react';
import { TemplateHomePageComponent } from './TemplateHomePageComponent';
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
        res(ctx.status(200), ctx.json(mockTemplateList)),
      ),
      rest.get('http://example.com/api/dai-release/instances', (_, res, ctx) =>
        res(ctx.status(200), ctx.json(releaseInstanceConfigResponse)),
      ),
      rest.get(
        'http://example.com/api/dai-release/template/meta',
        (_, res, ctx) =>
          res(ctx.status(200), ctx.json(mockTemplateGitMetaInfo)),
      ),
    );
  });

  it('should render the home page', async () => {
    const rendered = await renderContent();
    const image = rendered.getByAltText('Release logo') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('releaseLogoWhite');
  });

  it('should render the home page with no templates available', async () => {
    server.use(
      rest.get('http://example.com/api/dai-release/templates', (_, res, ctx) =>
        res(ctx.status(200), ctx.json(mockEmptyTemplateList)),
      ),
    );
    const rendered = await renderContent();
    const image = rendered.getByAltText('Release logo') as HTMLImageElement;
    expect(image.src).toContain('releaseLogoWhite');
    expect(rendered.getByText('No templates available')).toBeInTheDocument();
  });

  it('should display the popover when clicking the IconButton for meta information - Git info', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    const rendered = await renderContent();
    const moreVertIcons = rendered.getAllByTestId('moreVertIcon');
    expect(moreVertIcons.length).toBeGreaterThan(0);

    fireEvent.click(moreVertIcons[0]);

    // Verify that the popover is displayed with the expected content
    const metaInfoButton = await screen.findByText('Meta information');
    expect(metaInfoButton).toBeInTheDocument();

    // Simulate a click on the "Meta information" button
    fireEvent.click(metaInfoButton);

    // Verify api call is made
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'http://example.com/api/dai-release/template/meta?folderId=Applications%2FFolder1&instanceName=default',
        ),
        expect.any(Object),
      );
    });
    const response = fetchSpy.mock.results[0].value;

    // Validate the response using MSW directly instead of trying to parse it
    await waitFor(async () => {
      // You can directly check if the fetch has the correct response structure
      expect(await response).toEqual(
        expect.objectContaining({
          status: 200,
          statusText: 'OK',
          headers: expect.anything(), // Check for headers if needed
        }),
      );
    });

    // Verify the content displayed in the popover.
    await waitFor(() => {
      expect(
        rendered.getByText('Meta information - aatemp'),
      ).toBeInTheDocument();
      expect(
        rendered.getByText('Source Control Management'),
      ).toBeInTheDocument();
      expect(rendered.getByText('GIT')).toBeInTheDocument();
      expect(
        rendered.getByText(mockTemplateGitMetaInfo.commitHash),
      ).toBeInTheDocument();
      expect(
        rendered.getByText(mockTemplateGitMetaInfo.committer),
      ).toBeInTheDocument();
      expect(
        rendered.getByText(mockTemplateGitMetaInfo.url),
      ).toBeInTheDocument();
      expect(
        rendered.getByText(
          `[${mockTemplateGitMetaInfo.name}] ${mockTemplateGitMetaInfo.shortMessage}`,
        ),
      ).toBeInTheDocument();
    });
  });
  it('should display the popover when clicking the IconButton for meta information- no data available', async () => {
    server.use(
      rest.get(
        'http://example.com/api/dai-release/template/meta',
        (_, res, ctx) => res(ctx.status(200), ctx.json({})),
      ),
    );
    const fetchSpy = jest.spyOn(global, 'fetch');
    const rendered = await renderContent();
    const moreVertIcons = rendered.getAllByTestId('moreVertIcon');
    expect(moreVertIcons.length).toBeGreaterThan(0);

    fireEvent.click(moreVertIcons[0]);

    // Verify that the popover is displayed with the expected content
    const metaInfoButton = await screen.findByText('Meta information');
    expect(metaInfoButton).toBeInTheDocument();

    // Simulate a click on the "Meta information" button
    fireEvent.click(metaInfoButton);

    // Verify api call is made
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'http://example.com/api/dai-release/template/meta?folderId=Applications%2FFolder1&instanceName=default',
        ),
        expect.any(Object),
      );
    });
    const response = fetchSpy.mock.results[0].value;

    // Validate the response using MSW directly instead of trying to parse it
    await waitFor(async () => {
      // You can directly check if the fetch has the correct response structure
      expect(await response).toEqual(
        expect.objectContaining({
          status: 200,
          statusText: 'OK',
          headers: expect.anything(), // Check for headers if needed
        }),
      );
    });

    // Verify the content displayed in the popover.
    await waitFor(() => {
      expect(
        rendered.getByText('Meta information - aatemp'),
      ).toBeInTheDocument();
      expect(
        rendered.getByText('Source Control Management'),
      ).toBeInTheDocument();
      expect(rendered.getByText('No data available.')).toBeInTheDocument();
    });
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
