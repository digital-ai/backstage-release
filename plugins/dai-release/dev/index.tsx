import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { daiReleasePlugin, DaiReleasePage } from '../src/plugin';

createDevApp()
  .registerPlugin(daiReleasePlugin)
  .addPage({
    element: <DaiReleasePage />,
    title: 'Root Page',
    path: '/dai-release'
  })
  .render();
