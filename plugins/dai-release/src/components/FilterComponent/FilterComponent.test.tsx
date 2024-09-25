import {
  renderInTestApp,
  setupRequestMockHandlers,
} from '@backstage/test-utils';
import { FilterComponent } from './FilterComponent';
import React from 'react';
import dayjs from 'dayjs';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('FilterComponent - ActiveRelease', () => {
  const server = setupServer();
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });

  it('should render the search filter elements', async () => {
    const rendered = await renderContent({
      fromDate: null,
      toDate: null,
      statusTags: [],
      orderBy: '',
      showDrawer: true,
      onPageChange: () => {},
      onRowsPerPageChange: () => {},
      onFromDateChange: () => {},
      onToDateChange: () => {},
      onOrderByChange: () => {},
      onStatusTagChange: () => {},
      onShowDrawer: () => {},
    });
    expect(rendered.getByLabelText('Order by')).toBeInTheDocument();
    expect(rendered.getByLabelText('From')).toBeInTheDocument();
    expect(rendered.getByLabelText('To')).toBeInTheDocument();
  });
  it('should render the search filter elements with content', async () => {
    const rendered = await renderContent({
      fromDate: dayjs(new Date('04/09/2024 05:07 PM')),
      toDate: dayjs(new Date('04/09/2024 05:07 PM')),
      statusTags: ['Failing'],
      orderBy: 'start_date',
      showDrawer: true,
      onPageChange: () => {},
      onRowsPerPageChange: () => {},
      onFromDateChange: () => {},
      onToDateChange: () => {},
      onOrderByChange: () => {},
      onStatusTagChange: () => {},
      onShowDrawer: () => {},
    });
    expect(rendered.getByLabelText('From')).toHaveValue('04/09/2024 05:07 PM');
    expect(rendered.getByLabelText('To')).toHaveValue('04/09/2024 05:07 PM');
    expect(rendered.getByText('Failing')).toBeInTheDocument();
    expect(rendered.getByText('Start Date')).toBeInTheDocument();
  });
});
describe('FilterComponent - Templates', () => {
  const server = setupServer();
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
        rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });
  it('should render the search filter elements', async () => {
    const rendered = await renderTemplateContent({
      showDrawer: true,
      searchTitle: '',
      tags: [],
      onSearchByTitle: () => {},
      onSetTags: () => {},
      onShowDrawer:  () => {},
      resetState: () => {},
    });
    expect(rendered.getByLabelText('Search by name')).toBeInTheDocument();
    expect(rendered.getByLabelText('Search by tags')).toBeInTheDocument();
  });
  it('should render the search filter elements with content', async () => {
    const rendered = await renderTemplateContent({
      showDrawer: true,
      searchTitle: 'test',
      tags: ['user1','user2'],
      onSearchByTitle: () => {},
      onSetTags: () => {},
      onShowDrawer:  () => {},
      resetState: () => {},
    });
    expect(rendered.getByLabelText('Search by name')).toHaveValue('test');
    expect(rendered.getByLabelText('Search by tags')).toBeInTheDocument();
    expect(rendered.getByText('user1')).toBeInTheDocument();
    expect(rendered.getByText('user2')).toBeInTheDocument();

    // Check if the placeholder text is correct
    const searchByTagsInput = rendered.getByLabelText('Search by tags');
    expect(searchByTagsInput).toHaveAttribute('placeholder', 'Type and press Enter');

    const user1 = rendered.getByRole('button', { name: /user1/i });

    // Check if the delete icon is available
    const deleteUser1Icon = user1.querySelector('svg[data-testid="CancelIcon"]');
    expect(deleteUser1Icon).toBeInTheDocument();

    // Check if the tag icon is available
    const tag1Icon = user1.querySelector('svg[data-testid="chip-icon-0"]');
    expect(tag1Icon).toBeInTheDocument();

    const user2 = rendered.getByRole('button', { name: /user2/i });
    // Check if the delete icon is available
    const deleteUser2Icon = user2.querySelector('svg[data-testid="CancelIcon"]');
    expect(deleteUser2Icon).toBeInTheDocument();
    // Check if the tag icon is available
    const tag2Icon = user2.querySelector('svg[data-testid="chip-icon-1"]');
    expect(tag2Icon).toBeInTheDocument();

    //Check if the close icon is available
    const clear = rendered.getByRole('button', { name: /Clear/i });
    clear.querySelector('svg[data-testid="CloseIcon"]')
  });

});

async function renderContent(args: {
  fromDate: dayjs.Dayjs | null;
  toDate: dayjs.Dayjs | null;
  orderBy: string;
  statusTags: string[];
  showDrawer: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onFromDateChange: (fromDate: dayjs.Dayjs | null) => void;
  onToDateChange: (toDate: dayjs.Dayjs | null) => void;
  onOrderByChange: (orderBy: string) => void;
  onStatusTagChange: (statusTags: string[] | undefined) => void;
  onShowDrawer: (showDrawer: boolean) => void;
}) {
  return await renderInTestApp(
    <FilterComponent
      fromDate={args.fromDate}
      orderBy={args.orderBy}
      onFromDateChange={args.onFromDateChange}
      onStatusTagChange={args.onStatusTagChange}
      onToDateChange={args.onToDateChange}
      statusTags={args.statusTags}
      toDate={args.toDate}
      onOrderByChange={args.onOrderByChange}
      showDrawer={args.showDrawer}
      onShowDrawer={args.onShowDrawer}
    />,
  );
}
async function renderTemplateContent(args: {
  showDrawer: boolean;
  searchTitle?: string;
  statusTags?: string[] | undefined;
  tags?: string[];
  onSearchByTitle?: (title: string) => void;
  onSetTags?: (tags: string[]) => void;
  onShowDrawer: (showDrawer: boolean) => void;
  resetState?: () => void;
}) {
  return await renderInTestApp(
  <FilterComponent
      showDrawer={args.showDrawer}
      onShowDrawer={args.onShowDrawer}
      tags={args.tags}
      searchTitle={args.searchTitle}
      onSetTags={args.onSetTags}
      onSearchByTitle={args.onSearchByTitle}
      resetState={args.resetState}
  />,
  );
}
