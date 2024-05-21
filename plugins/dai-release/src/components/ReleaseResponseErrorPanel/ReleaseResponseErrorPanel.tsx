import React from 'react';
import {Content, Header, Page, WarningPanel} from '@backstage/core-components';
import releaseLogoWhite from "../../assets/releaseLogoWhite.png";
import { makeStyles, Paper} from "@material-ui/core";

type ReleaseErrorPanelProps = {
  error: Error;
};
const useStyles = makeStyles(() => ({
  logoStyle: {
    width: '300px',
  },
}));
export function ReleaseResponseErrorPanel(props: ReleaseErrorPanelProps) {
  const { error } = props;
  const classes = useStyles();
  return <Page themeId="home">
    <Header
        title={
          <img
              src={releaseLogoWhite}
              alt="Release logo"
              className={classes.logoStyle}
          />
        }
        pageTitleOverride="Digital.ai Release"
    />
    <Content>
    <Paper elevation={1}>
      <WarningPanel title={error.message} />
    </Paper>
    </Content>
  </Page>

}
