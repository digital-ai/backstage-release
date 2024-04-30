import {
  AuthorizeResult,
  PermissionEvaluator,
} from '@backstage/plugin-permission-common';
import {
  daiReleasePermissions,
  daiReleaseViewPermission,
} from '@digital-ai/plugin-dai-release-common';
import { Config } from '@backstage/config';
import { Logger } from 'winston';
import { NotAllowedError } from '@backstage/errors';
import { ReleaseOverviewApi } from '../api';
import Router from 'express-promise-router';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import { getBearerTokenFromAuthorizationHeader } from '@backstage/plugin-auth-node';
import { getEncodedQueryVal } from '../api/apiConfig';

export interface RouterOptions {
  config: Config;
  logger: Logger;
  permissions?: PermissionEvaluator;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config, permissions } = options;

  const releaseOverviewApi = ReleaseOverviewApi.fromConfig(config, logger);

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
    const token = getBearerTokenFromAuthorizationHeader(
      req.header('authorization'),
    );

    if (permissions) {
      const decision = await permissions.authorize(
        [{ permission: daiReleaseViewPermission, resourceRef: req.body.id }],
        { token },
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
    const title = getEncodedQueryVal(req.query.title?.toString());
    const fromDate = getEncodedQueryVal(req.query.fromDate?.toString());
    const toDate = getEncodedQueryVal(req.query.toDate?.toString());
    const orderBy = getEncodedQueryVal(req.query.orderBy?.toString());
    const pageNumber = getEncodedQueryVal(req.query.pageNumber?.toString());
    const resultsPerPage = getEncodedQueryVal(
      req.query.resultsPerPage?.toString(),
    );
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
    );
    res.status(200).json(releases);
  });

  router.use(errorHandler());
  return router;
}
