import { DaiReleaseApiClient, daiReleaseApiRef } from '../../api';
import {
  DiscoveryApi,
  IdentityApi,
  discoveryApiRef,
} from '@backstage/core-plugin-api';

import { fireEvent, screen } from '@testing-library/react';

import { DotThemeProvider } from '@digital-ai/dot-components';
import { FoldersListBackendResponse } from '../../mocks/workflowMocks';
import React from 'react';
import { TestApiProvider } from '@backstage/test-utils';
import { WorkflowComponent } from './WorkflowComponent';
import { renderInTestApp } from '@backstage/test-utils';
import { useReleaseCategories } from '../../hooks/useReleaseCategories';
import { useWorkflowCatalog } from '../../hooks/useWorkflowCatalog';

jest.mock('../../hooks/useWorkflowCatalog');
jest.mock('../../hooks/useReleaseCategories');

const mockUseWorkflowCatalog = useWorkflowCatalog as jest.MockedFunction<
  typeof useWorkflowCatalog
>;

const mockUseReleaseCategories = useReleaseCategories as jest.MockedFunction<
  typeof useReleaseCategories
>;

const discoveryApi: DiscoveryApi = {
  getBaseUrl: async () => 'http://example.com/api/dai-release',
};
const identityApi = {
  getCredentials: jest.fn(),
} as unknown as IdentityApi;

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
      <DotThemeProvider>
        <WorkflowComponent />
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

describe('WorkflowComponent', () => {
  beforeEach(() => {
    mockUseWorkflowCatalog.mockReturnValue({
      data: [
        {
          id: '1',
          title: 'Test Workflow 1',
          author: 'Author 1',
          folderTitle: 'Folder 1',
          logoLink: '',
          git: {
            commitId: '123abc',
            repoLink: 'https://github.com/test/repo1',
          },
          description: 'Description 1',
          categories: ['Category1', 'Category2'],
        },
        {
          id: '2',
          title: 'Test Workflow 2',
          author: 'Author 2',
          folderTitle: 'Folder 2',
          logoLink: '',
          git: {
            commitId: '456def',
            repoLink: 'https://github.com/test/repo2',
          },
          description: 'Description 2',
          categories: ['Category3', 'Category4'],
        },
      ],
      error: undefined,
      instance: 'instance1',
      instanceList: [],
      loading: false,
      setData(_data: any): void {},
      setHasMore(_hasMore: boolean): void {},
      setRowsPerPage(_pageSize: number): void {},
      hasMore: false,
      setLoading: jest.fn(),
      setPage: jest.fn(),
      setInstance: jest.fn(),
      workflowSearch: { categories: [], author: '' },
      setWorkflowSearch: jest.fn(),
      searchInput: '',
      setSearchInput: jest.fn(),
      folders: FoldersListBackendResponse
    });
  });

  it('should render the WorkflowComponent with data', async () => {
    await renderContent();

    expect(screen.getByAltText('Release logo')).toBeInTheDocument();
    expect(screen.getByText('Workflow catalog')).toBeInTheDocument();
    expect(screen.getByText('Test Workflow 1')).toBeInTheDocument();
    expect(screen.getByText('Test Workflow 2')).toBeInTheDocument();
  });

  it('should render the WorkflowComponent with no data', async () => {
    mockUseWorkflowCatalog.mockReturnValue({
      data: [],
      error: undefined,
      instance: 'instance1',
      instanceList: undefined,
      loading: false,
      hasMore: false,
      setLoading: jest.fn(),
      setPage: jest.fn(),
      setData(_data: any): void {},
      setHasMore(_hasMore: boolean): void {},
      setRowsPerPage(_pageSize: number): void {},
      setInstance: jest.fn(),
      workflowSearch: { categories: [], author: '' },
      setWorkflowSearch: jest.fn(),
      searchInput: '',
      setSearchInput: jest.fn(),
      folders: FoldersListBackendResponse,      
    });
    await renderContent();

    expect(screen.getByAltText('Release logo')).toBeInTheDocument();
    expect(screen.getByText('Workflow catalog')).toBeInTheDocument();
    expect(screen.getByText('No workflows found')).toBeInTheDocument();
  });

  it('should update workflowSearch and call setWorkflowSearch for categories', async () => {
    mockUseWorkflowCatalog.mockReturnValue({
      data: [
        {
          id: '1',
          title: 'Test Workflow 1',
          author: 'Author 1',
          folderTitle: 'Folder 1',
          logoLink: '',
          git: {
            commitId: '123abc',
            repoLink: 'https://github.com/test/repo1',
          },
          description: 'Description 1',
          categories: ['Category1', 'Category2'],
        },
      ],
      error: undefined,
      instance: 'instance1',
      instanceList: [],
      loading: false,
      setData(_data: any): void {},
      setHasMore(_hasMore: boolean): void {},
      setRowsPerPage(_pageSize: number): void {},
      hasMore: false,
      setLoading: jest.fn(),
      setPage: jest.fn(),
      setInstance: jest.fn(),
      workflowSearch: { categories: ['Category1'], author: '' },
      setWorkflowSearch: jest.fn(),
      searchInput: '',
      setSearchInput: jest.fn(),
      folders: FoldersListBackendResponse,      
    });
    mockUseReleaseCategories.mockImplementation(
      (_instance, setReleaseCategories, setLoadingReleaseCategories) => {
        React.useEffect(() => {
          setReleaseCategories([
            { id: '1', title: 'Category1' },
            { id: '2', title: 'Category2' },
            { id: '3', title: 'Category3' },
            { id: '4', title: 'Category4' },
          ]);
          setLoadingReleaseCategories(false);
        }, [setLoadingReleaseCategories, setReleaseCategories]);
      },
    );
    await renderContent();

    const categoryFilterTitle = screen.getByTestId('category-filter-title');
    expect(categoryFilterTitle).toHaveTextContent('Categories');

    const category1Checkbox = screen.getByLabelText(
      'Category1',
    ) as HTMLInputElement;
    expect(category1Checkbox).toBeInTheDocument();
    expect(category1Checkbox.checked).toBe(true);

    const category2Checkbox = screen.getByLabelText(
      'Category2',
    ) as HTMLInputElement;
    expect(category2Checkbox).toBeInTheDocument();
    expect(category2Checkbox.checked).toBe(false);

    const category3Checkbox = screen.getByLabelText(
      'Category3',
    ) as HTMLInputElement;
    expect(category3Checkbox).toBeInTheDocument();
    expect(category3Checkbox.checked).toBe(false);

    const category4Checkbox = screen.getByLabelText(
      'Category4',
    ) as HTMLInputElement;
    expect(category4Checkbox).toBeInTheDocument();
    expect(category4Checkbox.checked).toBe(false);

    fireEvent.click(category2Checkbox);
    expect(category2Checkbox.checked).toBe(true);
    expect(mockUseWorkflowCatalog().setWorkflowSearch).toHaveBeenCalledWith({
      author: '',
      categories: ['Category1', 'Category2'],
    });

    expect(screen.getByText('Test Workflow 1')).toBeInTheDocument();
  });

  it('should update workflowSearch and call setWorkflowSearch for Authored By', async () => {
    mockUseWorkflowCatalog.mockReturnValue({
      data: [
        {
          id: '1',
          title: 'Test Workflow 1',
          author: 'Author 1',
          folderTitle: 'Folder 1',
          logoLink: '',
          git: {
            commitId: '123abc',
            repoLink: 'https://github.com/test/repo1',
          },
          description: 'Description 1',
          categories: ['Category1', 'Category2'],
        },
      ],
      error: undefined,
      instance: 'instance1',
      instanceList: [],
      loading: false,
      setData(_data: any): void {},
      setHasMore(_hasMore: boolean): void {},
      setRowsPerPage(_pageSize: number): void {},
      hasMore: false,
      setLoading: jest.fn(),
      setPage: jest.fn(),
      setInstance: jest.fn(),
      workflowSearch: { categories: ['Category1', 'Category2'], author: '' },
      setWorkflowSearch: jest.fn(),
      searchInput: '',
      setSearchInput: jest.fn(),
      folders: FoldersListBackendResponse,      
    });
    mockUseReleaseCategories.mockImplementation(
      (_instance, setReleaseCategories, setLoadingReleaseCategories) => {
        React.useEffect(() => {
          setReleaseCategories([
            { id: '1', title: 'Category1' },
            { id: '2', title: 'Category2' },
            { id: '3', title: 'Category3' },
            { id: '4', title: 'Category4' },
          ]);
          setLoadingReleaseCategories(false);
        }, [setLoadingReleaseCategories, setReleaseCategories]);
      },
    );
    await renderContent();

    const categoryFilterTitle = screen.getByTestId('category-filter-title');
    expect(categoryFilterTitle).toHaveTextContent('Categories');

    const category1Checkbox = screen.getByLabelText(
      'Category1',
    ) as HTMLInputElement;
    expect(category1Checkbox).toBeInTheDocument();
    expect(category1Checkbox.checked).toBe(true);

    const category2Checkbox = screen.getByLabelText(
      'Category2',
    ) as HTMLInputElement;
    expect(category2Checkbox).toBeInTheDocument();
    expect(category2Checkbox.checked).toBe(true);

    const category3Checkbox = screen.getByLabelText(
      'Category3',
    ) as HTMLInputElement;
    expect(category3Checkbox).toBeInTheDocument();
    expect(category3Checkbox.checked).toBe(false);

    const category4Checkbox = screen.getByLabelText(
      'Category4',
    ) as HTMLInputElement;
    expect(category4Checkbox).toBeInTheDocument();
    expect(category4Checkbox.checked).toBe(false);

    const authorInput = screen.getByLabelText(
      'Authored By',
    ) as HTMLInputElement;
    expect(authorInput.value).toBe('');

    fireEvent.change(authorInput, { target: { value: 'Author 1' } });
    expect(mockUseWorkflowCatalog().setWorkflowSearch).toHaveBeenCalledWith({
      author: 'Author 1',
      categories: ['Category1', 'Category2'],
    });
    expect(authorInput.value).toBe('Author 1');
    expect(screen.getByText('Test Workflow 1')).toBeInTheDocument();
  });

  it('should update searchInput and call setSearchInput', async () => {
    await renderContent();
    // Find the input element by placeholder
    const inputElement = screen.getByPlaceholderText(
      'Start typing to filter workflows...',
    ) as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');

    fireEvent.change(inputElement, { target: { value: 'Test Workflow' } });
    expect(screen.getByText('Test Workflow 1')).toBeInTheDocument();

    expect(mockUseWorkflowCatalog().setSearchInput).toHaveBeenCalledWith(
      'Test Workflow',
    );
    expect(inputElement.value).toBe('Test Workflow');
  });
});
