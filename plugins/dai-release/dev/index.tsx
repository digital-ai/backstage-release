import {
  DaiReleasePage,
  daiReleasePlugin,
  DaiTemplatePage,
} from '../src/plugin';
import React from 'react';
import { createDevApp } from '@backstage/dev-utils';

createDevApp()
  .registerPlugin(daiReleasePlugin)
  .addPage({
    element: <DaiTemplatePage />,
    title: 'Root Page',
    path: '/dai-release',
  })
  .render();
