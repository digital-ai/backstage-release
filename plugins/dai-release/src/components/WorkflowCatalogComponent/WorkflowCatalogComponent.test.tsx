import { DaiReleaseApiClient, daiReleaseApiRef } from '../../api';
import {
  DiscoveryApi,
  IdentityApi,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
import { DotThemeProvider } from '@digital-ai/dot-components';
import React from 'react';
import { Workflow } from '@digital-ai/plugin-dai-release-common';
import { WorkflowCatalogComponent } from './WorkflowCatalogComponent';
import { screen } from '@testing-library/react';
import { workflowCatalogsList } from '../../mocks/workflowMocks';

const discoveryApi: DiscoveryApi = {
  getBaseUrl: async () => 'http://example.com/api/dai-release',
};
const identityApi = {
  getCredentials: jest.fn(),
} as unknown as IdentityApi;

async function renderContent(args: {
  loading: boolean;
  loadMoreData: () => void;
  data: Workflow[];
}) {
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
      <DotThemeProvider>
        <WorkflowCatalogComponent
          loading={args.loading}
          loadMoreData={args.loadMoreData}
          data={args.data}
          searchInput=""
          onSearchInput={jest.fn()}
          resetState={jest.fn()}
          instance="default"
        />
      </DotThemeProvider>
    </TestApiProvider>,
  );
}
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
describe('WorkflowCatalogComponent', () => {
  it('should render the search header and workflows', async () => {
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
    });

    expect(screen.getByText('Search Workflows')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Start typing to filter workflows...'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('AWS Lamba setup function with Digital.ai Deploy'),
    ).toBeInTheDocument();
  });

  it('should render loading skeletons when loading is true', async () => {
    await renderContent({
      loading: true,
      loadMoreData: jest.fn(),
      data: [],
    });
    expect(screen.getAllByTestId('title-skeleton')).toHaveLength(3);
  });
});
