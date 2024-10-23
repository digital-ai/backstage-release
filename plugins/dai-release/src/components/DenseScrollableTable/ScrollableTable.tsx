import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import React, { useRef } from 'react';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import { useObservable } from 'react-use';

const useStyles = makeStyles(() => ({
  headerStyle: {
    borderBottom: '1px solid #d5d5d5',
    borderTop: '1px solid #d5d5d5',
    fontWeight: 700,
    padding: '8px 16px 8px 20px',
  },
  layoutSec: {
    paddingTop: '0',
  },
  cellStyle: {
    padding: '8px 10px 8px 18px',
  },
  customLoadingIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  defaultTableContainer: {
    height: '80vh',
    overflowY: 'scroll',
    borderBottom: 'unset',
  },
  emptyTableContent: {
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  darkTheme: {
    backgroundColor: '#424242',
  },
  lightTheme: {
    backgroundColor: '#FFFFFF',
  },
}));

export interface ScrollableTableColumn {
  label: string;
  headerStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  render?: (row: any) => React.ReactNode;
}
type ScrollableProps = {
  loading: boolean;
  loadMoreData: () => void;
  data: any[];
  emptyContent: any;
  columns: ScrollableTableColumn[];
};
export const ScrollableTable = ({
  loading,
  loadMoreData,
  data,
  emptyContent,
  columns,
}: ScrollableProps) => {
  const containerRef = useRef(null);
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreData(); // Load the next page of data
      }
    }
  };
  const classes = useStyles();
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );
  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div className={classes.customLoadingIcon}>
          <CircularProgress />
        </div>
      )}
      <Paper>
        <TableContainer
          className={
            data.length === 0
              ? classes.emptyTableContent
              : classes.defaultTableContainer
          }
          ref={containerRef}
          onScroll={handleScroll}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ tableLayout: 'fixed' }}
          >
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    style={column.headerStyle}
                    className={`${classes.headerStyle} ${themeId === 'dark' ? classes.darkTheme : classes.lightTheme}`}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 &&
                data.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={colIndex}
                        style={column.cellStyle}
                        className={classes.cellStyle}
                      >
                        {column.render ? column.render(row) : ''}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {data.length === 0 && (
                <TableRow style={{ height: '150px' }}>
                  <TableCell colSpan={4} style={{ lineHeight: '18px' }}>
                    {data.length === 0 && !loading && emptyContent}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
