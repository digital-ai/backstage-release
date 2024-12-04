import {
  Categories,
  CategoriesContentActiveList,
  ReleaseCategories,
} from '@digital-ai/plugin-dai-release-common';
import {
  RELEASE_CATEGORIES,
  getCredentials,
  getReleaseApiHost,
} from './apiConfig';
import { ReleaseConfig } from '../service/releaseInstanceConfig';
import { RootLoggerService } from '@backstage/backend-plugin-api';
import { parseErrorResponse } from './responseUtil';

export class CategoriesApi {
  private readonly logger: RootLoggerService;
  private readonly config: ReleaseConfig;

  private constructor(logger: RootLoggerService, config: ReleaseConfig) {
    this.logger = logger;
    this.config = config;
  }

  static fromConfig(config: ReleaseConfig, logger: RootLoggerService) {
    return new CategoriesApi(logger, config);
  }

  async getCategoriesApi(instanceName: string): Promise<ReleaseCategories> {
    this.logger?.debug(`Calling Categories api, instance: ${instanceName}`);

    const instanceConfig = this.config.getInstanceConfig(instanceName);
    const accessToken = getCredentials(instanceConfig);
    const apiUrl = getReleaseApiHost(instanceConfig);

    const categories: Categories = await this.getCategories(
      accessToken,
      apiUrl,
    );

    const categoriesActiveList: CategoriesContentActiveList[] =
      categories.content.map(({ id, title }) => ({ id, title }));

    return {
      activeCategory: categoriesActiveList,
    };
  }

  private async getCategories(accessToken: string, apiUrl: string) {
    const response = await fetch(`${apiUrl}${RELEASE_CATEGORIES}?active=true`, {
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
}
