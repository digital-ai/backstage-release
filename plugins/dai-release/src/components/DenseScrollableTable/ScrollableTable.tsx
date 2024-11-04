import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import React, { useRef } from 'react';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import { useObservable } from 'react-use';

const useStyles = makeStyles(() => ({
  headerStyle: {
    borderBottom: '1px solid #d5d5d5',
    borderTop: '1px solid #d5d5d5',
    fontWeight: 700,
    padding: '8px 16px',
  },
  layoutSec: {
    paddingTop: '0',
  },
  cellStyle: {
    padding: '8px 16px',
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
    height: 'calc(100vh - 200px)',
    overflowY: 'scroll',
    borderBottom: 'unset',
    overflowX: 'scroll'
  },
  emptyTableContent: {
    overflowY: 'scroll',
    overflowX: 'scroll',
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
            style={{ tableLayout: 'fixed',minWidth: '75vw'}}
          >

            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    style={column.headerStyle}
                    className={`${classes.headerStyle} ${themeId === 'dark' ? classes.darkTheme : classes.lightTheme}`}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={colIndex}
                        style={column.cellStyle}
                        className={classes.cellStyle}
                      >
                        {column.render ? column.render(row) : '\u00A0'} {/* Non-breaking space */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow style={{ height: '150px' }}>
                  <TableCell colSpan={columns.length} style={{ lineHeight: '14px' }} className={classes.cellStyle}>
                    {!loading && emptyContent}
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
