import {
  AuthenticationError,
  NotAllowedError,
  NotFoundError,
  ServiceUnavailableError,
  parseErrorResponseBody,
} from '@backstage/errors';
import { DaiReleaseApi } from './DaiReleaseApi';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import { ReleaseList } from '@digital-ai/plugin-dai-release-common';
import { convertUnixTimestamp } from '../utils/dateTimeUtils';
import dayjs from 'dayjs';

export class DaiReleaseApiClient implements DaiReleaseApi {
  private readonly discoveryApi: DiscoveryApi;

  public constructor(options: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = options.discoveryApi;
  }

  private isStatusChecked(statusTags: string[], tag: string) {
    return encodeURIComponent(statusTags.indexOf(tag) > -1);
  }

  async getReleases(
    page: number,
    rowsPerPage: number,
    orderBy: string,
    searchTile: string,
    fromDate: dayjs.Dayjs | null,
    toDate: dayjs.Dayjs | null,
    statusTags: string[],
  ): Promise<{ items: ReleaseList }> {
    const queryString = new URLSearchParams();
    queryString.append('failing', this.isStatusChecked(statusTags, 'Failing'));
    queryString.append('planned', this.isStatusChecked(statusTags, 'Planned'));
    queryString.append(
      'completed',
      this.isStatusChecked(statusTags, 'Completed'),
    );
    queryString.append('paused', this.isStatusChecked(statusTags, 'Paused'));
    queryString.append('aborted', this.isStatusChecked(statusTags, 'Aborted'));
    queryString.append(
      'inProgress',
      this.isStatusChecked(statusTags, 'In progress'),
    );
    queryString.append('failed', this.isStatusChecked(statusTags, 'Failed'));
    queryString.append('pageNumber', page.toString());
    queryString.append('resultsPerPage', rowsPerPage.toString());
    queryString.append('orderBy', orderBy);
    queryString.append('title', searchTile.toString());
    queryString.append('fromDate', convertUnixTimestamp(fromDate).toString());
    queryString.append('toDate', convertUnixTimestamp(toDate).toString());

    const urlSegment = `releases?${queryString}`;
    const items = await this.get<ReleaseList>(urlSegment);
    return { items };
  }

  private async get<T>(path: string): Promise<T> {
    const baseUrl =
      'http://localhost:7007/dai-release/releases' ??
      `${await this.discoveryApi.getBaseUrl('dai-release')}/`;
    const url = new URL(path, baseUrl);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const data = await parseErrorResponseBody(response);
      if (response.status === 401) {
        throw new AuthenticationError(data.error.message);
      } else if (response.status === 403) {
        throw new NotAllowedError(data.error.message);
      } else if (response.status === 404) {
        throw new NotFoundError(data.error.message);
      } else if (response.status === 500) {
        throw new ServiceUnavailableError(`Release Service Unavailable`);
      }
      throw new Error(
        `Unexpected error: failed to fetch data, status ${response.status}: ${response.statusText}`,
      );
    }

    return (await response.json()) as Promise<T>;
  }
}
