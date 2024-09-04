import {
  HttpAuthService, LoggerService,
  PermissionsService,
} from '@backstage/backend-plugin-api';
import { InputError, NotAllowedError } from '@backstage/errors';
import {
  daiReleasePermissions,
  daiReleaseViewPermission,
} from '@digital-ai/plugin-dai-release-common';
import { getDecodedQueryVal, getEncodedQueryVal } from '../api/apiConfig';
import { AuthorizeResult } from '@backstage/plugin-permission-common';
import { Config } from '@backstage/config';
import { ReleaseConfig } from './releaseInstanceConfig';
import { ReleaseOverviewApi } from '../api';
import Router from 'express-promise-router';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import { validateInstanceRes } from '../api/responseUtil';

export interface RouterOptions {
  config: Config;
  logger: LoggerService;
  httpAuth: HttpAuthService;
  permissions?: PermissionsService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config, httpAuth, permissions } = options;

  const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
    ReleaseConfig.fromConfig(config),
    logger,
  );
  if (config.subscribe) {
    //  check for live yaml config change
    config.subscribe(() => {
      ReleaseConfig.fromConfig(config);
    });
  }
  const permissionIntegrationRouter = createPermissionIntegrationRouter({
    permissions: daiReleasePermissions,
  });

  const router = Router();
  router.use(express.json());
  router.use(permissionIntegrationRouter);

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/releases', async (req, res) => {
    if (permissions) {
      const decision = await permissions.authorize(
        [{ permission: daiReleaseViewPermission }],
        { credentials: await httpAuth.credentials(req) },
      );
      const { result } = decision[0];
      if (result === AuthorizeResult.DENY) {
        throw new NotAllowedError(
          'Access Denied: Unauthorized to access the Backstage Release plugin',
        );
      }
    }

    const failing = getEncodedQueryVal(req.query.failing?.toString());
    const planned = getEncodedQueryVal(req.query.planned?.toString());
    const completed = getEncodedQueryVal(req.query.completed?.toString());
    const paused = getEncodedQueryVal(req.query.paused?.toString());
    const aborted = getEncodedQueryVal(req.query.aborted?.toString());
    const inProgress = getEncodedQueryVal(req.query.inProgress?.toString());
    const failed = getEncodedQueryVal(req.query.failed?.toString());
    const title = getDecodedQueryVal(req.query.title?.toString());
    const fromDate = getEncodedQueryVal(req.query.fromDate?.toString());
    const toDate = getEncodedQueryVal(req.query.toDate?.toString());
    const orderBy = getEncodedQueryVal(req.query.orderBy?.toString());
    const pageNumber = getEncodedQueryVal(req.query.pageNumber?.toString());
    const resultsPerPage = getEncodedQueryVal(
      req.query.resultsPerPage?.toString(),
    );
    const instanceName = req.query.instanceName?.toString() || '';
    const releases = await releaseOverviewApi.getReleases(
      failing,
      planned,
      completed,
      paused,
      aborted,
      inProgress,
      failed,
      title,
      fromDate,
      toDate,
      orderBy,
      pageNumber,
      resultsPerPage,
      instanceName,
    );
    res.status(200).json(releases);
  });

  router.get('/instances', async (req, res) => {
    if (permissions) {
      const decision = await permissions.authorize(
        [{ permission: daiReleaseViewPermission }],
        { credentials: await httpAuth.credentials(req) },
      );
      const { result } = decision[0];
      if (result === AuthorizeResult.DENY) {
        throw new NotAllowedError(
          'Access Denied: Unauthorized to access the Backstage Release plugin',
        );
      }
    }
    const instancesList = await releaseOverviewApi.getReleaseInstances();
    if (!validateInstanceRes(instancesList)) {
      throw new InputError(
        'Invalid or Missing DaiRelease instance configuration',
      );
    }
    res.status(200).json(instancesList);
  });

  router.use(errorHandler());
  return router;
}
