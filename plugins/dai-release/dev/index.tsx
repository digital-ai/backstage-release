import { DaiReleasePage, daiReleasePlugin } from '../src';
import React from 'react';
import { createDevApp } from '@backstage/dev-utils';

createDevApp()
  .registerPlugin(daiReleasePlugin)
  .addPage({
    element: <DaiReleasePage />,
    title: 'Root Page',
    path: '/dai-release',
  })
  .render();
