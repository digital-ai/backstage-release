import { Config } from '@backstage/config';
import { Logger } from 'winston';
import { ReleaseOverviewApi } from '../api';
import Router from 'express-promise-router';
import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import { getBoolQueryVal, getEncodedQueryVal } from '../api/apiConfig';

export interface RouterOptions {
  config: Config;
  logger: Logger;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config } = options;

  const releaseOverviewApi = ReleaseOverviewApi.fromConfig(config, logger);

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/releases', async (req, res) => {
    const failing = getBoolQueryVal(req.query.failing?.toString());
    const planned = getBoolQueryVal(req.query.planned?.toString());
    const completed = getBoolQueryVal(req.query.completed?.toString());
    const paused = getBoolQueryVal(req.query.paused?.toString());
    const aborted = getBoolQueryVal(req.query.aborted?.toString());
    const inProgress = getBoolQueryVal(req.query.inProgress?.toString());
    const failed = getBoolQueryVal(req.query.failed?.toString());
    const title = getEncodedQueryVal(req.query.title?.toString());
    const beginDate = getEncodedQueryVal(req.query.beginDate?.toString());
    const endDate = getEncodedQueryVal(req.query.endDate?.toString());
    const orderBy = getEncodedQueryVal(req.query.orderBy?.toString());
    const orderDirection = getEncodedQueryVal(
      req.query.orderDirection?.toString(),
    );
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
      beginDate,
      endDate,
      orderBy,
      orderDirection.toUpperCase(),
      pageNumber,
      resultsPerPage,
    );
    res.status(200).json(releases);
  });

  router.use(errorHandler());
  return router;
}
