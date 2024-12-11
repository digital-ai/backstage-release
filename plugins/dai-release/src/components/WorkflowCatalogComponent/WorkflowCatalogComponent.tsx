import {
  CssCell,
  CssGrid,
  DotAlertBanner,
  DotDialog,
  DotIconButton,
  DotTypography
} from '@digital-ai/dot-components';
import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { WorkflowCardSkeleton } from './Skeleton/WorkflowCardSkeletonComponent';
import { Folder, FolderBackendResponse, Workflow } from "@digital-ai/plugin-dai-release-common";
import { WorkflowCard } from './WorkflowCardComponent';
import { calculateCellProps } from '../../utils/helpers';
import { makeStyles } from '@material-ui/core';
import { Autocomplete, TextField } from '@mui/material';
import { useWorkflowRedirect } from '../../hooks/useWorkflowRedirect';
import isNil from 'lodash/isNil';

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
  customAutocomplete: {
    zIndex: 3000,
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
  instance
}: WorkflowCatalogComponentProps) => {
  const classes = useStyles();
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const [url, setUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showErrorDetails, setShowErrorDetails] = useState<boolean>(false);
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
    setUrl,
    setErrorMessage
  );

  const handleOnRunClick = (workflowFromCategory: Workflow) => {
    setWorkflowDialogOpen(workflowFromCategory.id);
  };

  const handleRunWorkflow = () => {
    if (!workflowDialogOpen) return;
    const selectedWorkflow = data.find((w) => w.id === workflowDialogOpen);
    if (!selectedWorkflow) return;

    setWorkflowParams({
      templateId: workflowDialogOpen,
      title: selectedWorkflow.title,
      folderId: selectedFolderId || '',
    });
  };

  useEffect(() => {
    if (url) {
      window.open(url, '_blank');
    }
  }, [url]);

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

  const handleNodeSelect = (_: any, value: any) => {
    setSelectedFolderId(value ? value.key : null);
  };

  const handleShowDetails = () => {
    setShowErrorDetails(!showErrorDetails);
  };

  const renderError = (message: string) => {
    return (
      <DotAlertBanner action={<DotIconButton iconId={showErrorDetails ? 'arrow-up' : 'arrow-down'} onClick={handleShowDetails} />} severity="error">
        <DotTypography>{message}</DotTypography>
      </DotAlertBanner>
    );
  };

  const renderDialog = () => {
    const workflow = data.find((w) => w.id === workflowDialogOpen);
    if (!workflow) return null;

    const renderFolderTree = () => {
      const folderList: Folder[] = folders.folders;
      const convertToTreeNodes = (folders: Folder[]): any[] => {
        return folders.map(folder => ({
          key: folder.id,
          title: folder.title,
          children: folder.children ? convertToTreeNodes(folder.children) : []
        }));
      };
      return convertToTreeNodes(folderList);
    };

    const options = renderFolderTree().flatMap(folder => [
      folder,
      ...folder.children.map((child: Folder) => ({ ...child, title: `-- ${child.title}` })),
    ]);

    return (
      <DotDialog
        cancelButtonProps={{ label: 'Cancel' }}
        className="card-folder-dialog"
        closeIconVisible
        closeOnClickAway
        closeOnSubmit
        onSubmit={handleRunWorkflow}
        open
        submitButtonProps={{ label: 'Run workflow', disabled: isNil(selectedFolderId) || !!errorMessage}}
        title="Choose folder"
      >
        {errorMessage && renderError(errorMessage)}
        <DotTypography>
          Select the folder where workflow <strong>{workflow.title}</strong> will be run.
        </DotTypography>
        <DotTypography className="persistent-label" variant="subtitle2">
          Folder name
        </DotTypography>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <Autocomplete
            value={options.find(option => option.key === selectedFolderId) || null}
            onChange={handleNodeSelect}
            options={options}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} />}
            className={classes.customAutocomplete}
          />
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