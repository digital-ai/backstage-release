import { Content, Header} from '@backstage/core-components';
import {Grid, makeStyles,} from '@material-ui/core';
import React, {useEffect} from 'react';
import { ReleaseResponseErrorPanel } from '../ReleaseResponseErrorPanel';
import { ScrollableTable } from "../DenseScrollableTable/ScrollableTable";
import { SearchHeaderComponent } from '../SearchHeaderComponent';
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
    loading,
    error,
    data,
    hasMore,
    searchTitle,
    instance,
    instanceList,
    setPage,
    setSearchTitle,
    setInstance,
    setLoading,
    setHasMore,
    setData
  } = useTemplates();

  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setPage((prevPage: number) => prevPage + 1);
  };
  return (
<div>
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
              error={error}
              onSearchByTitle={setSearchTitle}
              onSetInstance={setInstance}
              onSetData={setData}
              onSetHasMore={setHasMore}
              onSetLoading={setLoading}
            />
            {error && !loading ? (
              <ReleaseResponseErrorPanel error={error} />
            ) : (
                <ScrollableTable
                    loading={loading}
                    loadMoreData={loadMoreData}
                    data={data}
                />
            )}
          </Grid>
        </Grid>
      </Content>
</div>
  );
};
