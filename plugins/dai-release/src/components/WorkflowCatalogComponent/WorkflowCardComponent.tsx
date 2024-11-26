import {
  DotAvatar,
  DotButton,
  DotCard,
  DotCardContent,
  DotCardFooter,
  DotCardHeader,
  DotChip,
  DotIcon,
  DotLink,
  DotTypography,
} from '@digital-ai/dot-components';
import { ChipGroup } from '../ChipGroup/ChipGroupComponent';
import React from 'react';
import { Workflow } from '@digital-ai/plugin-dai-release-common';
import { makeStyles } from '@material-ui/core';

interface WorkflowCardProps {
  onClick: (id: string) => void;
  workflow: Workflow;
}

const useStyles = makeStyles(() => ({
  workflowCard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'left',
    '& .dot-card-content': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& .dot-card-bottom-spacing': {
      padding: '0 0 16px 0',
      '& .markdown-viewer, & .markdown-wrapper': {
        padding: 0,
      },
    },
    '& .dot-card-top-bottom-spacing': {
      padding: '16px 0',
    },
    '& .folder-chip-section': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    '& .categories-chip-section': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap',
    },
    '& .run-workflow-btn': {
      margin: 0,
      backgroundColor: 'rgb(255, 255, 255) !important',
      borderColor: 'rgb(164, 172, 182) !important',
      width: '97%',
      marginTop: '30px',
    },
    '& .dot-card-header-title': {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      whiteSpace: 'normal',
      overflowWrap: 'break-word',
    },
  },
}));
export const WorkflowCard = ({ workflow, onClick }: WorkflowCardProps) => {
  const { id, title, author, folderTitle, logoLink, git } = workflow;
  const classes = useStyles();

  const handleOnOpen = () => {
    onClick(id);
  };

  const cardLogo = logoLink ? (
    <DotAvatar alt={title} imageSrc={logoLink} type="image" />
  ) : (
    <DotAvatar alt={title} iconId="workflow" type="icon" />
  );

  const renderCommitLink = () => {
    if (!git.commitId) return '';

    const commitHash = git.commitId;
    const gitLink = git.repoLink ? git.repoLink : undefined;

    return (
      <div className="dot-card-bottom-spacing">
        <DotTypography variant="body1">
          <strong>Git version: </strong>
          {gitLink ? (
            <DotLink href={gitLink} target="_blank">
              {commitHash}
            </DotLink>
          ) : (
            <>{commitHash}</>
          )}
        </DotTypography>
      </div>
    );
  };

  return (
    <DotCard className={classes.workflowCard}>
      <div>
        <DotCardHeader
          avatar={cardLogo}
          subheader={author ? `by ${author}` : undefined}
          subheaderSize="large"
          title={title}
          titleSize="medium"
        />
        <DotCardContent>
          <div className="dot-card-bottom-spacing">
            <DotTypography variant="body1">
              {workflow.description}
            </DotTypography>
          </div>
        </DotCardContent>
      </div>

      <DotCardFooter>
        <div className="dot-card-top-bottom-spacing folder-chip-section">
          <DotTypography variant="subtitle2">Folder:</DotTypography>
          <DotChip
            data-testid="folder-chip"
            size="small"
            startIcon={<DotIcon iconId="folder" />}
            children={folderTitle}
            charactersLimit={16}
          />
        </div>
        {renderCommitLink()}
        <div className="categories-chip-section">
          <ChipGroup labels={workflow.categories} />
        </div>
        <DotButton
          className="run-workflow-btn"
          onClick={handleOnOpen}
          type="outlined"
        >
          Run workflow
        </DotButton>
      </DotCardFooter>
    </DotCard>
  );
};
