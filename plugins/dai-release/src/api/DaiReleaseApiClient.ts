import { beginDateFormat, endDateFormat } from '../utils/dateTimeUtils';
import { DaiReleaseApi } from './DaiReleaseApi';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';
import moment from 'moment';

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
  ): Promise<any> {
    const queryString = new URLSearchParams();
    const now = new Date();
    const order = `${orderBy}:${orderDirection}`;
    queryString.append(
      'beginDate',
      moment(now).subtract(7, 'days').format(beginDateFormat),
    );
    queryString.append('endDate', moment(now).format(endDateFormat));
    queryString.append('order', order);
    queryString.append('pageNumber', (page + 1).toString());
    queryString.append('resultsPerPage', rowsPerPage.toString());
    queryString.append('taskSet', 'ALL');

    const urlSegment = `releases?${queryString}`;
    const items = await this.get<any>(urlSegment);
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
