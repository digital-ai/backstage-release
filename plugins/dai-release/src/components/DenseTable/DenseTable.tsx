import {Link, LinkButton, Table, TableColumn} from '@backstage/core-components';
import React from 'react';
import SyncIcon from '@material-ui/icons/Sync';
import Typography from '@mui/material/Typography';
import capitalize from 'lodash/capitalize';
import { formatTimestamp } from '../../utils/dateTimeUtils';
import { makeStyles } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import {IconButton} from "@mui/material";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';

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
  onOrderDirection: (order: string) => void;
  onOrderBy: (orderBy: number) => void;
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

function calculateDuration(startTime: number, endTime?: number) : string {
  if (endTime === undefined) {
    return '';
  }
  const durationMs = endTime - startTime
  const duration = moment.duration(durationMs,'ms')
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  // Format the duration
  const formattedDuration = `${days}d ${hours}h, ${minutes}m`;
  return formattedDuration
}

enum releaseColumn {
  'start_date' = 3,
  'end_date' = 4,
}

export const columnFactories = Object.freeze({
  createTitleColumns(): TableColumn {
    return {
      title: 'Title',
      field: 'title',
      cellStyle: cellStyle,
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
      render: (row: Partial<any>) => (
        capitalize(row.status.replace('_', ' '))
    ),
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
      render: (row: Partial<any>) => (
          calculateDuration(row.startDate, row.endDate)
      ),
      searchable: false,
      sorting: false,
    };
  },

  createAdditionalDataColumns(): TableColumn {
    return {
      title: 'Additional Data',
      field: '',
      cellStyle: cellStyle,
      headerStyle: headerStyle,
      render: (row: Partial<any>) => (
          <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              size="small"
          >
            <MoreVertIcon />
          </IconButton>
      ),
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
  onPageChange,
  onRowsPerPageChange,
  columns,
  retry,
  onOrderDirection,
  onOrderBy
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
      onOrderChange={(orderBy, orderDirection) => {
        onOrderBy(orderBy);
        onOrderDirection(orderDirection);
      }}
    />
  );
};
