import { Content, Header, Page } from '@backstage/core-components';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { SearchHeaderComponent } from '../SearchHeaderComponent';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useWorkflowCatalog } from '../../hooks/useWorkflowCatalog';
import { WorkflowCategoryComponent } from '../WorkflowCategoryComponent';
import { WorkflowCatalogComponent } from '../WorkflowCatalogComponent';

const useStyles = makeStyles(() => ({
  logoStyle: {
    width: '300px',
  },
  layoutSec: {
    paddingTop: '0',
  },
}));
export const WorkflowComponent = () => {
  const classes = useStyles();

  const { error, instance, instanceList, setInstance } = useWorkflowCatalog();

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
              displayFilterIcon={false}
              titleName="Workflow catalog"
              instance={instance}
              instanceList={instanceList}
              error={error}
              onSetInstance={setInstance}
            />
          </Grid>
        </Grid>
        <WorkflowCategoryComponent />
        <WorkflowCatalogComponent />
      </Content>
    </Page>
  );
};
