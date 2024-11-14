import { daiReleasePlugin } from '../src';
import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import {DaiWorkFlowCatalog} from "../src/plugin";

createDevApp()
  .registerPlugin(daiReleasePlugin)
  .addPage({
    element: <DaiWorkFlowCatalog />,
    title: 'Root Page',
    path: '/dai-release',
  })
  .render();
