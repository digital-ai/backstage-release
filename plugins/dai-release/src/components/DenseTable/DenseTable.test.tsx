import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
import { DenseTable } from '../DenseTable';
import React from 'react';
import { TableColumn } from '@backstage/core-components';

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
      onPageChange: () => {},
      onRowsPerPageChange: () => {},
      retry: () => {},
      onOrderBy: () => {},
      onOrderDirection: () => {},
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
      onPageChange: () => {},
      onRowsPerPageChange: () => {},
      retry: () => {},
      onOrderBy: () => {},
      onOrderDirection: () => {},
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
  onOrderDirection: () => void;
  onRowsPerPageChange: () => void;
  pageSize: number;
  onPageChange: () => void;
  tableData: { firstName: string; lastName: string }[];
  page: number;
  loading: boolean;
  totalCount: number;
  retry: () => void;
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
        onOrderBy={args.onOrderBy}
        onOrderDirection={args.onOrderDirection}
      />
    </TestApiProvider>,
  );
}
