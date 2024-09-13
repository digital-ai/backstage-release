import { Content, Header, Page } from '@backstage/core-components';
import { Grid, makeStyles } from '@material-ui/core';
import { DenseTable } from '../DenseTable';
import React from 'react';
import { ReleaseResponseErrorPanel } from '../ReleaseResponseErrorPanel';
import { SearchHeaderComponent } from '../SearchHeaderComponent';
import { defaultTemplateColumns } from '../DenseTable/DenseTable';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useTemplates } from '../../hooks';

const useStyles = makeStyles(() => ({
  logoStyle: {
    width: '300px',
  },
  layoutSec: {
    paddingTop: '0',
  },
}));
export const TemplateHomePageComponent = () => {
  const classes = useStyles();

  const {
    items,
    loading,
    error,
    retry,
    page,
    rowsPerPage,
    searchTitle,
    instance,
    instanceList,
    setPage,
    setRowsPerPage,
    setSearchTitle,
    setInstance,
  } = useTemplates();

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
      <Content className={classes.layoutSec}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <SearchHeaderComponent
              displayFilter={false}
              searchTitleTextField="Search by name"
              titleName="Templates"
              searchTitle={searchTitle}
              instance={instance}
              instanceList={instanceList}
              retry={retry}
              error={error}
              onSearchByTitle={setSearchTitle}
              onSetInstance={setInstance}
            />
            {error && !loading ? (
              <ReleaseResponseErrorPanel error={error} />
            ) : (
              <DenseTable
                page={page}
                pageSize={rowsPerPage}
                loading={loading}
                totalCount={items?.total ?? 100}
                tableData={items?.templates || []}
                columns={defaultTemplateColumns}
                retry={retry}
                searchTitle={searchTitle}
                onRowsPerPageChange={setRowsPerPage}
                onPageChange={setPage}
                setSearchTitle={setSearchTitle}
              />
            )}
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
