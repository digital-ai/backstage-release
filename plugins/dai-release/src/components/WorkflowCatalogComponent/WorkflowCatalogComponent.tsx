import { CssCell, CssGrid, DotDialog, DotTypography } from '@digital-ai/dot-components';
import { Folder, FolderBackendResponse, Workflow } from '@digital-ai/plugin-dai-release-common';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { WorkflowCard } from './WorkflowCardComponent';
import { WorkflowCardSkeleton } from './Skeleton/WorkflowCardSkeletonComponent';
import { calculateCellProps } from '../../utils/helpers';
import isNil from 'lodash/isNil';
import { makeStyles } from '@material-ui/core';
import { useWorkflowRedirect } from '../../hooks/useWorkflowRedirect';

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
  searchInput: string;
  onSearchInput: (searchInput: string) => void;
  resetState: () => void;
};

const TreeSelectItem: React.FC<{ item: Folder; onItemSelect: (id: string) => void; selectedItemId: string | null }> = ({ item, onItemSelect, selectedItemId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
<div
  onClick={toggleDropdown}
  onKeyDown={(e) => { if (e.key === 'Enter') toggleDropdown(); }}
  role="button"
  tabIndex={0}
  style={{ fontWeight: item.id === selectedItemId ? 'bold' : 'normal' }}
>
  {item.title}
</div>
      {isOpen && item.children && item.children.length > 0 && (
        <ul>
          {item.children.map((child) => (
            <TreeSelectItem key={child.id} item={child} onItemSelect={onItemSelect} selectedItemId={selectedItemId} />
          ))}
        </ul>
      )}
    </div>
  );
};

export const WorkflowCatalogComponent = ({
  loading,
  loadMoreData,
  data,
  folders,
  instance,
  searchInput,
  onSearchInput,
  resetState
}: WorkflowCatalogComponentProps) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(undefined);
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

  const handleIntersect = useCallback<IntersectionObserverCallback>((entries) => {
    if (entries[0].isIntersecting && !loading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        loadMoreData(nextPage);
        return nextPage;
      });
    }
  }, [loading, loadMoreData]);

useEffect(() => {
  const observer = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  const currentObserverTarget = observerTarget.current;
  if (currentObserverTarget) {
    observer.observe(currentObserverTarget);
  }

  return () => {
    if (currentObserverTarget) {
      observer.unobserve(currentObserverTarget);
    }
  };
}, [loading, handleIntersect]);

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
  };

const renderDialog = () => {
  const workflow = data.find((w) => w.id === workflowDialogOpen);
  if (!workflow) return null;
  const folderList: Folder[] = folders.folders;

  const renderFolderTree = () => {
    return folderList.map((folder) => (
      <TreeSelectItem key={folder.id} item={folder} onItemSelect={setSelectedFolderId} selectedItemId={selectedFolderId || null} />
    ));
  };

    return (
      <DotDialog
        cancelButtonProps={{ label: 'Cancel' }}
        className="card-folder-dialog"
        closeIconVisible
        closeOnClickAway
        closeOnSubmit
        onSubmit={() => handleWorkflowRun(workflow)}
        open
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
          <ul className={classes.folderTree}>{renderFolderTree()}</ul>
        </div>
      </DotDialog>
    );
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreData(page); // Load the next page of data
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
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
        }}
        style={{ height: '40px' }}
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
          value={searchInput}
          onChange={(e) => handleSearchInput(e.target.value)}
        />
      </Paper>
      <br />
      <div
        className="search-row"
        style={{ height: 'calc(80vh - 100px)', overflowY: 'scroll' }}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {renderWorkflows()}
      </div>
      {renderDialog()}
      <div ref={observerTarget} />
    </div>
  );
};