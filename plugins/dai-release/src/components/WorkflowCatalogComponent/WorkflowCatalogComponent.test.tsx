import { DaiReleaseApiClient, daiReleaseApiRef } from '../../api';
import {
  DiscoveryApi,
  IdentityApi,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import { FolderBackendResponse, workflowCatalogsList } from '../../mocks/workflowMocks';
import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
import { DotThemeProvider } from '@digital-ai/dot-components';
import React from 'react';
import { FolderBackendResponse, Workflow } from '@digital-ai/plugin-dai-release-common';
import { WorkflowCatalogComponent } from './WorkflowCatalogComponent';
import { cleanup, fireEvent, screen, useEffect, userEvent } from '@testing-library/react';
import { screen } from '@testing-library/react';

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
  errorMessage?: string;
  folders?: typeof FolderBackendResponse;
  instance?: string;
  url?: string;  
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
          folders={args.folders}
          instance={args.instance}
          errorMessage={args.errorMessage}
          url={args.url}          
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

let openSpy;

beforeEach(() => {
  openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
});

afterEach(() => {
  openSpy.mockRestore();
  cleanup();
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
    it('should render the dialog when the "Run workflow" button is clicked', async () => {
        await renderContent({
          loading: false,
          loadMoreData: jest.fn(),
          data: workflowCatalogsList.workflows,
          folders: FoldersListBackendResponse,
          instance: 'test-instance',
          url: 'http://example.com'
        });

        fireEvent.click(screen.getAllByText('Run workflow')[0]);
        expect(screen.getByText('Choose folder')).toBeInTheDocument();
      });

  it('should not render the dialog when no workflow is selected', async () => {
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
    });

    expect(screen.queryByText('Select the folder where workflow')).not.toBeInTheDocument();
  });

  it('should close the dialog when cancel button is clicked', async () => {
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
          folders: FoldersListBackendResponse,
          instance: 'test-instance',
          url: 'http://example.com'
    });

    fireEvent.click(screen.getAllByText('Run workflow')[0]);
    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Select the folder where workflow')).not.toBeInTheDocument();
  });

it('should disable the submit button when no folder is clicked', async () => {
  await renderContent({
    loading: false,
    loadMoreData: jest.fn(),
    data: workflowCatalogsList.workflows,
          folders: FoldersListBackendResponse,
          instance: 'test-instance',
          url: 'http://example.com'
  });

  fireEvent.click(screen.getAllByText('Run workflow')[0]);
  expect(screen.getAllByText('Run workflow')[10]).toBeDisabled();
});

  it('should enable the submit button when a folder is selected', async () => {
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
                folders: FoldersListBackendResponse,
                instance: 'test-instance',
                url: 'http://example.com'
    });

    fireEvent.click(screen.getAllByText('Run workflow')[0]);
    fireEvent.click(screen.getByText('Workflow Executions'));

    expect(screen.getAllByText('Run workflow')[10]).not.toBeDisabled();
  });

  it('should set selected folder id when a folder is selected', async () => {
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
      folders: FoldersListBackendResponse,
                      instance: 'test-instance',
                      url: 'http://example.com'
    });

    fireEvent.click(screen.getAllByText('Run workflow')[0]);
    fireEvent.click(screen.getByText('Workflow Executions'));

    expect(screen.getAllByText('Run workflow')[10]).not.toBeDisabled();
  });

});
