import {
  renderInTestApp,
  setupRequestMockHandlers,
} from '@backstage/test-utils';
import React from 'react';
import { FilterComponent } from './FilterComponent';
import dayjs from 'dayjs';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('FilterComponent', () => {
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
      searchTitle: '',
      fromDate: null,
      toDate: null,
      statusTags: [],
      orderBy: '',
      showDrawer: false,
      onPageChange: () => {},
      onRowsPerPageChange: () => {},
      onSearchTitle: () => {},
      onFromDateChange: () => {},
      onToDateChange: () => {},
      onOrderByChange: () => {},
      onStatusTagChange: () => {},
      onShowDrawer: () => {},
    });
    expect(rendered.getByLabelText('Order by')).toBeInTheDocument();
    expect(rendered.getByLabelText('Title')).toBeInTheDocument();
    expect(rendered.getByLabelText('From')).toBeInTheDocument();
    expect(rendered.getByLabelText('To')).toBeInTheDocument();
  });
  it('should render the search filter elements with content', async () => {
    const rendered = await renderContent({
      searchTitle: 'Test',
      fromDate: dayjs(new Date('04/09/2024 05:07 PM')),
      toDate: dayjs(new Date('04/09/2024 05:07 PM')),
      statusTags: ['Failing'],
      orderBy: 'start_date',
      showDrawer: false,
      onPageChange: () => {},
      onRowsPerPageChange: () => {},
      onSearchTitle: () => {},
      onFromDateChange: () => {},
      onToDateChange: () => {},
      onOrderByChange: () => {},
      onStatusTagChange: () => {},
      onShowDrawer: () => {},
    });
    expect(rendered.getByLabelText('Title')).toHaveValue('Test');
    expect(rendered.getByLabelText('From')).toHaveValue('04/09/2024 05:07 PM');
    expect(rendered.getByLabelText('To')).toHaveValue('04/09/2024 05:07 PM');
    expect(rendered.getByText('Failing')).toBeInTheDocument();
    expect(rendered.getByText('Start Date')).toBeInTheDocument();
  });
});
async function renderContent(args: {
  searchTitle: string;
  fromDate: dayjs.Dayjs | null;
  toDate: dayjs.Dayjs | null;
  orderBy: string;
  statusTags: string[];
  showDrawer: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onSearchTitle: (title: string) => void;
  onFromDateChange: (fromDate: dayjs.Dayjs | null) => void;
  onToDateChange: (toDate: dayjs.Dayjs | null) => void;
  onOrderByChange: (orderBy: string) => void;
  onStatusTagChange: (statusTags: string[]) => void;
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
