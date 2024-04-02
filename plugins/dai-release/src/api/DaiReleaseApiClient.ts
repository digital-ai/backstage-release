import { DaiReleaseApi } from './DaiReleaseApi';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';
import moment from 'moment';
import { beginDateFormat, endDateFormat } from '../utils/dateTimeUtils';
import { ReleaseList } from '@digital-ai/plugin-dai-release-common/';

export class DaiReleaseApiClient implements DaiReleaseApi {
  private readonly discoveryApi: DiscoveryApi;

  public constructor(options: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = options.discoveryApi;
  }

  async getReleases(
    page: number,
    rowsPerPage: number,
    orderBy: string,
    orderDirection: string,
  ): Promise<{ items: ReleaseList }> {
    const queryString = new URLSearchParams();
    /*    const now = new Date();
    queryString.append(
        'beginDate',
        moment(now).subtract(7, 'days').format(beginDateFormat),
    );
    queryString.append('endDate', moment(now).format(endDateFormat));*/

    queryString.append('failing', encodeURIComponent(true));
    queryString.append('planned', encodeURIComponent(true));
    queryString.append('completed', encodeURIComponent(true));
    queryString.append('paused', encodeURIComponent(true));
    queryString.append('aborted', encodeURIComponent(true));
    queryString.append('failing', encodeURIComponent(true));
    queryString.append('pageNumber', page.toString());
    queryString.append('resultsPerPage', rowsPerPage.toString());
    queryString.append('orderBy', orderBy);
    queryString.append('orderDirection', orderDirection);
    const urlSegment = `releases?${queryString}`;
    const items = await this.get<ReleaseList>(urlSegment);
    return { items };
  }

  private async get<T>(path: string): Promise<T> {
    const baseUrl = `${await this.discoveryApi.getBaseUrl('dai-release')}/`;
    const url = new URL(path, baseUrl);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return (await response.json()) as Promise<T>;
  }
}
