import {
    createFrontendPlugin,
    createRouteRef,
    NavItemBlueprint,
    PageBlueprint,
    ApiBlueprint,
} from '@backstage/frontend-plugin-api';
import VisualizerIcon from '@material-ui/icons/Visibility';
import React from 'react';
import {DaiReleaseApiClient, daiReleaseApiRef} from "./api";
import {discoveryApiRef, identityApiRef, createApiFactory} from "@backstage/core-plugin-api";

const rootRouteRef = createRouteRef();

const daiReleaseApi = ApiBlueprint.make({
    name: 'release',
    params: {
        factory: createApiFactory({
            api: daiReleaseApiRef,
            deps: {
                discoveryApi: discoveryApiRef,
                identityApi: identityApiRef,
            },
            factory: ({ identityApi, discoveryApi }) =>
                new DaiReleaseApiClient({
                    discoveryApi,
                    identityApi,
                }),
        }),
    },
});


/**
 * Responsible for rendering the provided router element
 *
 * @alpha
 */
const daiReleasePage = PageBlueprint.make({
    params: {
        defaultPath: '/dai-release',
        routeRef: rootRouteRef,
        loader: () =>
            import('./components/HomePageComponent').then(m => (
                <m.HomePageComponent />
            )),
    },
});

export const daiReleaseNavItem = NavItemBlueprint.make({
    params: {
        title: 'DAI Release',
        icon: VisualizerIcon,
        routeRef: rootRouteRef,
    },
});

/** @public */
export const daiReleasePlugin = createFrontendPlugin({
    id: 'dai-release',
    extensions: [daiReleasePage, daiReleaseNavItem, daiReleaseApi],
});