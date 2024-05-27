import { Content, Page, WarningPanel } from '@backstage/core-components';
import { Paper } from '@material-ui/core';
import React from 'react';

type ReleaseErrorPanelProps = {
  error: Error;
};
export function ReleaseResponseErrorPanel(props: ReleaseErrorPanelProps) {
  const { error } = props;
  return (
    <Page themeId="home">
      <Content noPadding>
        <Paper elevation={1}>
          <WarningPanel severity="error" title={error.message} />
        </Paper>
      </Content>
    </Page>
  );
}
