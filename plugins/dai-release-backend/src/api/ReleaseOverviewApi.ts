import {
    RELEASE_COUNT_API_PATH,
    RELEASE_OVERVIEW_API_PATH,
    getCredentials, getReleaseApiHost, getReleaseDetailsRedirectUri,
} from './apiConfig';
import {Release, ReleaseCountResults, ReleaseOverview} from "@digital-ai/plugin-dai-release-common";
import { Config } from '@backstage/config';
import { Logger } from 'winston';
import {
  ReleaseList,
} from '@digital-ai/plugin-dai-release-common';
import { parseErrorResponse } from './responseUtil';

export class ReleaseOverviewApi {
  private readonly logger: Logger;
  private readonly config: Config;

  private constructor(logger: Logger, config: Config) {
    this.logger = logger;
    this.config = config;
  }

  static fromConfig(config: Config, logger: Logger) {
    return new ReleaseOverviewApi(logger, config);
  }

  async getReleases(
    failing: string,
    planned: string,
    completed: string,
    paused: string,
    aborted: string,
    inProgress: string,
    failed: string,
    title: string,
    beginDate: string,
    endDate: string,
    orderBy: string,
    pageNumber: string,
    resultsPerPage: string,
  ): Promise<ReleaseList> {
    this.logger?.debug(
      `Calling Release Overview api, start from: ${beginDate} to: ${endDate}, in order of ${orderBy}`,
    );
    const authCredentials = getCredentials(this.config);
    const apiUrl = getReleaseApiHost(this.config);

    const requestBody =
      {
        failing: failing,
        planned: planned,
        completed: completed,
        paused: paused,
        aborted: aborted,
        inProgress: inProgress,
        failed: failed,
        title: title,
        tags: [],
        from: beginDate,
        to: endDate,
        orderBy: orderBy,
        orderDirection: 'DESC',
        onlyFlagged: false,
        onlyArchived: false,
        onlyMine: false,
      };
    const response = await fetch(
      `${apiUrl}${RELEASE_OVERVIEW_API_PATH}?page=${pageNumber}&resultsPerPage=${resultsPerPage}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authCredentials}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );
    if (!response.ok) {
      await parseErrorResponse(this.logger, response);
    }
    const data: ReleaseOverview[] = await response.json();

    const releases: Release[] = [];
    data.forEach(d =>
        releases.push({
          id: d.id,
          title: d.title,
          folder: "todofolder", // TODO
          status: d.status,
          startDate: d.startDate,
          endDate: d.startDate,
          releaseRedirectUri: getReleaseDetailsRedirectUri(this.config, d.id),
        }),
    );

    const countData: ReleaseCountResults = await this.getReleasesCount(apiUrl, authCredentials, requestBody);

    return {
      total: countData.all.total,
      releases: releases
    };
  }

    async getReleasesCount(apiUrl: string, authCredentials: string, requestBody: object): Promise<ReleaseCountResults> {
        const response = await fetch(
            `${apiUrl}${RELEASE_COUNT_API_PATH}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${authCredentials}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(requestBody),
            },
        );
        if (!response.ok) {
            await parseErrorResponse(this.logger, response);
        }
        return await response.json();
    }
}
