import { DaiReleaseApi } from './DaiReleaseApi';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import {
  AuthenticationError,
  NotAllowedError,
  NotFoundError,
  parseErrorResponseBody,
  ServiceUnavailableError,
} from '@backstage/errors';
import { ReleaseList } from '@digital-ai/plugin-dai-release-common/dist-types/src';

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
    queryString.append('failing', encodeURIComponent(true));
    queryString.append('planned', encodeURIComponent(true));
    queryString.append('completed', encodeURIComponent(true));
    queryString.append('paused', encodeURIComponent(true));
    queryString.append('aborted', encodeURIComponent(true));
    queryString.append('inProgress', encodeURIComponent(true));
    queryString.append('failed', encodeURIComponent(true));
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
