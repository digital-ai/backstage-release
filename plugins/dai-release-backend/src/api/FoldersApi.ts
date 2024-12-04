import { Folder, FolderBackendResponse } from '@digital-ai/plugin-dai-release-common';
import {
  RELEASE_FOLDERS_LIST_API_PATH,
  getCredentials,
  getReleaseApiHost
} from './apiConfig';
import { ReleaseConfig } from '../service/releaseInstanceConfig';
import { RootLoggerService } from '@backstage/backend-plugin-api';
import { parseErrorResponse } from './responseUtil';

export class FoldersApi {
  private readonly logger: RootLoggerService;
  private readonly config: ReleaseConfig;

  private constructor(logger: RootLoggerService, config: ReleaseConfig) {
    this.logger = logger;
    this.config = config;
  }

  static fromConfig(config: ReleaseConfig, logger: RootLoggerService) {
    return new FoldersApi(logger, config);
  }

  async getReleaseInstances() {
    return this.config.getInstanceList();
  }

  async getFoldersListApi(
    instanceName: string,
  ): Promise<FolderBackendResponse> {
    this.logger?.debug(
      `Calling Workflows List Folders api, instance: ${instanceName}`,
    );

    const instanceConfig = this.config.getInstanceConfig(instanceName);
    const accessToken = getCredentials(instanceConfig);
    const apiUrl = getReleaseApiHost(instanceConfig);

    const foldersList: Folder[] = await this.getFoldersList(
      apiUrl,
      accessToken,
    );
    return {
      folders: foldersList,
      totalPages: 0,
      totalElements: foldersList.length,
    };
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
}