import { CssCell, CssGrid, DotTypography, DotDialog } from '@digital-ai/dot-components';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect, useRef } from 'react';
import { Workflow, Folder, FolderBackendResponse } from '@digital-ai/plugin-dai-release-common';
import { WorkflowCard } from './WorkflowCardComponent';
import { WorkflowCardSkeleton } from './Skeleton/WorkflowCardSkeletonComponent';
import { calculateCellProps } from '../../utils/helpers';
import { makeStyles } from '@material-ui/core';
import isNil from 'lodash/isNil';
import { useWorkflowRedirect } from '../../hooks/useWorkflowRedirect';
//import { useNavigate } from 'react-router-dom';

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
    paddingBottom: '24px',
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
  folderTree: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  folderItem: {
    padding: '8px 12px',
    cursor: 'pointer',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  selectedFolderItem: {
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
  },
  subFolder: {
    paddingLeft: '20px',
  },
}));

type WorkflowCatalogComponentProps = {
  loading: boolean;
  loadMoreData: (page: number) => void;
  data: Workflow[];
  folders: FolderBackendResponse;
  instance: string;
};

export const WorkflowCatalogComponent = ({
  loading,
  loadMoreData,
  data,
  folders,
  instance
}: WorkflowCatalogComponentProps) => {
  const classes = useStyles();
  const [, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(undefined);
    // Inside the WorkflowCatalogComponent function
    const [url, setUrl] = useState<string>('');
  const [workflowToRun, setWorkflowToRun] = useState<Workflow | null>(null);

  useWorkflowRedirect(instance, workflowToRun?.id || '', workflowToRun?.title || '', selectedFolderId || '', setUrl);

    useEffect(() => {
      if (url) {
        window.open(url, '_blank');
      }
    }, [url]);

    const handleOnRunClick = (workflowFromCategory: Workflow) => {
        setWorkflowDialogOpen(workflowFromCategory.id);
      };

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting && !loading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        loadMoreData(nextPage);
        return nextPage;
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    if (workflowDialogOpen) {
      const workflow = data.find((w) => w.id === workflowDialogOpen);
      if (workflow) {
        const createFolderId = (folderPath: string) => `Applications/${folderPath}`;
        const folderId = createFolderId(workflow.defaultTargetFolder);
        setSelectedFolderId(folderId);
      }
    }
  }, [workflowDialogOpen, data]);

  const handleWorkflowRun = (workflow: Workflow) => {
    setWorkflowToRun(workflow);
    console.log(`Running workflow: ${workflow.title}`);
  };

  const renderDialog = () => {
    const workflow = data.find((w) => w.id === workflowDialogOpen);
    if (!workflow) return null;
    const folderList: Folder[] = folders.folders;

    const renderFolderTree = (folders: Folder[], depth = 0) => {
      return folders.map((folder) => (
        <li key={folder.id} className={depth > 0 ? classes.subFolder : ''}>
          <div
            className={`${classes.folderItem} ${
              folder.id === selectedFolderId ? classes.selectedFolderItem : ''
            }`}
            onClick={() => setSelectedFolderId(folder.id)}
          >
            {folder.children && folder.children.length > 0 ? (

              <span className="dot-icon">
                <i className="icon-arrow-down"></i>
                <i className="icon-folder"></i>
              </span>
            ) : (
              <span className="dot-icon">
                <i className="icon-arrow-right"></i>
                <i className="icon-folder"></i>
              </span>
            )}
            {folder.title}
          </div>
          {folder.children && folder.children.length > 0 && (
            <ul className={classes.folderTree}>
              {renderFolderTree(folder.children, depth + 1)}
            </ul>
          )}
        </li>
      ));
    };

    return (
      <DotDialog
        cancelButtonProps={{ label: 'Cancel' }}
        className="card-folder-dialog"
        closeIconVisible={true}
        closeOnClickAway={true}
        closeOnSubmit={true}
        onSubmit={() => handleWorkflowRun(workflow)}
        open={true}
        submitButtonProps={{ label: 'Run workflow', disabled: isNil(selectedFolderId) }}
        title="Choose folder"
      >
        <DotTypography>
          Select the folder where workflow <strong>{workflow.title}</strong> will be run.
        </DotTypography>
        <DotTypography className="persistent-label" variant="subtitle2">
          Folder name
        </DotTypography>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <ul className={classes.folderTree}>{renderFolderTree(folderList)}</ul>
        </div>
      </DotDialog>
    );
  };

  const renderWorkflows = () => {
    return (
      <>
        <CssGrid
          columnGap={{ xxl: 12, xl: 12, lg: 12, md: 8, sm: 8, xs: 8 }}
          rowGap={{ xxl: 12, xl: 12, lg: 12, md: 8, sm: 8, xs: 8 }}
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

        {data.length === 0 && !loading && (
          <CssGrid
            columnGap={{ xxl: 12, xl: 12, lg: 12, md: 8, sm: 8, xs: 8 }}
            rowGap={{ xxl: 12, xl: 12, lg: 12, md: 8, sm: 8, xs: 8 }}
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
      {renderDialog()}
      <div ref={observerTarget} />
    </div>
  );
};