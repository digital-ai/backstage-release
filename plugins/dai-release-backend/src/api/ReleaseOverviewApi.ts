import {
  ReleaseList,
  ReleaseStatus,
} from '@digital-ai/plugin-dai-release-common';
import {
  getCredentials,
  getReleaseApiHost,
} from './apiConfig';
import { Config } from '@backstage/config';
import { Logger } from 'winston';

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

    const requestBody = [
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
        onlyFlagged: false,
        onlyArchived: false,
        onlyMine: false,
      },
    ];
    // const response = await fetch(
    //   `${apiUrl}${RELEASE_OVERVIEW_API_PATH}?page=${pageNumber}&numberbypage=${resultsPerPage}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Basic ${authCredentials}`,
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //     body: JSON.stringify(requestBody),
    //   },
    // );
    // if (!response.ok) {
    //   await parseErrorResponse(this.logger, response);
    // }
    // // const data: ReleaseOverviewResults =
    // await response.json();

    requestBody.toString()

    return {
      page: 1,
      releases: [
        {
          id: authCredentials,
          title: 'releasetitle1',
          folder: resultsPerPage,
          status: ReleaseStatus.FAILED,
          startDate: 1710227982252,
          endDate: 1710864041856,
          releaseRedirectUri: apiUrl,
          currentPhase: pageNumber,
        },
        {
          id: authCredentials,
          title: 'releasetitle2',
          folder: resultsPerPage,
          status: ReleaseStatus.FAILED,
          startDate: 1710227982252,
          endDate: 1710864041856,
          releaseRedirectUri: apiUrl,
          currentPhase: pageNumber,
        },
        {
          id: authCredentials,
          title: 'releasetitle3',
          folder: resultsPerPage,
          status: ReleaseStatus.FAILED,
          startDate: 1710227982252,
          endDate: 1710864041856,
          releaseRedirectUri: apiUrl,
          currentPhase: pageNumber,
        },
        {
          id: authCredentials,
          title: 'releasetitle4',
          folder: resultsPerPage,
          status: ReleaseStatus.FAILED,
          startDate: 1710227982252,
          endDate: 1710864041856,
          releaseRedirectUri: apiUrl,
          currentPhase: pageNumber,
        },
        {
          id: authCredentials,
          title: 'releasetitle5',
          folder: resultsPerPage,
          status: ReleaseStatus.FAILED,
          startDate: 1710227982252,
          endDate: 1710864041856,
          releaseRedirectUri: apiUrl,
          currentPhase: pageNumber,
        },
        {
          id: authCredentials,
          title: 'releasetitle6',
          folder: resultsPerPage,
          status: ReleaseStatus.FAILED,
          startDate: 1710227982252,
          endDate: 1710864041856,
          releaseRedirectUri: apiUrl,
          currentPhase: pageNumber,
        },
        {
          id: authCredentials,
          title: 'releasetitle7',
          folder: resultsPerPage,
          status: ReleaseStatus.FAILED,
          startDate: 1710227982252,
          endDate: 1710864041856,
          releaseRedirectUri: apiUrl,
          currentPhase: pageNumber,
        },
        {
          id: authCredentials,
          title: 'releasetitle8',
          folder: resultsPerPage,
          status: ReleaseStatus.FAILED,
          startDate: 1710227982252,
          endDate: 1710864041856,
          releaseRedirectUri: apiUrl,
          currentPhase: pageNumber,
        },
        {
          id: authCredentials,
          title: 'releasetitle9',
          folder: resultsPerPage,
          status: ReleaseStatus.FAILED,
          startDate: 1710227982252,
          endDate: 1710864041856,
          releaseRedirectUri: apiUrl,
          currentPhase: pageNumber,
        },
        {
          id: authCredentials,
          title: 'releasetitle10',
          folder: resultsPerPage,
          status: ReleaseStatus.FAILED,
          startDate: 1710227982252,
          endDate: 1710864041856,
          releaseRedirectUri: apiUrl,
          currentPhase: pageNumber,
        },
      ],
    };
  }
}
