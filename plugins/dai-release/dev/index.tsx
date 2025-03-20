import { DaiTemplatePage } from '../src';
import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { daiReleasePlugin } from '../src';

createDevApp()
  .registerPlugin(daiReleasePlugin)
  .addPage({
    element: <DaiTemplatePage />,
    title: 'Root Page',
    path: '/dai-template',
  })
  .render();
