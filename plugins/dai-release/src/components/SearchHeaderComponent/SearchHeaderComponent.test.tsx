import {
  renderInTestApp,
  setupRequestMockHandlers,
} from '@backstage/test-utils';
import React from 'react';
import { SearchHeaderComponent } from './SearchHeaderComponent';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('SearchHeaderComponent', () => {
  const server = setupServer();
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });

  it('should render the search elements', async () => {
    const rendered = await renderContent({
      displayFilter: true,
      tableSearchFilter: false,
      titleName: 'Active Releases',
      searchTitleTextField: 'Title',
      searchTitle: '',
      instance: '',
      instanceList: [],
      error: undefined,
      filterCount: 0,
      onSetInstance: () => {},
      onShowDrawer: () => {},
      onSearchByTitle: () => {},
      retry: () => {},
    });
    expect(rendered.getByLabelText('Choose Instance')).toBeInTheDocument();
    expect(rendered.getByLabelText('Title')).toBeInTheDocument();
  });
  it('should render the search elements with content', async () => {
    const rendered = await renderContent({
      displayFilter: true,
      tableSearchFilter: false,
      titleName: 'Active Releases',
      searchTitleTextField: 'Title',
      searchTitle: 'Test',
      instance: 'default',
      instanceList: [
        {
          name: 'default',
          host: 'http://localhost:5516',
          token: 'abcd',
        },
        {
          name: 'secondary',
          host: 'http://localhost2:5516',
          token: 'abcd',
        },
      ],
      error: undefined,
      filterCount: 3,
      onSetInstance: () => {},
      onShowDrawer: () => {},
      onSearchByTitle: () => {},
      retry: () => {},
    });
    expect(rendered.getByLabelText('Title')).toHaveValue('Test');
    expect(rendered.getByLabelText('Choose Instance')).toBeInTheDocument();
    expect(rendered.getByLabelText('Choose Instance')).toHaveTextContent(
      'default',
    );
    const badge = rendered.getByTestId('badge-icon');
    expect(badge).toHaveTextContent('3');
  });
  it('should render the custom search elements with content', async () => {
    const rendered = await renderContent({
      displayFilter: false,
      tableSearchFilter: true,
      titleName: 'Templates',
      searchTitleTextField: 'Search by name',
      searchTitle: 'Test',
      instance: 'default',
      instanceList: [
        {
          name: 'default',
          host: 'http://localhost:5516',
          token: 'abcd',
        },
        {
          name: 'secondary',
          host: 'http://localhost2:5516',
          token: 'abcd',
        },
      ],
      error: undefined,
      filterCount: 3,
      customSearch: 'test',
      onSetInstance: () => {},
      onShowDrawer: () => {},
      onSearchByTitle: () => {},
      onCustomSearch: () => {},
      retry: () => {},
      resetState: () => {},
    });
    expect(rendered.getByLabelText('Search')).toBeInTheDocument();
    expect(rendered.getByLabelText('Search')).toHaveValue('test');
    expect(rendered.getByLabelText('Choose Instance')).toBeInTheDocument();
    expect(rendered.getByLabelText('Choose Instance')).toHaveTextContent(
      'default',
    );
    const badge = rendered.getByTestId('badge-icon');
    expect(badge).toHaveTextContent('3');
  });
});
async function renderContent(args: {
  displayFilter: boolean | true;
  tableSearchFilter: boolean | false;
  titleName: string;
  searchTitleTextField: string;
  instance: string;
  filterCount: number;
  customSearch?: string;
  onShowDrawer: () => void;
  instanceList: any[];
  searchTitle: string;
  retry: () => void;
  error: Error | undefined;
  onCustomSearch?: () => void;
  onSetInstance: () => void;
  onSearchByTitle: () => void;
  resetState?: () => void;
}) {
  return await renderInTestApp(
    <SearchHeaderComponent
      displayFilter={args.displayFilter}
      tableSearchFilter={args.tableSearchFilter}
      titleName={args.titleName}
      customSearch={args.customSearch}
      searchTitleTextField={args.searchTitleTextField}
      searchTitle={args.searchTitle}
      instance={args.instance}
      instanceList={args.instanceList}
      filterCount={args.filterCount}
      retry={args.retry}
      error={args.error}
      onSearchByTitle={args.onSearchByTitle}
      onSetInstance={args.onSetInstance}
      onShowDrawer={args.onShowDrawer}
    />,
  );
}
