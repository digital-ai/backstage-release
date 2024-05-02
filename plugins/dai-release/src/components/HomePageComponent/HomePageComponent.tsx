import { Content, Header, Page } from '@backstage/core-components';
import { DenseTable, defaultColumns } from '../DenseTable';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { ReleaseResponseErrorPanel } from '../ReleaseResponseErrorPanel';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useReleases } from '../../hooks';
import {SearchFilter} from "../SearchFilter";

const useStyles = makeStyles(() => ({
  logoStyle: {
    width: '300px',
  },
}));
export const HomePageComponent = () => {
  const classes = useStyles();
  const {
    items,
    loading,
    error,
    retry,
    page,
    rowsPerPage,
    searchTitle,
    fromDate,
    toDate,
    orderBy,
    statusTags,
    setPage,
    setRowsPerPage,
    setSearchTitle,
    setFromDate,
    setToDate,
    setOrderBy,
    setStatusTags,
  } = useReleases();

  if (error) {
    return <ReleaseResponseErrorPanel error={error} />;
  }

  return (
    <Page themeId="home">
      <Header
        title={
          <img
            src={releaseLogoWhite}
            alt="Release logo"
            className={classes.logoStyle}
          />
        }
        pageTitleOverride="Digital.ai Release"
      />
      <Content>
        <Grid container spacing={3} direction="column">
          <Grid item>
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
            <DenseTable
              page={page}
              pageSize={rowsPerPage}
              loading={loading}
              totalCount={items?.total ?? 100}
              tableData={items?.releases || []}
              columns={defaultColumns}
              retry={retry}
              searchTitle={searchTitle}
              fromDate={fromDate}
              toDate={toDate}
              orderBy={orderBy}
              statusTags={statusTags}
              onRowsPerPageChange={setRowsPerPage}
              onPageChange={setPage}
              setSearchTitle={setSearchTitle}
              setFromDate={setFromDate}
              setToDate={setToDate}
              setOrderBy={setOrderBy}
              setStatusTags={setStatusTags}
            />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
