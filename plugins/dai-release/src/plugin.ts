import { DaiReleaseApiClient, daiReleaseApiRef } from './api';
import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import { daiReleaseContentRouteRef } from './routes';

export const daiReleasePlugin = createPlugin({
  id: 'dai-release',
  apis: [
    createApiFactory({
      api: daiReleaseApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new DaiReleaseApiClient({ discoveryApi }),
    }),
  ],
});

export const DaiReleasePage = daiReleasePlugin.provide(
  createRoutableExtension({
    name: 'DaiReleasePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: daiReleaseContentRouteRef,
  }),
);
