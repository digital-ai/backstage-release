import { RootLoggerService } from '@backstage/backend-plugin-api';
import { ReleaseConfig } from '../service/releaseInstanceConfig';
import {
  getCredentials,
  getReleaseApiHost,
  RELEASE_TEMPLATE_GIT_COMMIT_VERSIONING_PATH,
  RELEASE_TEMPLATE_GIT_CONFIG_PATH,
} from './apiConfig';
import {
  TemplateCommitVersions,
  TemplateFolderGitConfig,
  TemplateGitMetaInfo,
} from '@digital-ai/plugin-dai-release-common';
import { parseErrorResponse } from './responseUtil';

export class TemplatesOverviewApi {
  private readonly logger: RootLoggerService;
  private readonly config: ReleaseConfig;

  private constructor(logger: RootLoggerService, config: ReleaseConfig) {
    this.logger = logger;
    this.config = config;
  }

  static fromConfig(config: ReleaseConfig, logger: RootLoggerService) {
    return new TemplatesOverviewApi(logger, config);
  }

  async getTemplateMetaInfo(instanceName: string, folderId: string) {
    const instanceConfig = this.config.getInstanceConfig(instanceName);
    const accessToken = getCredentials(instanceConfig);
    const apiUrl = getReleaseApiHost(instanceConfig);

    const gitConfigData: TemplateFolderGitConfig[] =
      await this.getTemplateFolderGitConfig(folderId, accessToken, apiUrl);

    const commitVersioningData: TemplateCommitVersions =
      await this.getTemplateCommitVersions(folderId, accessToken, apiUrl);

    // Extract the first element from gitConfigData
    const gitConfig = gitConfigData[0];

    // Extract the latest commit from commitVersioningData.versions based on commitTime
    const latestCommit = commitVersioningData.versions.reduce(
      (latest, current) =>
        current.commitTime > latest.commitTime ? current : latest,
    );

    // Combine the extracted data into the desired format
    const resultData: TemplateGitMetaInfo = {
      folderId: gitConfig.folderId,
      url: gitConfig.url,
      name: latestCommit.name,
      shortMessage: latestCommit.shortMessage,
      committer: latestCommit.commiter,
      commitTime: latestCommit.commitTime,
      commitHash: latestCommit.commitHash,
    };
    return resultData;
  }

  private async getTemplateFolderGitConfig(
    folderId: string,
    accessToken: string,
    apiUrl: string,
  ) {
    const response = await fetch(
      `${apiUrl}${RELEASE_TEMPLATE_GIT_CONFIG_PATH}?configurationType=git.Repository&folderOnly=false&folderId=${folderId}`,
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

  private async getTemplateCommitVersions(
    folderId: string,
    accessToken: string,
    apiUrl: string,
  ) {
    const response = await fetch(
      `${apiUrl}${RELEASE_TEMPLATE_GIT_COMMIT_VERSIONING_PATH}/${folderId}/versions?fetchChanges=true`,
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
}
