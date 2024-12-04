import {
  DotAvatar,
  DotButton,
  DotCard,
  DotCardHeader,
  DotSkeleton,
} from '@digital-ai/dot-components';
import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core';

export const WorkflowCardSkeleton = () => {
  const useStyles = makeStyles(() => ({
    workflowHeaderSec: {
      flexWrap: 'nowrap',
    },
    workflowCardSkeletonWrapper: {
      width: '100%',
      padding: '0 16px',
    },
    workflowCardSkeletonHeader: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    avatarSkeleton: {
      margin: '0 16px 0 0',
    },
    headerRight: {
      width: '100%',
    },
    cardContentLineSkeleton: {
      width: '100%',
      height: '10px',
      margin: '6px 0',
    },
    pillSkeleton: {
      height: '30px',
      width: '120px',
      margin: '16px 0',
    },
    cardFooter: {
      margin: '16px 0',
    },
  }));
  const classes = useStyles();
  const renderCardContentLineSkeletons = (
    numberOfSkeletons: number,
  ): ReactNode[] => {
    return [...Array(numberOfSkeletons)].map((_, index: number) => (
      <DotSkeleton
        className={classes.cardContentLineSkeleton}
        key={index}
        variant="rectangular"
      />
    ));
  };

  return (
    <DotCard className={classes.workflowCardSkeletonWrapper}>
      <div className="card-content">
        <div className={classes.workflowCardSkeletonHeader}>
          <div>
            <DotSkeleton className={classes.avatarSkeleton} variant="circular">
              <DotAvatar alt="" text="" type="text" />
            </DotSkeleton>
          </div>
          <div className={classes.headerRight}>
            <DotSkeleton data-testid="title-skeleton" width="100%">
              <DotCardHeader
                avatar={<DotAvatar alt="" text="" type="text" />}
                subheader=""
                subheaderSize="large"
                title=""
                titleSize="large"
              />
            </DotSkeleton>
          </div>
        </div>
        <div>{renderCardContentLineSkeletons(20)}</div>
        <DotSkeleton className={classes.pillSkeleton} variant="rectangular" />
      </div>

      <div className={classes.cardFooter}>
        <DotSkeleton data-testid="footer-button-skeleton" variant="rectangular">
          <DotButton type="outlined">Run workflow</DotButton>
        </DotSkeleton>
      </div>
    </DotCard>
  );
};
