import { CssCell, CssGrid, DotTypography } from '@digital-ai/dot-components';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Workflow } from '@digital-ai/plugin-dai-release-common';
import { WorkflowCard } from './WorkflowCardComponent';
import { WorkflowCardSkeleton } from './Skeleton/WorkflowCardSkeletonComponent';
import { calculateCellProps } from '../../utils/helpers';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  searchHeader: {
    marginBottom: '5px',
  },
  dotIconSize: {
    fontSize: '16px',
  },
  workflowCatalog: {
    height: '100%',
    width: '100%',
  },
  workflowDrawerHeaderSearch: {
    paddingBottom: '24px', // .spacing(padding-bottom, 3);
  },
  workflowCards: {
    flex: 1,
    overflowY: 'auto',
  },
  catalogGrid: {
    marginTop: '24px',
  },
}));

type WorkflowCatalogComponentProps = {
  loading: boolean;
  loadMoreData: () => void;
  data: Workflow[];
};

export const WorkflowCatalogComponent = ({
  loading,
  loadMoreData,
  data,
}: WorkflowCatalogComponentProps) => {
  const classes = useStyles();
  const handleOnRunClick = (workflowFromCategory: Workflow) => {
    // need to add the logic to run the workflow
    global.console.log(workflowFromCategory, loadMoreData);
  };

  const renderWorkflows = () => {
    return (
      <CssGrid
        columnGap={{ xxl: 12, xl: 12, lg: 12, md: 8, sm: 8, xs: 8 }}
        rowGap={{ xxl: 12, xl: 12, lg: 12, md: 8, sm: 8, xs: 8 }}
        row-gap="12px"
        className={classes.catalogGrid}
      >
        {data.map((currentWorkflow: Workflow, index: number) => {
          const props = calculateCellProps(index);
          return (
            <CssCell {...props} key={currentWorkflow.id}>
              <WorkflowCard
                onClick={() => handleOnRunClick(currentWorkflow)}
                workflow={currentWorkflow}
              />
            </CssCell>
          );
        })}
        {loading &&
          [...Array(3)].map((_value, skeletonIndex) => {
            const props = calculateCellProps(skeletonIndex);
            return (
              <CssCell {...props} key={skeletonIndex}>
                <WorkflowCardSkeleton />
              </CssCell>
            );
          })}
      </CssGrid>
    );
  };

  return (
    <div className={classes.workflowDrawerHeaderSearch}>
      <div className="search-row">
        <DotTypography className={classes.searchHeader} variant="h4">
          Search Workflows
        </DotTypography>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <span className={`${classes.dotIconSize} dot-icon`}>
              <i className="icon-search" />
            </span>
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Start typing to filter workflows..."
            inputProps={{ 'aria-label': 'search google maps' }}
          />
        </Paper>
        {renderWorkflows()}
      </div>
    </div>
  );
};
