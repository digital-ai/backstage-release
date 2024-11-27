import {
  HttpAuthService,
  LoggerService,
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
import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import { ReleaseConfig } from './releaseInstanceConfig';
import { ReleaseOverviewApi } from '../api';
import Router from 'express-promise-router';
import { TemplatesOverviewApi } from '../api/TemplatesOverviewApi';
import { WorkflowsOverviewApi } from '../api/WorkflowsOverviewApi';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import express from 'express';
import { validateInstanceRes } from '../api/responseUtil';

export interface RouterOptions {
  config: Config;
  logger: LoggerService;
  permissions?: PermissionsService;
  httpAuth?: HttpAuthService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config, permissions, httpAuth } = options;

  const releaseOverviewApi = ReleaseOverviewApi.fromConfig(
    ReleaseConfig.fromConfig(config),
    logger,
  );
  const templatesOverviewApi = TemplatesOverviewApi.fromConfig(
    ReleaseConfig.fromConfig(config),
    logger,
  );
  const workflowsOverviewApi = WorkflowsOverviewApi.fromConfig(
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
    if (permissions && httpAuth) {
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

  router.get('/templates', async (req, res) => {
    if (permissions && httpAuth) {
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

    const title = getDecodedQueryVal(req.query.title?.toString());
    const tags: string[] = req.query.tag
      ? req.query.tag
          .toString()
          .split(',')
          .map(tag => getDecodedQueryVal(tag))
      : [];
    const pageNumber = getEncodedQueryVal(req.query.pageNumber?.toString());
    const resultsPerPage = getEncodedQueryVal(
      req.query.resultsPerPage?.toString(),
    );
    const instanceName = req.query.instanceName?.toString() || '';
    const templates = await releaseOverviewApi.getTemplates(
      title,
      tags,
      pageNumber,
      resultsPerPage,
      instanceName,
    );
    res.status(200).json(templates);
  });

  router.get('/instances', async (req, res) => {
    if (permissions && httpAuth) {
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

  router.get('/template/meta', async (req, res) => {
    if (permissions && httpAuth) {
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
    const instanceName = req.query.instanceName?.toString() || '';
    const folderId = getDecodedQueryVal(req.query.folderId?.toString() || '');
    const metaInformation = await templatesOverviewApi.getTemplateMetaInfo(
      instanceName,
      folderId,
    );
    res.status(200).json(metaInformation);
  });

  router.post('/workflows', async (req, res) => {
    if (permissions && httpAuth) {
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
    const instanceName = req.query.instanceName?.toString() || '';
    const pageNumber = getEncodedQueryVal(req.query.pageNumber?.toString());
    const resultsPerPage = getEncodedQueryVal(
      req.query.resultsPerPage?.toString(),
    );
    const searchInput = req.query.searchInput?.toString() || '';
    const categories: string[] = req.query.categories
      ? req.query.categories.toString().split(',')
      : [];
    const author = req.query.author?.toString() || '';
    const workflows = await workflowsOverviewApi.getWorkflowsOverviewApi(
      instanceName,
      pageNumber,
      resultsPerPage,
      searchInput,
      categories,
      author,
    );
    res.status(200).json(workflows);
  });

  router.post('/workflow/redirect', async (req, res) => {
    if (permissions && httpAuth) {
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
    const instanceName = req.query.instanceName?.toString() || '';
    const { templateId, releaseTitle } = req.body;
    const redirectUrl = await workflowsOverviewApi.redirectToWorkflowRunPage(
      instanceName,
      templateId,
      releaseTitle,
    );
    res.status(200).json({ url: redirectUrl });
  });

  router.get('/workflow/folders', async (req, res) => {
    if (permissions && httpAuth) {
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
    const instanceName = req.query.instanceName?.toString() || '';
    const pageNumber = getEncodedQueryVal(req.query.pageNumber?.toString());
    const resultsPerPage = getEncodedQueryVal(
      req.query.resultsPerPage?.toString(),
    );
    const folderList = await workflowsOverviewApi.getWorkflowsFolderListApi(
      instanceName,
      pageNumber,
      resultsPerPage,
    );
    res.status(200).json(folderList);
  });


  const middleware = MiddlewareFactory.create({ logger, config });
  router.use(middleware.error());
  return router;
}
