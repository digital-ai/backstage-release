import { Content, Header, Page } from '@backstage/core-components';
import { CssCell, CssGrid, DotThemeProvider } from '@digital-ai/dot-components';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { SearchHeaderComponent } from '../SearchHeaderComponent';
import { WorkflowCatalogComponent } from '../WorkflowCatalogComponent';
import { WorkflowCategoryComponent } from '../WorkflowCategoryComponent';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
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
}));
export const WorkflowComponent = () => {
  const classes = useStyles();

  const {
    data,
    error,
    instance,
    instanceList,
    loading,
    hasMore,
    setLoading,
    setPage,
    setInstance,
  } = useWorkflowCatalog();

  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setPage((prevPage: number) => prevPage + 1);
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
                titleName="Workflow catalog"
                instance={instance}
                instanceList={instanceList}
                error={error}
                onSetInstance={setInstance}
              />
            </Grid>
          </Grid>
          <CssGrid className="workflow-catalog">
            <CssCell
              center={false}
              className="workflow-drawer-content-left-cell"
              lg={{ start: 1, span: 4 }}
              md={{ start: 1, span: 4 }}
              sm={{ start: 1, span: 3 }}
              xl={{ start: 1, span: 4 }}
            >
              <div className="workflow-drawer-content-left">
                <WorkflowCategoryComponent />
              </div>
            </CssCell>
            <CssCell
              center={false}
              className="tab-content-cell"
              lg={{ start: 5, span: 8 }}
              md={{ start: 5, span: 8 }}
              sm={{ start: 1, span: 12 }}
              xl={{ start: 5, span: 8 }}
              xs={{ start: 1, span: 12 }}
            >
              <div className="workflow-cards">
                <WorkflowCatalogComponent
                  loading={loading}
                  loadMoreData={loadMoreData}
                  data={data}
                />
              </div>
            </CssCell>
          </CssGrid>
        </Content>
      </Page>
    </DotThemeProvider>
  );
};
