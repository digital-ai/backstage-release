import { DaiReleaseApiClient, daiReleaseApiRef } from './api';
import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import { daiReleaseContentRouteRef } from './routes';

export const daiReleasePlugin = createPlugin({
  id: 'dai-release',
  apis: [
    createApiFactory({
      api: daiReleaseApiRef,
      deps: { discoveryApi: discoveryApiRef, identityApi: identityApiRef },
      factory: ({ discoveryApi, identityApi }) =>
        new DaiReleaseApiClient({ discoveryApi, identityApi }),
    }),
  ],
});

export const DaiReleasePage = daiReleasePlugin.provide(
  createRoutableExtension({
    name: 'DaiReleasePage',
    component: () =>
      import('./components/HomePageComponent').then(m => m.HomePageComponent),
    mountPoint: daiReleaseContentRouteRef,
  }),
);

export const DaiTemplatePage = daiReleasePlugin.provide(
  createRoutableExtension({
    name: 'DaiTemplatePage',
    component: () =>
      import('./components/TemplateHomePageComponent/').then(
        m => m.TemplateHomePageComponent,
      ),
    mountPoint: daiReleaseContentRouteRef,
  }),
);

export const DaiWorkflowCatalog = daiReleasePlugin.provide(
  createRoutableExtension({
    name: 'DaiWorkflowCatalog',
    component: () =>
      import('./components/WorkflowComponent/').then(m => m.WorkflowComponent),
    mountPoint: daiReleaseContentRouteRef,
  }),
);
