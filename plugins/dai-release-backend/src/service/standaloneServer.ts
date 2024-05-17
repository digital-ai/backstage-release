import {
  HostDiscovery,
  ServerTokenManager,
  createServiceBuilder,
  loadBackendConfig,
} from '@backstage/backend-common';
import { Logger } from 'winston';
import { ReleaseConfig } from './releaseInstanceConfig';
import { Server } from 'http';
import { ServerPermissionClient } from '@backstage/plugin-permission-node';
import { createRouter } from './router';

export interface ServerOptions {
  port: number;
  enableCors: boolean;
  logger: Logger;
}

export async function startStandaloneServer(
  options: ServerOptions,
): Promise<Server> {
  const logger = options.logger.child({ service: 'dai-release-backend' });
  const config = await loadBackendConfig({ logger, argv: process.argv });
  const tokenManager = ServerTokenManager.fromConfig(config, {
    logger,
  });
  const discovery = HostDiscovery.fromConfig(config);
  const permissions = ServerPermissionClient.fromConfig(config, {
    discovery,
    tokenManager,
  });

  logger.debug('Starting application server...');
  const router = await createRouter({
    config: ReleaseConfig.fromConfig(config),
    logger,
    permissions,
  });

  let service = createServiceBuilder(module)
    .setPort(options.port)
    .addRouter('/dai-release', router);
  if (options.enableCors) {
    service = service.enableCors({ origin: 'http://localhost:3000' });
  }

  return await service.start().catch(err => {
    logger.error(err);
    process.exit(1);
  });
}

module.hot?.accept();
