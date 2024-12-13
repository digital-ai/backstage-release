import {
  CssCell,
  CssGrid,
  DotInputText,
  DotTypography,
} from '@digital-ai/dot-components';
import React, { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
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
    fontSize: '20px',
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
  noWorkflow: {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

type WorkflowCatalogComponentProps = {
  loading: boolean;
  loadMoreData: () => void;
  data: Workflow[];
  searchInput: string;
  onSearchInput: (searchInput: string) => void;
  resetState: () => void;
};

export const WorkflowCatalogComponent = ({
  loading,
  loadMoreData,
  data,
  searchInput,
  onSearchInput,
  resetState,
}: WorkflowCatalogComponentProps) => {
  const classes = useStyles();
  const handleOnRunClick = (workflowFromCategory: Workflow) => {
    // need to add the logic to run the workflow
    global.console.log(workflowFromCategory, loadMoreData);
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreData(); // Load the next page of data
      }
    }
  };

  function handleSearchInput(value: string) {
    resetState();
    onSearchInput(value);
  }
  const renderWorkflows = () => {
    return (
      <>
        <CssGrid
          columnGap={{ xxl: 12, xl: 12, lg: 12, md: 8, sm: 8, xs: 8 }}
          rowGap={{ xxl: 12, xl: 12, lg: 12, md: 8, sm: 8, xs: 8 }}
          row-gap="12px"
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

        {data.length === 0 && !loading && (
          <CssGrid
            columnGap={{ xxl: 12, xl: 12, lg: 12, md: 8, sm: 8, xs: 8 }}
            rowGap={{ xxl: 12, xl: 12, lg: 12, md: 8, sm: 8, xs: 8 }}
            row-gap="12px"
            className={classes.noWorkflow}
          >
            <CssCell>
              <DotTypography variant="body1">No workflows found</DotTypography>
            </CssCell>
          </CssGrid>
        )}
      </>
    );
  };

  return (
    <div className={classes.workflowDrawerHeaderSearch}>
      <DotTypography className={classes.searchHeader} variant="subtitle2">
        Search Workflows
      </DotTypography>
      <DotInputText
        id="search-input"
        name="search-input"
        onChange={e => handleSearchInput(e.target.value)}
        persistentLabel
        placeholder="Start typing to filter workflows..."
        value={searchInput}
        endIcon={
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <span
              className={`${classes.dotIconSize} dot-icon`}
              style={{ height: '20px', fontSize: '20px' }}
            >
              <i className="icon-search" />
            </span>
          </IconButton>
        }
      />
      <br />
      <div
        className="search-row"
        style={{ height: 'calc(80vh - 100px)', overflowY: 'scroll' }}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {renderWorkflows()}
      </div>
    </div>
  );
};
