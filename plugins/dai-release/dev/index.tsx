import { DaiWorkflowCatalog } from '../src';
import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { daiReleasePlugin } from '../src';

createDevApp()
  .registerPlugin(daiReleasePlugin)
  .addPage({
    element: <DaiWorkflowCatalog />,
    title: 'Root Page',
    path: '/dai-release',
  })
  .render();
