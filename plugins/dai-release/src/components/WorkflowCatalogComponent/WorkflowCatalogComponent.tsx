import {
  CssCell,
  CssGrid,
  DotAlertBanner,
  DotDialog,
  DotInputText,
  DotTypography,
} from '@digital-ai/dot-components';
import {
  Folder,
  FolderBackendResponse,
  Workflow,
} from '@digital-ai/plugin-dai-release-common';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { useEffect, useRef, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import IconButton from '@mui/material/IconButton';
import React from 'react';
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
    paddingBottom: '24px', // .spacing(padding-bottom, 3);
  },
  workflowCards: {
    flex: 1,
    overflowY: 'auto',
  },
  catalogGrid: {
    marginTop: '24px',
  },
  customDialogWidth: {
    '& .MuiDialogContent-root': {
      overflowY: 'hidden', // Ensure the dialog does not have a scroll bar
    },
    '& .dot-dialog-content': {
      width: '600px',
      maxHeight: '264px',
      overflowY: 'hidden',
    },
  },
  dotDialogTitle: {
    '& h2': {
      flexGrow: 1,
      fontSize: '20px',
      fontFamily: 'Lato, sans-serif', // Set your desired font size
      marginBottom: '0px',
    },
  },
  dotTypography: {
    '& .MuiTypography-body1': {
      fontSize: '14px',
      fontFamily: 'Lato, sans-serif',
    },
    '& .MuiTypography-subtitle2': {
      fontSize: '14px',
      fontWeight: '700',
      fontFamily: 'Lato, sans-serif',
    },
  },
  dotButton: {
    '& .MuiButtonBase-root': {
      fontSize: '14px',
      fontFamily: 'Lato, sans-serif',
    },
    '& .MuiButton-root': {
      textTransform: 'none',
    },
  },
  noWorkflow: {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderContainer: {
    maxHeight: '200px', // Adjust the height as needed
  },
}));

type WorkflowCatalogComponentProps = {
  loading: boolean;
  loadMoreData: () => void;
  data: Workflow[];
  searchInput: string;
  onSearchInput: (searchInput: string) => void;
  resetState: () => void;
  folders: FolderBackendResponse;
  instance: string;
};

export const WorkflowCatalogComponent = ({
  loading,
  loadMoreData,
  data,
  searchInput,
  onSearchInput,
  resetState,
  folders,
  instance,
}: WorkflowCatalogComponentProps) => {
  const classes = useStyles();
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState<string | null>(
    null,
  );
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(
    undefined,
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [workflowParams, setWorkflowParams] = useState<{
    templateId: string;
    title: string;
    folderId: string;
  } | null>(null);

  useWorkflowRedirect(
    instance,
    workflowParams?.templateId || '',
    workflowParams?.title || '',
    workflowParams?.folderId || '',
    setRedirectUrl,
    setErrorMessage,
  );

  const handleOnRunClick = (workflowFromCategory: Workflow) => {
    setWorkflowDialogOpen(workflowFromCategory.id);
  };

  const handleRunWorkflow = () => {
    if (!workflowDialogOpen) return;
    const selectedWorkflow = data.find(w => w.id === workflowDialogOpen);
    if (!selectedWorkflow) return;

    setWorkflowParams({
      templateId: workflowDialogOpen,
      title: selectedWorkflow.title,
      folderId: selectedFolderId || '',
    });
    setShouldRedirect(true);
  };

  useEffect(() => {
    if (redirectUrl && shouldRedirect) {
      window.open(redirectUrl, '_blank');
      setShouldRedirect(false);
    }
  }, [redirectUrl, shouldRedirect]);

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

  const handleOnCancel = () => {
    setWorkflowDialogOpen(null);
    setSelectedFolderId(undefined);
    setErrorMessage(null);
  };

  const renderTree = (nodes: any) => (
    <TreeItem
      key={nodes.key}
      nodeId={nodes.key}
      label={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FolderOpenIcon style={{ marginRight: '8px' }} />
          {nodes.title}
        </div>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node: any) => renderTree(node))
        : null}
    </TreeItem>
  );

  const renderDialog = () => {
    const workflow = data.find(w => w.id === workflowDialogOpen);
    if (!workflow) return null;
    const renderError = (message: string) => {
      return (
        <>
          <DotAlertBanner severity="error" className="dot-alert-banner">
            <DotTypography>{message}</DotTypography>
          </DotAlertBanner>
          <br />
        </>
      );
    };

    const renderFolderTree = () => {
      const folderList: Folder[] = folders.folders;

      const convertToTreeNodes = (folderArray: Folder[]): any[] => {
        return folderArray.map(folder => ({
          key: folder.id,
          title: folder.title,
          children: folder.children ? convertToTreeNodes(folder.children) : [],
        }));
      };
      const limitedFolders = folderList.slice(0, 5); // Limit to 5 folders
      return convertToTreeNodes(limitedFolders);
    };

    const options = renderFolderTree();

    return (
      <DotDialog
        cancelButtonProps={{ label: 'Cancel' }}
        className={`card-folder-dialog ${classes.customDialogWidth} ${classes.dotDialogTitle} ${classes.dotTypography} ${classes.dotButton}`}
        closeIconVisible
        closeOnClickAway
        closeOnSubmit={!!errorMessage}
        onSubmit={handleRunWorkflow}
        open
        onCancel={handleOnCancel}
        submitButtonProps={{
          label: 'Run workflow',
          disabled: isNil(selectedFolderId) || !!errorMessage,
        }}
        title="Choose folder"
      >
        {errorMessage && renderError(errorMessage)}

        <DotTypography>
          Select the folder where workflow <strong>{workflow.title}</strong>{' '}
          will be run.
        </DotTypography>
        <br />
        <DotTypography className="persistent-label" variant="subtitle2">
          Folder name
        </DotTypography>
        <div className={classes.folderContainer}>
          <TreeView
            sx={{
              '& .MuiTreeItem-root': {
                marginBottom: '8px', // Space between TreeItems
              },
              '& .MuiTreeItem-content': {
                padding: '4px 8px', // Space around the TreeItem content
              },
              '& .MuiTreeItem-label': {
                fontSize: '12px', // Customize label size
              },
            }}
            defaultCollapseIcon={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowDropDownIcon />
              </div>
            }
            defaultExpandIcon={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowRightIcon />
              </div>
            }
            selected={
              selectedFolderId || `Applications/${workflow.defaultTargetFolder}`
            }
            onNodeSelect={(_: unknown, nodeId: string) =>
              setSelectedFolderId(nodeId)
            }
          >
            {options.map(option => renderTree(option))}
          </TreeView>
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
      {renderDialog()}
      <div ref={observerTarget} />
    </div>
  );
};
