import { Content, Header, Page } from '@backstage/core-components';
import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { CategoriesContentActiveList } from '@digital-ai/plugin-dai-release-common';
import { DotThemeProvider } from '@digital-ai/dot-components';
import { SearchHeaderComponent } from '../SearchHeaderComponent';
import { WorkflowCategoryComponent } from '../WorkflowCategoryComponent';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useReleaseCategories } from '../../hooks/useReleaseCategories';
import { useWorkflowCatalog } from '../../hooks/useWorkflowCatalog';

const useStyles = makeStyles(() => ({
  logoStyle: {
    width: '300px',
  },
  layoutSec: {
    paddingTop: '0',
  },
  horizontalBar: {
    width: '100%',
    height: '0.5px',
    backgroundColor: '#e3e5e8', // or any color you prefer
    color: '#e3e5e8',
  },
}));

export type WorkFlowSearch = {
  categories: string[];
  author: string;
}

export const WorkflowComponent = () => {
  const classes = useStyles();
  const [loadingReleaseCategories, setLoadingReleaseCategories] =
    useState(true);

  const [releaseCategories, setReleaseCategories] = useState<
    CategoriesContentActiveList[]
  >([]);

  const { error, instance, instanceList, setInstance } = useWorkflowCatalog();
  useReleaseCategories(
    instance,
    setReleaseCategories,
    setLoadingReleaseCategories,
  );

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
        <Grid container spacing={1} direction="column">
          <SearchHeaderComponent
            displayFilterIcon={false}
            titleName="Workflow catalog"
            instance={instance}
            instanceList={instanceList}
            error={error}
            onSetInstance={setInstance}
          />
        </Grid>
        <div className={classes.horizontalBar} />
        <Grid>
          <DotThemeProvider>
            <WorkflowCategoryComponent
              releaseCategories={releaseCategories}
              isLoadingCategories={loadingReleaseCategories}
              instance={instance}
            />
          </DotThemeProvider>
        </Grid>
      </Content>
    </Page>
  );
};
