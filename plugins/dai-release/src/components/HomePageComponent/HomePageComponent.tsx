import { Content, Header, Page } from '@backstage/core-components';
import { DenseTable, defaultColumns } from '../DenseTable';
import {Grid, makeStyles} from '@material-ui/core';
import React from 'react';
import { useReleases } from '../../hooks';
import { ReleaseResponseErrorPanel } from '../ReleaseResponseErrorPanel';
import { useObservable } from 'react-use';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import releaseLogoBlack from '../../assets/releaseLogoBlack.png';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';



const useStyles = makeStyles(() => ({
  logoStyle: {
    width: '300px'
   ,
  },
}));
export const HomePageComponent = () => {
  const {
    items,
    loading,
    error,
    retry,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    setOrderBy,
    setOrderDirection,
  } = useReleases();

  if (error) {
    return <ReleaseResponseErrorPanel error={error} />;
  }
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );
  const classes = useStyles();
  return (
    <Page themeId="home">
      <Header title={<img
          src={themeId === 'dark' ? releaseLogoWhite : releaseLogoBlack}
          alt="Release logo" className={classes.logoStyle}
      />}>
      </Header>
      <Content>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <DenseTable
              page={page}
              pageSize={rowsPerPage}
              loading={loading}
              totalCount={items?.total ?? 100}
              tableData={items?.releases || []}
              onRowsPerPageChange={setRowsPerPage}
              onPageChange={setPage}
              columns={defaultColumns}
              retry={retry}
              onOrderDirection={setOrderDirection}
              onOrderBy={setOrderBy}
            />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
