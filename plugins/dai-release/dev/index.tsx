import { DaiWorkFlowCatalog } from '../src/plugin';
import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { daiReleasePlugin } from '../src';

createDevApp()
  .registerPlugin(daiReleasePlugin)
  .addPage({
    element: <DaiWorkFlowCatalog />,
    title: 'Root Page',
    path: '/dai-release',
  })
  .render();
