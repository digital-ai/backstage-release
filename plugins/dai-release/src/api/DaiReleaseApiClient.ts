import {
  AuthenticationError,
  InputError,
  NotAllowedError,
  NotFoundError,
  ServiceUnavailableError,
  parseErrorResponseBody,
} from '@backstage/errors';
import { DiscoveryApi, IdentityApi } from '@backstage/core-plugin-api';
import {
  ReleaseInstanceConfig,
  ReleaseList,
  TemplateGitMetaInfo,
} from '@digital-ai/plugin-dai-release-common';
import { DaiReleaseApi } from './DaiReleaseApi';
import { TemplateList } from '@digital-ai/plugin-dai-release-common';
import { convertUnixTimestamp } from '../utils/dateTimeUtils';
import dayjs from 'dayjs';

export class DaiReleaseApiClient implements DaiReleaseApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly identityApi: IdentityApi;

  public constructor(options: {
    discoveryApi: DiscoveryApi;
    identityApi: IdentityApi;
  }) {
    this.discoveryApi = options.discoveryApi;
    this.identityApi = options.identityApi;
  }

  private async getToken() {
    const { token } = await this.identityApi.getCredentials();
    return token; //  '6HqrCFFDme/3WcC0SFdpaunTu8g2WY+/'
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
    instanceName: string,
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
    queryString.append('instanceName', instanceName.toString());

    const urlSegment = `releases?${queryString}`;
    const items = await this.get<ReleaseList>(urlSegment);
    return { items };
  }

  async getInstanceList(): Promise<ReleaseInstanceConfig[]> {
    return await this.get<ReleaseInstanceConfig[]>('instances');
  }

  async getTemplates(
    page: number,
    rowsPerPage: number,
    searchTile: string,
    instanceName: string,
    options?: { signal?: AbortSignal },
  ): Promise<{ items: TemplateList }> {
    const queryString = new URLSearchParams();

    queryString.append('pageNumber', page.toString());
    queryString.append('resultsPerPage', rowsPerPage.toString());
    queryString.append('title', searchTile.toString());
    queryString.append('instanceName', instanceName.toString());
    const urlSegment = `templates?${queryString}`;
    const items = await this.get<TemplateList>(urlSegment, options);
    return { items };
  }

  async getTemplateMetaInfo(
    instanceName: string,
    folderId: string,
    options?: { signal?: AbortSignal },
  ): Promise<TemplateGitMetaInfo> {
    const queryString = new URLSearchParams();

    queryString.append('folderId', folderId.toString());
    queryString.append('instanceName', instanceName.toString());
    const urlSegment = `template/meta?${queryString}`;
    return await this.get<TemplateGitMetaInfo>(urlSegment, options);
  }

  private async get<T>(
    path: string,
    options?: { signal?: AbortSignal },
  ): Promise<T> {
    const baseUrl = `${await this.discoveryApi.getBaseUrl('dai-release')}/`;
    const url = new URL(path, baseUrl);
    const idToken = await this.getToken();

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      signal: options?.signal,
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
      } else if (response.status === 400) {
        throw new InputError(data.error.message);
      }
      throw new Error(
        `Unexpected error: failed to fetch data, status ${response.status}: ${response.statusText}`,
      );
    }

    return (await response.json()) as Promise<T>;
  }
}
