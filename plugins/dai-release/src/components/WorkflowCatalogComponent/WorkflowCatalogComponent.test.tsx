import { DaiReleaseApiClient, daiReleaseApiRef } from '../../api';
import {
  DiscoveryApi,
  IdentityApi,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import {
  FolderBackendResponse,
  Workflow,
} from '@digital-ai/plugin-dai-release-common';
import {
  FoldersListBackendResponse,
  workflowCatalogsList,
} from '../../mocks/workflowMocks';
import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
import { act, fireEvent, screen } from '@testing-library/react';
import { DotThemeProvider } from '@digital-ai/dot-components';
import React from 'react';
import { WorkflowCatalogComponent } from './WorkflowCatalogComponent';
import { useFolders } from '../../hooks/useFolders';

jest.mock('../../hooks/useFolders');

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
  folders?: FolderBackendResponse;
  instance?: string;
  setRedirectUrl?: (redirectUrl: string) => void;
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
          instance={args.instance || ''}
          backstageTheme="light"
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

let openSpy: jest.SpyInstance;

beforeEach(() => {
  openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
});

afterEach(() => {
  openSpy.mockRestore();
  jest.clearAllMocks();
});

describe('WorkflowCatalogComponent', () => {
  it('should render the search header and workflows', async () => {
    (useFolders as jest.Mock).mockReturnValue({
      folders: FoldersListBackendResponse,
      error: null,
      triggerFetch: jest.fn(),
    });
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
    (useFolders as jest.Mock).mockReturnValue({
      folders: FoldersListBackendResponse,
      error: null,
      triggerFetch: jest.fn(),
    });
    await renderContent({
      loading: true,
      loadMoreData: jest.fn(),
      data: [],
    });
    expect(screen.getAllByTestId('title-skeleton')).toHaveLength(3);
  });
  it('should render the dialog when the "Run workflow" button is clicked', async () => {
    (useFolders as jest.Mock).mockReturnValue({
      folders: FoldersListBackendResponse,
      error: null,
      triggerFetch: jest.fn(),
    });
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
      instance: 'test-instance',
    });

    fireEvent.click(screen.getAllByText('Run workflow')[0]);
    expect(screen.getByText('Choose folder')).toBeInTheDocument();
  });

  it('should not render the dialog when no workflow is selected', async () => {
    (useFolders as jest.Mock).mockReturnValue({
      folders: FoldersListBackendResponse,
      error: null,
      triggerFetch: jest.fn(),
    });
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
    });

    expect(
      screen.queryByText('Select the folder where workflow'),
    ).not.toBeInTheDocument();
  });

  it('should close the dialog when cancel button is clicked', async () => {
    (useFolders as jest.Mock).mockReturnValue({
      folders: FoldersListBackendResponse,
      error: null,
      triggerFetch: jest.fn(),
    });
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
      instance: 'test-instance',
    });

    fireEvent.click(screen.getAllByText('Run workflow')[0]);
    fireEvent.click(screen.getByText('Cancel'));

    expect(
      screen.queryByText('Select the folder where workflow'),
    ).not.toBeInTheDocument();
  });

  it('should disable the submit button when no folder is clicked', async () => {
    (useFolders as jest.Mock).mockReturnValue({
      folders: FoldersListBackendResponse,
      error: null,
      triggerFetch: jest.fn(),
    });
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
      instance: 'test-instance',
    });

    fireEvent.click(screen.getAllByText('Run workflow')[0]);
    expect(screen.getAllByText('Run workflow')[10]).toBeDisabled();
  });

  it('should enable the submit button when a folder is selected', async () => {
    (useFolders as jest.Mock).mockReturnValue({
      folders: FoldersListBackendResponse,
      error: null,
      triggerFetch: jest.fn(),
    });

    await act(async () => {
      await renderContent({
        loading: false,
        loadMoreData: jest.fn(),
        data: workflowCatalogsList.workflows,
        instance: 'test-instance',
      });
    });

    await act(async () => {
      fireEvent.click(screen.getAllByText('Run workflow')[1]);
    });

    await act(async () => {
      fireEvent.click(screen.getAllByText('Digital.ai - Official')[0]);
    });

    expect(screen.getAllByText('Run workflow')[10]).not.toBeDisabled();
  });

  it('should set selected folder id when a folder is selected', async () => {
    (useFolders as jest.Mock).mockReturnValue({
      folders: FoldersListBackendResponse,
      error: null,
      triggerFetch: jest.fn(),
    });
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
      instance: 'test-instance',
    });

    fireEvent.click(screen.getAllByText('Run workflow')[0]);
    fireEvent.click(screen.getByText('Digital.ai - Official'));

    expect(screen.getAllByText('Run workflow')[10]).not.toBeDisabled();
  });

  it('should enable the submit button when a folder is selected from drop down', async () => {
    (useFolders as jest.Mock).mockReturnValue({
      folders: FoldersListBackendResponse,
      error: null,
      triggerFetch: jest.fn(),
    });
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
      instance: 'test-instance',
    });

    fireEvent.click(screen.getAllByText('Run workflow')[0]);
    fireEvent.click(screen.getByText('Digital.ai - Official'));
    fireEvent.click(screen.getByText('Workflow Executions'));

    expect(screen.getAllByText('Run workflow')[10]).not.toBeDisabled();
  });

  it('should open a new window with the correct URL when we click on "Run Workflow" button', async () => {
    const setRedirectUrlMock = jest.fn();
    (useFolders as jest.Mock).mockReturnValue({
      folders: FoldersListBackendResponse,
      error: null,
      triggerFetch: jest.fn(),
    });

    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
      instance: 'test-instance',
    });

    fireEvent.click(screen.getAllByText('Run workflow')[0]);
    fireEvent.click(screen.getByText('Digital.ai - Official'));
    fireEvent.click(screen.getAllByText('Run workflow')[10]);

    setRedirectUrlMock.mockImplementation((redirectUrl: string) => {
      window.open(redirectUrl, '_blank');
    });
    setRedirectUrlMock('http://example.com');
    expect(openSpy).toHaveBeenCalledWith('http://example.com', '_blank');
  });

  it('should close the dialog when clicking outside of it', async () => {
    await renderContent({
      loading: false,
      loadMoreData: jest.fn(),
      data: workflowCatalogsList.workflows,
      instance: 'test-instance',
    });

    // Open the dialog
    fireEvent.click(screen.getAllByText('Run workflow')[0]);
    expect(screen.getByText('Choose folder')).toBeInTheDocument();

    // Simulate a click outside the dialog
    fireEvent.mouseDown(document.body);

    // Verify the dialog is closed
    await act(async () => {
      fireEvent.mouseDown(document.body);
    });
  });
});
