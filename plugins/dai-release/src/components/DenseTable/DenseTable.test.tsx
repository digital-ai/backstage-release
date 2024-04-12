import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
import { DenseTable } from './DenseTable';
import React from 'react';
import { TableColumn } from '@backstage/core-components';
import dayjs from 'dayjs';

describe('DenseTable', () => {
  const columns: TableColumn[] = [
    {
      title: 'Column-A',
      field: 'firstName',
    },
    {
      title: 'Column-B',
      field: 'lastName',
    },
  ];

  it('should render for empty content', async () => {
    const rendered = await renderContent({
      columns: columns,
      loading: false,
      page: 1,
      pageSize: 5,
      tableData: [],
      totalCount: 0,
      searchTitle: '',
      fromDate: null,
      toDate: null,
      statusTags: [],
      orderBy: '',
      onPageChange: () => {},
      onRowsPerPageChange: () => {},
      retry: () => {},
      onOrderBy: () => {},
      setSearchTitle: () => {},
      setFromDate: () => {},
      setToDate: () => {},
      setOrderBy: () => {},
      setStatusTags: () => {},
    });
    columns.forEach(c =>
      expect(rendered.getByText(c.title as string)).toBeInTheDocument(),
    );
    expect(rendered.getByText('No releases available')).toBeInTheDocument();
    expect(rendered.getByText('5 rows')).toBeInTheDocument();
    expect(rendered.queryAllByText('0-0 of 0').length > 0).toBeTruthy();
  });

  it('should render for valid content', async () => {
    const data = [
      {
        firstName: 'John',
        lastName: 'Doe',
      },
    ];
    const rendered = await renderContent({
      columns: columns,
      loading: false,
      page: 1,
      pageSize: 5,
      tableData: data,
      totalCount: data.length,
      searchTitle: '',
      fromDate: null,
      toDate: null,
      statusTags: [],
      orderBy: '',
      onPageChange: () => {},
      onRowsPerPageChange: () => {},
      retry: () => {},
      onOrderBy: () => {},
      setSearchTitle: () => {},
      setFromDate: () => {},
      setToDate: () => {},
      setOrderBy: () => {},
      setStatusTags: () => {},
    });
    columns.forEach(c =>
      expect(rendered.getByText(c.title as string)).toBeInTheDocument(),
    );
    data.forEach(d => {
      expect(rendered.getByText(d.firstName)).toBeInTheDocument();
      expect(rendered.getByText(d.lastName)).toBeInTheDocument();
    });
    expect(rendered.getByText('5 rows')).toBeInTheDocument();
    expect(rendered.queryAllByText('1-1 of 1').length > 0).toBeTruthy();
  });
});

async function renderContent(args: {
  onOrderBy: () => void;
  columns: TableColumn[];
  pageSize: number;
  tableData: { firstName: string; lastName: string }[];
  page: number;
  loading: boolean;
  totalCount: number;
  retry: () => void;
  searchTitle: string;
  fromDate: dayjs.Dayjs | null;
  toDate: dayjs.Dayjs | null;
  orderBy: string;
  statusTags: string[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  setSearchTitle: (title: string) => void;
  setFromDate: (fromDate: dayjs.Dayjs | null) => void;
  setToDate: (toDate: dayjs.Dayjs | null) => void;
  setOrderBy: (orderBy: string) => void;
  setStatusTags: (statusTags: string[]) => void;
}) {
  return await renderInTestApp(
    <TestApiProvider apis={[]}>
      <DenseTable
        page={args.page}
        columns={args.columns}
        loading={args.loading}
        pageSize={args.pageSize}
        tableData={args.tableData}
        totalCount={args.totalCount}
        onPageChange={args.onPageChange}
        onRowsPerPageChange={args.onRowsPerPageChange}
        retry={args.retry}
        setOrderBy={args.onOrderBy}
        fromDate={args.fromDate}
        orderBy={args.orderBy}
        searchTitle={args.searchTitle}
        setFromDate={args.setFromDate}
        setSearchTitle={args.setSearchTitle}
        setStatusTags={args.setStatusTags}
        setToDate={args.setToDate}
        statusTags={args.statusTags}
        toDate={args.toDate}
      />
    </TestApiProvider>,
  );
}
