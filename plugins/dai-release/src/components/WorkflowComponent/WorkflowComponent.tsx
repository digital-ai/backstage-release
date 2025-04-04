import { Content, Header, Page } from '@backstage/core-components';
import { CssCell, CssGrid, DotThemeProvider } from '@digital-ai/dot-components';
import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import { CategoriesContentActiveList } from '@digital-ai/plugin-dai-release-common';
import { ReleaseResponseErrorPanel } from '../ReleaseResponseErrorPanel';
import { SearchHeaderComponent } from '../SearchHeaderComponent';
import { WorkflowCatalogComponent } from '../WorkflowCatalogComponent';
import { WorkflowCategoryComponent } from '../WorkflowCategoryComponent';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useObservable } from 'react-use';
import { useReleaseCategories } from '../../hooks/useReleaseCategories';
import { useWorkflowCatalog } from '../../hooks/useWorkflowCatalog';

const useStyles = makeStyles(() => ({
  logoStyle: {
    width: '300px',
  },
  layoutSec: {
    paddingTop: '0',
  },
  workflowHeaderSec: {
    flexWrap: 'nowrap',
  },
  horizontalBar: {
    width: '100%',
    height: '0.5px',
    backgroundColor: '#e3e5e8', // or any color you prefer
    color: '#e3e5e8',
  },
  workflowDrawerContentLeftCells: {
    justifyContent: 'flex-start !important',
    padding: '0px 16px 0px 16px',
  },
  workflowCatalogContentCell: {
    justifyContent: 'flex-start !important',
  },
}));

export const WorkflowComponent = () => {
  const classes = useStyles();
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );
  const backstageTheme = themeId === 'dark' ? 'dark' : 'light';
  const [loadingReleaseCategories, setLoadingReleaseCategories] =
    useState(true);

  const [releaseCategories, setReleaseCategories] = useState<
    CategoriesContentActiveList[]
  >([]);

  const {
    data,
    error,
    instance,
    instanceList,
    loading,
    hasMore,
    searchInput,
    setSearchInput,
    workflowSearch,
    setWorkflowSearch,
    setLoading,
    setHasMore,
    setData,
    setPage,
    setInstance,
  } = useWorkflowCatalog();
  useReleaseCategories(
    instance,
    setReleaseCategories,
    setLoadingReleaseCategories,
  );
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setPage((prevPage: number) => prevPage + 1);
  };
  const resetState = () => {
    setData([]);
    setHasMore(true);
    setLoading(true);
  };
  const filteredData = customSearchQuery
    ? data.filter((row: { [x: string]: { toString: () => string } }) =>
        ['title', 'description'].some(key =>
          row[key]
            ?.toString()
            .toLowerCase()
            .includes(customSearchQuery?.toLowerCase()),
        ),
      )
    : data;
  const handleCustomSearchChange = (customSearchStr: string) => {
    setCustomSearchQuery(customSearchStr);
  };
  return (
    <DotThemeProvider theme={backstageTheme}>
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
          <Grid
            container
            spacing={1}
            direction="column"
            className={classes.workflowHeaderSec}
          >
            <Grid item>
              <SearchHeaderComponent
                displayFilterIcon={false}
                displayTableSearchFilter
                titleName="Workflow catalog"
                instance={instance}
                instanceList={instanceList}
                customSearch={customSearchQuery}
                onCustomSearch={handleCustomSearchChange}
                error={error}
                onSetInstance={setInstance}
                resetState={resetState}
                onSetWorkflowSearch={setWorkflowSearch}
              />
            </Grid>
          </Grid>
          <div className={classes.horizontalBar} />
          {error && !loading ? (
            <ReleaseResponseErrorPanel error={error} />
          ) : (
            <div style={{ paddingTop: '12px' }}>
              <CssGrid className="workflow-catalog">
                <CssCell
                  center={false}
                  className={classes.workflowDrawerContentLeftCells}
                  lg={{ start: 1, span: 4 }}
                  md={{ start: 1, span: 6 }}
                  sm={{ start: 1, span: 12 }}
                  xl={{ start: 1, span: 4 }}
                  xxl={{ start: 1, span: 3 }}
                >
                  <div className="workflow-drawer-content-left">
                    <WorkflowCategoryComponent
                      releaseCategories={releaseCategories}
                      isLoadingCategories={loadingReleaseCategories}
                      instance={instance}
                      onSetWorkflowSearch={setWorkflowSearch}
                      workflowSearch={workflowSearch}
                      resetState={resetState}
                    />
                  </div>
                </CssCell>
                <CssCell
                  center={false}
                  className={classes.workflowCatalogContentCell}
                  lg={{ start: 5, span: 10 }}
                  md={{ start: 7, span: 10 }}
                  sm={{ start: 1, span: 12 }}
                  xl={{ start: 5, span: 8 }}
                  xs={{ start: 1, span: 12 }}
                  xxl={{ start: 4, span: 9 }}
                >
                  <div className="workflow-cards">
                    <WorkflowCatalogComponent
                      loading={loading}
                      loadMoreData={loadMoreData}
                      data={filteredData}
                      searchInput={searchInput}
                      onSearchInput={setSearchInput}
                      resetState={resetState}
                      instance={instance}
                      backstageTheme={backstageTheme}
                    />
                  </div>
                </CssCell>
              </CssGrid>
            </div>
          )}
        </Content>
      </Page>
    </DotThemeProvider>
  );
};
