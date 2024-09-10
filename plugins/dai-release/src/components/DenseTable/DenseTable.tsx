import {Link, LinkButton, Table, TableColumn} from '@backstage/core-components';
import React from 'react';
import { ReleasePopOverComponent } from '../ReleasePopOverComponent';
import Typography from '@mui/material/Typography';
import capitalize from 'lodash/capitalize';
import { createSvgIcon } from '@mui/material/utils';
import dayjs from 'dayjs';
import { formatTimestamp } from '../../utils/dateTimeUtils';
import { makeStyles } from '@material-ui/core';


type DenseTableProps = {
  tableData: any[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  columns: TableColumn[];
  retry: () => void;
  searchTitle: string;
  fromDate?: dayjs.Dayjs | null;
  toDate?: dayjs.Dayjs | null;
  orderBy?: string;
  statusTags?: string[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  setSearchTitle: (title: string) => void;
  setFromDate?: (fromDate: dayjs.Dayjs | null) => void;
  setToDate?: (toDate: dayjs.Dayjs | null) => void;
  setOrderBy?: (orderBy: string) => void;
  setStatusTags?: (statusTags: string[]) => void;
};
const headerStyle: React.CSSProperties = {
  textTransform: 'capitalize',
  whiteSpace: 'nowrap',
};
const cellStyle: React.CSSProperties = { width: 'auto', whiteSpace: 'nowrap' };

const useStyles = makeStyles(theme => ({
  empty: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
);

export const columnFactories = Object.freeze({
  createTitleColumns(): TableColumn {
    return {
      title: 'Title',
      field: 'title',
      cellStyle: { width: '180px', display: 'block', lineHeight: '18px' },
      headerStyle: headerStyle,
      render: (row: Partial<any>) => (
        <Link to={row.releaseRedirectUri}>{row.title}</Link>
      ),
      searchable: true,
      sorting: false,
    };
  },
  createFolderColumns(): TableColumn {
    return {
      title: 'Folder',
      field: 'folder',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => capitalize(row.folder),
      searchable: true,
      sorting: false,
    };
  },
  createStatusColumns(): TableColumn {
    return {
      title: 'Status',
      field: 'status',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => capitalize(row.status.replace('_', ' ')),
      searchable: true,
      sorting: false,
    };
  },
  createFromDateColumns(): TableColumn {
    return {
      title: 'Start Date',
      field: 'startDate',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => formatTimestamp(row.fromDate),
      searchable: true,
      sorting: false,
    };
  },

  createEndDateColumns(): TableColumn {
    return {
      title: 'End Date',
      field: 'endDate',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => formatTimestamp(row.endDate),
      searchable: true,
      sorting: false,
    };
  },

  createAdditionalDataColumns(): TableColumn {
    return {
      title: '',
      field: '',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (_row: Partial<any>) => <ReleasePopOverComponent />,
      searchable: false,
      sorting: false,
    };
  },

  createTemplateNameColumns(): TableColumn {
    return {
      title: 'Name',
      field: 'name',
      cellStyle: { width: '180px', display: 'block', lineHeight: '18px' },
      headerStyle: headerStyle,
      render: (row: Partial<any>) => (
          <Link to={row.releaseRedirectUri}>{row.name}</Link>
      ),
      searchable: true,
      sorting: false,
    };
  },
  createTemplateActionColumns(): TableColumn {
    return {
      title: 'Action',
      field: 'name',
      cellStyle: { width: '180px', display: 'block', lineHeight: '18px' },
      headerStyle: headerStyle,
      render: (row: Partial<any>) => (
          <div style={{ width: '150px', height: '40px'}}>
          <LinkButton to={row.releaseRedirectUri} color="default" variant="outlined" style={{ width: '150px', height: '40px', textTransform: 'none' }}  startIcon={<PlusIcon />}>
         {/* <PlusIcon style={{ marginRight: '3px'}}/> */} New Releases
          </LinkButton>
          </div>
      ),
      searchable: true,
      sorting: false,
    };
  },
});

export const defaultColumns: TableColumn[] = [
  columnFactories.createTitleColumns(),
  columnFactories.createFolderColumns(),
  columnFactories.createStatusColumns(),
  columnFactories.createFromDateColumns(),
  columnFactories.createAdditionalDataColumns(),
];

export const defaultTemplateColumns: TableColumn[] = [
  columnFactories.createTemplateNameColumns(),
  columnFactories.createFolderColumns(),
  columnFactories.createTemplateActionColumns(),
  columnFactories.createAdditionalDataColumns(),
];

export const DenseTable = ({
  tableData,
  loading,
  page,
  pageSize,
  totalCount,
  columns,
  onPageChange,
  onRowsPerPageChange,
}: DenseTableProps) => {
  const classes = useStyles();
  return (
    <Table
      columns={columns}
      data={tableData}
      page={page}
      totalCount={totalCount}
      isLoading={loading}
      options={{
        paging: true,
        search: true,
        showTitle: false,
        pageSize: pageSize,
        pageSizeOptions: [5, 10, 20, 50],
        padding: 'dense',
        showFirstLastPageButtons: true,
        showEmptyDataSourceMessage: !loading,
        toolbar: false,
      }}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      style={{ minWidth: '950px', width: '100%' }}
      emptyContent={
        <Typography color="textSecondary" className={classes.empty}>
          No releases available
        </Typography>
      }
    />
  );
};
