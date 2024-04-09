import { Content, Header, Page } from '@backstage/core-components';
import { DenseTable, defaultColumns } from '../DenseTable';
import { Grid, makeStyles } from '@material-ui/core';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import React from 'react';
import { ReleaseResponseErrorPanel } from '../ReleaseResponseErrorPanel';
import releaseLogoBlack from '../../assets/releaseLogoBlack.png';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useObservable } from 'react-use';
import { useReleases } from '../../hooks';

const useStyles = makeStyles(() => ({
  logoStyle: {
    width: '300px',
  },
}));
export const HomePageComponent = () => {
  const classes = useStyles();
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );
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
    setOrderDirection,
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
            src={themeId === 'dark' ? releaseLogoWhite : releaseLogoBlack}
            alt="Release logo"
            className={classes.logoStyle}
          />
        }
        pageTitleOverride="Digital.ai Release"
      />
      <Content>
        <Grid container spacing={3} direction="column">
          <Grid item>
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
              onOrderDirection={setOrderDirection}
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
