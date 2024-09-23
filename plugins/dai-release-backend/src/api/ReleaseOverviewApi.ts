import {
  RELEASE_COUNT_API_PATH,
  RELEASE_FOLDERS_LIST_API_PATH,
  RELEASE_OVERVIEW_API_PATH,
  RELEASE_OVERVIEW_EXISTING_API_PATH,
  RELEASE_TEMPLATE_LIST_API_PATH,
  getCreateReleaseRedirectUri,
  getCredentials,
  getReleaseApiHost,
  getReleaseDetailsRedirectUri,
  getTemplateDetailsRedirectUri,
} from './apiConfig';
import {
  Release,
  ReleaseCountResults,
  ReleaseFallBackOverview,
  ReleaseOverview,
  TemplateOverview,
} from '@digital-ai/plugin-dai-release-common';
import { Template, TemplateList } from '@digital-ai/plugin-dai-release-common';
import { getEndOrDueDate, getStartOrScheduledDate } from './date-service';
import { Folder } from '@digital-ai/plugin-dai-release-common';
import { ReleaseConfig } from '../service/releaseInstanceConfig';
import { ReleaseList } from '@digital-ai/plugin-dai-release-common';
import { RootLoggerService } from '@backstage/backend-plugin-api';
import { parseErrorResponse } from './responseUtil';

export class ReleaseOverviewApi {
  private readonly logger: RootLoggerService;
  private readonly config: ReleaseConfig;

  private constructor(logger: RootLoggerService, config: ReleaseConfig) {
    this.logger = logger;
    this.config = config;
  }

  static fromConfig(config: ReleaseConfig, logger: RootLoggerService) {
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
    fromDate: string,
    toDate: string,
    orderBy: string,
    pageNumber: string,
    resultsPerPage: string,
    instanceName: string,
  ): Promise<ReleaseList> {
    this.logger?.debug(
      `Calling Release Overview api, start from: ${fromDate} to: ${toDate}, in order of ${orderBy}`,
    );
    const instanceConfig = this.config.getInstanceConfig(instanceName);
    const accessToken = getCredentials(instanceConfig);
    const apiUrl = getReleaseApiHost(instanceConfig);

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
      from: fromDate,
      to: toDate,
      orderBy: orderBy,
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
        fromDate: d.startDate,
        endDate: d.endDate,
        releaseRedirectUri: getReleaseDetailsRedirectUri(instanceConfig, d.id),
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
    if (!response.ok && response.status === 404) {
      this.logger?.warn(`Calling Fallback Release search API.`);
      return await this.getFallBackReleasesList(
        apiUrl,
        accessToken,
        requestBody,
        pageNumber,
        resultsPerPage,
      );
    } else if (!response.ok) {
      await parseErrorResponse(this.logger, response);
    }
    return await response.json();
  }

  async getFallBackReleasesList(
    apiUrl: string,
    accessToken: string,
    requestBody: object,
    pageNumber: string,
    resultsPerPage: string,
  ) {
    const response = await fetch(
      `${apiUrl}${RELEASE_OVERVIEW_EXISTING_API_PATH}?page=${pageNumber}&resultsPerPage=${resultsPerPage}`,
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
    const fallBackOverviews: ReleaseFallBackOverview[] = await response.json();
    const releasesOverview: ReleaseOverview[] = [];
    fallBackOverviews.forEach(d =>
      releasesOverview.push({
        id: d.id,
        title: d.title,
        status: d.status,
        startDate: getStartOrScheduledDate(d),
        endDate: getEndOrDueDate(d),
        type: d.type,
        kind: d.kind,
      }),
    );
    return releasesOverview;
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

  async getReleaseInstances() {
    return this.config.getInstanceList();
  }

  async getTemplates(
    title: string,
    pageNumber: string,
    resultsPerPage: string,
    instanceName: string,
  ): Promise<TemplateList> {
    const instanceConfig = this.config.getInstanceConfig(instanceName);
    const accessToken = getCredentials(instanceConfig);
    const apiUrl = getReleaseApiHost(instanceConfig);

    const data: TemplateOverview[] = await this.getTemplateList(
      apiUrl,
      title,
      accessToken,
      pageNumber,
      resultsPerPage,
    );

    const folderIdTitleMap: Map<string, string> =
      await this.getFolderIdAndTitleMap(apiUrl, accessToken);

    const templates: Template[] = [];
    data.forEach(d =>
      templates.push({
        id: d.id,
        title: d.title,
        folder: this.getFolderTitle(folderIdTitleMap, d.id),
        folderId: this.getFolderId(d.id),
        newReleaseRedirectUri: getCreateReleaseRedirectUri(
          instanceConfig,
          d.id,
        ),
        titleRedirectUri: getTemplateDetailsRedirectUri(instanceConfig, d.id),
      }),
    );

    return {
      templates: templates,
    };
  }

  async getTemplateList(
    apiUrl: string,
    title: string,
    accessToken: string,
    pageNumber: string,
    resultsPerPage: string,
  ) {
    const response = await fetch(
      `${apiUrl}${RELEASE_TEMPLATE_LIST_API_PATH}?page=${pageNumber}&resultsPerPage=${resultsPerPage}&title=${title}`,
      {
        method: 'GET',
        headers: {
          'x-release-personal-token': `${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    if (!response.ok) {
      await parseErrorResponse(this.logger, response);
    }
    return await response.json();
  }

  private getFolderId(id: string) {
    if (!id) return '';
    const [first, second] = id.split('/');
    return `${first}/${second}`;
  }
}
