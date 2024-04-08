import React from 'react';
import { WarningPanel } from '@backstage/core-components';

type ReleaseErrorPanelProps = {
  error: Error;
};
export function ReleaseResponseErrorPanel(props: ReleaseErrorPanelProps) {
  const { error } = props;
  return <WarningPanel title={error.message} />;
}
