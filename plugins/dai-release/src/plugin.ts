import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const daiReleasePlugin = createPlugin({
  id: 'dai-release',
  routes: {
    root: rootRouteRef,
  },
});

export const DaiReleasePage = daiReleasePlugin.provide(
  createRoutableExtension({
    name: 'DaiReleasePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
