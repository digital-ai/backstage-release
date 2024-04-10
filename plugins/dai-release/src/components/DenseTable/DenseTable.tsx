import { Link, Table, TableColumn } from '@backstage/core-components';
import React from 'react';
import { ReleasePopOverComponent } from '../ReleasePopOverComponent';
import { SearchFilter } from '../SearchFilter';
import SyncIcon from '@material-ui/icons/Sync';
import Typography from '@mui/material/Typography';
import capitalize from 'lodash/capitalize';
import dayjs from 'dayjs';
import { formatTimestamp } from '../../utils/dateTimeUtils';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';

type DenseTableProps = {
  tableData: any[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  columns: TableColumn[];
  retry: () => void;
  searchTitle: string;
  fromDate: dayjs.Dayjs | null;
  toDate: dayjs.Dayjs | null;
  orderBy: string;
  statusTags: string[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onOrderDirection: (order: string) => void;
  setSearchTitle: (title: string) => void;
  setFromDate: (fromDate: dayjs.Dayjs | null) => void;
  setToDate: (toDate: dayjs.Dayjs | null) => void;
  setOrderBy: (orderBy: string) => void;
  setStatusTags: (statusTags: string[]) => void;
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

function calculateDuration(startTime: number, endTime?: number): string {
  if (endTime === undefined) {
    return '';
  }
  const durationMs = endTime - startTime;
  const duration = moment.duration(durationMs, 'ms');
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  // Format the duration
  return `${days}d ${hours}h, ${minutes}m`;
}

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
      field: 'endDate',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => formatTimestamp(row.endDate),
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
      render: (row: Partial<any>) =>
        calculateDuration(row.startDate, row.endDate),
      searchable: false,
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
});

export const defaultColumns: TableColumn[] = [
  columnFactories.createTitleColumns(),
  columnFactories.createFolderColumns(),
  columnFactories.createStatusColumns(),
  columnFactories.createStartDateColumns(),
  columnFactories.createEndDateColumns(),
  columnFactories.createDurationColumns(),
  columnFactories.createAdditionalDataColumns(),
];

export const DenseTable = ({
  tableData,
  loading,
  page,
  pageSize,
  totalCount,
  columns,
  retry,
  searchTitle,
  fromDate,
  toDate,
  orderBy,
  statusTags,
  onPageChange,
  onRowsPerPageChange,
  // onOrderDirection,
  setSearchTitle,
  setFromDate,
  setToDate,
  setOrderBy,
  setStatusTags,
}: DenseTableProps) => {
  const classes = useStyles();
  return (
    <Table
      components={{
        Toolbar: () => (
          <>
            <SearchFilter
              searchTitle={searchTitle}
              fromDate={fromDate}
              toDate={toDate}
              orderBy={orderBy}
              statusTags={statusTags}
              onSearchByTitle={setSearchTitle}
              onFromDateChange={setFromDate}
              onToDateChange={setToDate}
              onOrderByChange={setOrderBy}
              onStatusTagChange={setStatusTags}
              retry={retry}
            />
          </>
        ),
      }}
      columns={columns}
      data={tableData}
      page={page}
      totalCount={totalCount}
      isLoading={loading}
      actions={[
        {
          icon: () => <SyncIcon fontSize="medium" />,
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
          No releases available
        </Typography>
      }
      // onOrderChange={(orderBy, orderDirection) => {
      //   //onOrderBy(orderBy);
      //   onOrderDirection(orderDirection);
      // }}
    />
  );
};
