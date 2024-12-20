import { ScrollableTable, ScrollableTableColumn } from './ScrollableTable';
import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
import { LinkButton } from '@backstage/core-components';
import React from 'react';
import Typography from '@mui/material/Typography';
import { fireEvent } from '@testing-library/react';
import { mockTemplateList } from '../../mocks/templatesMocks';

const defaultColumns: ScrollableTableColumn[] = [
  { label: 'Column-A', render: row => row.firstName },
  { label: 'Column-B', render: row => row.middleName },
  { label: 'Column-C', render: row => row.lastName },
];

const defaultColumnsWithLinkButton: ScrollableTableColumn[] = [
  { label: 'Name', render: row => row.title },
  { label: 'Folder', render: row => row.folder },
  {
    label: 'Action',
    render: row => (
      <LinkButton
        to={row.newReleaseRedirectUri}
        color="default"
        variant="outlined"
        style={{ width: '150px', height: '40px', textTransform: 'none' }}
      >
        New Release
      </LinkButton>
    ),
  },
];
describe('DenseScrollableTable', () => {
  it('should render for empty content', async () => {
    const rendered = await renderContent({
      columns: defaultColumns,
      loading: false,
      tableData: [],
      loadMoreData: jest.fn(),
    });
    defaultColumns.forEach(c =>
      expect(rendered.getByText(c.label as string)).toBeInTheDocument(),
    );
    expect(rendered.getByText('No templates available')).toBeInTheDocument();
  });
  it('should render for valid content', async () => {
    const data = [
      {
        firstName: 'John1',
        middleName: 'Doe1',
        lastName: 'Test1',
      },
      {
        firstName: 'John2',
        middleName: 'Doe2',
        lastName: 'Test2',
      },
      {
        firstName: 'John3',
        middleName: 'Doe3',
        lastName: 'Test3',
      },
      {
        firstName: 'John4',
        middleName: 'Doe4',
        lastName: 'Test4',
      },
    ];
    const loadMoreData = jest.fn();
    const rendered = await renderContent({
      columns: defaultColumns,
      loading: false,
      tableData: data,
      loadMoreData,
    });
    defaultColumns.forEach(c =>
      expect(rendered.getByText(c.label as string)).toBeInTheDocument(),
    );
    data.forEach(d => {
      expect(rendered.getByText(d.firstName)).toBeInTheDocument();
      expect(rendered.getByText(d.middleName)).toBeInTheDocument();
      expect(rendered.getByText(d.lastName)).toBeInTheDocument();
    });
  });
  it('should render for valid content with link button', async () => {
    const data = mockTemplateList.templates;
    const loadMoreData = jest.fn();
    const rendered = await renderContent({
      columns: defaultColumnsWithLinkButton,
      loading: false,
      tableData: data,
      loadMoreData,
    });
    defaultColumnsWithLinkButton.forEach(c =>
      expect(rendered.getByText(c.label as string)).toBeInTheDocument(),
    );
    data.forEach(d => {
      expect(rendered.getByText(d.title)).toBeInTheDocument();
      // @ts-ignore
      expect(rendered.getByText(d.folder)).toBeInTheDocument();
      const linkButtons = rendered.getAllByText('New Release');
      linkButtons.forEach((linkButton, index) => {
        expect(linkButton).toBeInTheDocument(); // Validate LinkButton
        expect(linkButton.closest('a')).toHaveAttribute(
          'href',
          data[index].newReleaseRedirectUri,
        ); // Validate URL
      });
    });
  });
  it('should call loadMoreData on scroll to bottom', async () => {
    const loadMoreData = jest.fn();
    const data = mockTemplateList.templates;

    const rendered = await renderContent({
      columns: defaultColumns,
      loading: false,
      tableData: data,
      loadMoreData,
    });

    const tableContainer = rendered.getByRole('table').parentElement;
    // @ts-ignore
    fireEvent.scroll(tableContainer, {
      target: { scrollTop: tableContainer?.scrollHeight },
    });

    expect(loadMoreData).toHaveBeenCalled();
  });
});
async function renderContent(args: {
  columns: ScrollableTableColumn[];
  tableData: any;
  loading: boolean;
  loadMoreData: () => void;
}) {
  return await renderInTestApp(
    <TestApiProvider apis={[]}>
      <ScrollableTable
        loading={args.loading}
        data={args.tableData}
        emptyContent={
          <Typography color="textSecondary">No templates available</Typography>
        }
        loadMoreData={args.loadMoreData}
        columns={args.columns}
      />
    </TestApiProvider>,
  );
}
