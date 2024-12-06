import { Content, Header, Page } from '@backstage/core-components';
import { CssCell, CssGrid, DotThemeProvider } from '@digital-ai/dot-components';
import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import {CategoriesContentActiveList} from '@digital-ai/plugin-dai-release-common';
import { SearchHeaderComponent } from '../SearchHeaderComponent';
import { WorkflowCatalogComponent } from '../WorkflowCatalogComponent';
import { WorkflowCategoryComponent } from '../WorkflowCategoryComponent';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useReleaseCategories } from '../../hooks/useReleaseCategories';
import { useWorkflowCatalog } from '../../hooks/useWorkflowCatalog';
import {ReleaseResponseErrorPanel} from "../ReleaseResponseErrorPanel";

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

export type WorkFlowSearch = {
  categories: string[];
  author: string;
};
export const WorkflowComponent = () => {
  const classes = useStyles();
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
    <DotThemeProvider>
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
              />
            </Grid>
          </Grid>
          <div className={classes.horizontalBar}/>
          {error && !loading ? (
              <ReleaseResponseErrorPanel error={error} />
          ) : (
          <div style={{paddingTop: '12px'}}>
          <CssGrid className="workflow-catalog">
            <CssCell
                center={false}
                className={classes.workflowDrawerContentLeftCells}
                lg={{start: 1, span: 4}}
                md={{start: 1, span: 6}}
                sm={{start: 1, span: 12}}
                xl={{start: 1, span: 4}}
                xxl={{start: 1, span: 3}}
            >
              <div className="workflow-drawer-content-left">
                <WorkflowCategoryComponent
                    releaseCategories={releaseCategories}
                    isLoadingCategories={loadingReleaseCategories}
                    instance={instance}
                />
              </div>
            </CssCell>
            <CssCell
                center={false}
                className={classes.workflowCatalogContentCell}
                lg={{start: 5, span: 10}}
                md={{start: 7, span: 10}}
                sm={{start: 1, span: 12}}
                xl={{start: 5, span: 8}}
                xs={{start: 1, span: 12}}
                xxl={{start: 4, span: 9}}
            >
              <div className="workflow-cards">
                <WorkflowCatalogComponent
                    loading={loading}
                    loadMoreData={loadMoreData}
                    data={filteredData}
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
