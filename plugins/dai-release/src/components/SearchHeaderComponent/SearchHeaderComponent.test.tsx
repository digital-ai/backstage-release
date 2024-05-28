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
      searchTitle: '',
      instance: '',
      instanceList: [],
      error: undefined,
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
  });
});
async function renderContent(args: {
  instance: string;
  onShowDrawer: () => void;
  instanceList: any[];
  searchTitle: string;
  retry: () => void;
  error: Error | undefined;
  onSetInstance: () => void;
  onSearchByTitle: () => void;
}) {
  return await renderInTestApp(
    <SearchHeaderComponent
      searchTitle={args.searchTitle}
      instance={args.instance}
      instanceList={args.instanceList}
      retry={args.retry}
      error={args.error}
      onSearchByTitle={args.onSearchByTitle}
      onSetInstance={args.onSetInstance}
      onShowDrawer={args.onShowDrawer}
    />,
  );
}
