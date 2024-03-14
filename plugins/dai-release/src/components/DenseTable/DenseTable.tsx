import { Link, Table, TableColumn } from '@backstage/core-components';
import React from 'react';
import SyncIcon from '@material-ui/icons/Sync';
import Typography from '@mui/material/Typography';
import capitalize from 'lodash/capitalize';
import { formatTimestamp } from '../../utils/dateTimeUtils';
import { makeStyles } from '@material-ui/core';

type DenseTableProps = {
  tableData: any[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  columns: TableColumn[];
  retry: () => void;
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

export const columnFactories = Object.freeze({
  createTitleColumns(): TableColumn {
    return {
      title: 'Title',
      field: 'title',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => (
        <Link to={row.releaseId}>{row.title}</Link>
      ),
      searchable: true,
      sorting: true,
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
      sorting: true,
    };
  },
  createStatusColumns(): TableColumn {
    return {
      title: 'Status',
      field: 'status',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => capitalize(row.status),
      searchable: true,
      sorting: true,
    };
  },
  createStartDateColumns(): TableColumn {
    return {
      title: 'Start Date',
      field: 'startDate',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => formatTimestamp(row.startDate),
      searchable: true,
      sorting: true,
    };
  },
  createEndDateColumns(): TableColumn {
    return {
      title: 'End Date',
      field: 'completionDate',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => formatTimestamp(row.completionDate),
      searchable: true,
      sorting: true,
    };
  },
  createDurationColumns(): TableColumn {
    return {
      title: 'Duration',
      field: 'duration',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => row.duration,
      searchable: true,
      sorting: true,
    };
  },
  createDotsColumns(): TableColumn {
    return {
      title: 'Actions',
      field: '',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: () => '',
      searchable: true,
      sorting: true,
    };
  },
  createAdditionalDataColumns(): TableColumn {
    return {
      title: 'Additional Data',
      field: '',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: () => '',
      searchable: true,
      sorting: true,
    };
  },
});

export const defaultColumns: TableColumn[] = [
  columnFactories.createTitleColumns(),
  columnFactories.createFolderColumns(),
  columnFactories.createStatusColumns(),
  columnFactories.createStartDateColumns(),
  columnFactories.createEndDateColumns(),
  columnFactories.createDurationColumns(),
  columnFactories.createDotsColumns(),
  columnFactories.createAdditionalDataColumns(),
];

export const DenseTable = ({
  tableData,
  loading,
  page,
  pageSize,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  columns,
  retry,
}: DenseTableProps) => {
  const classes = useStyles();
  return (
    <Table
      columns={columns}
      data={tableData}
      page={page}
      totalCount={totalCount}
      isLoading={loading}
      actions={[
        {
          icon: () => <SyncIcon fontSize="default" />,
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => retry(),
        },
      ]}
      options={{
        paging: true,
        search: true,
        showTitle: false,
        pageSize: pageSize,
        pageSizeOptions: [5, 10, 20, 50],
        padding: 'dense',
        showFirstLastPageButtons: true,
        showEmptyDataSourceMessage: !loading,
        toolbar: true,
        toolbarButtonAlignment: 'left',
      }}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      emptyContent={
        <Typography color="textSecondary" className={classes.empty}>
          No tasks available
        </Typography>
      }
    />
  );
};
