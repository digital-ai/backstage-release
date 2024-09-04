import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

/**
 * Digital.ai Release backend plugin
 *
 * @public
 */
export const daiReleasePlugin = createBackendPlugin({
  pluginId: 'dai-release',
  register(env) {
    env.registerInit({
      deps: {
        config: coreServices.rootConfig,
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
        httpAuth: coreServices.httpAuth,
        permissions: coreServices.permissions,
      },
      async init({ config, logger, httpRouter, httpAuth, permissions }) {
        httpRouter.use(
          await createRouter({
            config: config,
            logger: logger,
            httpAuth,
            permissions,
          }),
        );
      },
    });
  },
});
