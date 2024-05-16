import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';
import { loggerToWinstonLogger } from '@backstage/backend-common';
import { ReleaseConfig } from './service/releaseInstanceConfig';

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
        permissions: coreServices.permissions,
      },
      async init({ config, logger, httpRouter, permissions }) {
        const instancesConfig = ReleaseConfig.fromConfig(config);
        httpRouter.use(
          await createRouter({
            config: instancesConfig,
            logger: loggerToWinstonLogger(logger),
            permissions,
          }),
        );
      },
    });
  },
});
