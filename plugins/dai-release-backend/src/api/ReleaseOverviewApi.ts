import {
  RELEASE_COUNT_API_PATH,
  RELEASE_FOLDERS_LIST_API_PATH,
  RELEASE_OVERVIEW_API_PATH,
  getCredentials,
  getReleaseApiHost,
  getReleaseDetailsRedirectUri,
} from './apiConfig';
import {
  Release,
  ReleaseCountResults,
  ReleaseOverview,
} from '@digital-ai/plugin-dai-release-common';
import { Config } from '@backstage/config';
import { Folder } from '@digital-ai/plugin-dai-release-common';
import { Logger } from 'winston';
import { ReleaseList } from '@digital-ai/plugin-dai-release-common';
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
    orderDirection: string,
    pageNumber: string,
    resultsPerPage: string,
  ): Promise<ReleaseList> {
    this.logger?.debug(
      `Calling Release Overview api, start from: ${beginDate} to: ${endDate}, in order of ${orderBy}`,
    );
    const accessToken = getCredentials(this.config);
    const apiUrl = getReleaseApiHost(this.config);

    const requestBody = {
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
      orderDirection: orderDirection,
      onlyFlagged: false,
      onlyArchived: false,
      onlyMine: false,
    };

    const data: ReleaseOverview[] = await this.getReleasesList(
      apiUrl,
      accessToken,
      requestBody,
      pageNumber,
      resultsPerPage,
    );

    const folderIdTitleMap: Map<string, string> =
      await this.getFolderIdAndTitleMap(apiUrl, accessToken);

    const releases: Release[] = [];
    data.forEach(d =>
      releases.push({
        id: d.id,
        title: d.title,
        folder: this.getFolderTitle(folderIdTitleMap, d.id),
        status: d.status,
        startDate: d.startDate,
        endDate: d.endDate,
        releaseRedirectUri: getReleaseDetailsRedirectUri(this.config, d.id),
      }),
    );

    const countData: ReleaseCountResults = await this.getReleasesCount(
      apiUrl,
      accessToken,
      requestBody,
    );

    return {
      total: countData.live.total,
      releases: releases,
    };
  }

  async getReleasesList(
    apiUrl: string,
    accessToken: string,
    requestBody: object,
    pageNumber: string,
    resultsPerPage: string,
  ) {
    const response = await fetch(
      `${apiUrl}${RELEASE_OVERVIEW_API_PATH}?page=${pageNumber}&resultsPerPage=${resultsPerPage}`,
      {
        method: 'POST',
        headers: {
          'x-release-personal-token': `${accessToken}`,
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

  async getReleasesCount(
    apiUrl: string,
    accessToken: string,
    requestBody: object,
  ): Promise<ReleaseCountResults> {
    const response = await fetch(`${apiUrl}${RELEASE_COUNT_API_PATH}`, {
      method: 'POST',
      headers: {
        'x-release-personal-token': `${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      await parseErrorResponse(this.logger, response);
    }
    return await response.json();
  }

  async getFoldersList(apiUrl: string, accessToken: string): Promise<Folder[]> {
    const response = await fetch(`${apiUrl}${RELEASE_FOLDERS_LIST_API_PATH}`, {
      method: 'GET',
      headers: {
        'x-release-personal-token': `${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      await parseErrorResponse(this.logger, response);
    }
    return await response.json();
  }

  async getFolderIdAndTitleMap(
    apiUrl: string,
    authCredentials: string,
  ): Promise<Map<string, string>> {
    const foldersList: Folder[] = await this.getFoldersList(
      apiUrl,
      authCredentials,
    );
    const folderIdTitleMap = new Map<string, string>();

    foldersList.forEach(folder => {
      iterateFol(folder, folderIdTitleMap, '');
    });

    function iterateFol(
      folder: Folder,
      map: Map<string, string>,
      parentTitle: string,
    ) {
      const titleWithPath = parentTitle
        ? `${parentTitle} > ${folder.title}`
        : folder.title;
      map.set(folder.id, titleWithPath);
      folder.children.forEach(child => iterateFol(child, map, titleWithPath));
    }
    return folderIdTitleMap;
  }

  getFolderTitle = (
    folderIdTitleMap: Map<string, string>,
    releaseId: string,
  ): string => {
    return folderIdTitleMap.get(
      releaseId.substring(0, releaseId.lastIndexOf('/')),
    ) as string;
  };
}
