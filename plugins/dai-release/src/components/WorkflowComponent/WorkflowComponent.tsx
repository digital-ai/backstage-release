import { Content, Header, Page } from '@backstage/core-components';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { SearchHeaderComponent } from '../SearchHeaderComponent';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useWorkflowCatalog } from '../../hooks/useWorkflowCatalog';
import { WorkflowCategoryComponent } from '../WorkflowCategoryComponent';
import {DotThemeProvider} from "@digital-ai/dot-components";
import {useReleaseCategories} from "../../hooks/useReleaseCategories";
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
        color: '#e3e5e8'
    },
}));


export const WorkflowComponent = () => {
  const classes = useStyles();


  const { error, instance, instanceList, setInstance } = useWorkflowCatalog();
    const { error, instance, instanceList, setInstance } = useReleaseCategories();


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
            <div className={classes.horizontalBar}></div>
            <Grid>
                <DotThemeProvider>
                <WorkflowCategoryComponent/>
                </DotThemeProvider>

        </Grid>

    </Content>

</Page>
  );
};



