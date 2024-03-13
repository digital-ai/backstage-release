import { DaiReleaseApi } from './DaiReleaseApi';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';

export class DaiReleaseApiClient implements DaiReleaseApi {
  private readonly discoveryApi: DiscoveryApi;

  public constructor(options: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = options.discoveryApi;
  }

  async getReleases(): Promise<any> {
    return await this.get('');
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
