import {
  HostDiscovery,
  ServerTokenManager,
  createServiceBuilder,
  loadBackendConfig,
} from '@backstage/backend-common';
import { LoggerService, coreServices } from '@backstage/backend-plugin-api';
import { Server } from 'http';
import { ServerPermissionClient } from '@backstage/plugin-permission-node';
import { createRouter } from './router';

export interface ServerOptions {
  port: number;
  enableCors: boolean;
  logger: LoggerService;
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
  const httpAuth = coreServices.httpAuth.T;

  logger.debug('Starting application server...');
  const router = await createRouter({
    config: config,
    logger,
    httpAuth,
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
