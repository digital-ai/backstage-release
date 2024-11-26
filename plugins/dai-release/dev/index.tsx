import { DaiReleasePage, daiReleasePlugin } from '../src';
import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { WorkflowComponent } from '../src/components/WorkflowComponent';

createDevApp()
  .registerPlugin(daiReleasePlugin)
  .addPage({
    element: <WorkflowComponent />,
    title: 'Root Page',
    path: '/dai-release',
  })
  .render();
