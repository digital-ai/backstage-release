import {
  Logo,
  WorkflowContent,
  WorkflowsList,
  WorkflowsOverview,
} from '@digital-ai/plugin-dai-release-common';
import {
  RELEASE_WORKFLOW_CREATE_RELEASE_API_PATH,
  RELEASE_WORKFLOW_LIST_API_PATH,
  RELEASE_WORKFLOW_LOGO_API_PATH,
  RELEASE_WORKFLOW_TRIGGER_WORKFLOW_PATH,
  getCredentials,
  getReleaseApiHost,
} from './apiConfig';
import { ReleaseConfig } from '../service/releaseInstanceConfig';
import { RootLoggerService } from '@backstage/backend-plugin-api';
import { parseErrorResponse } from './responseUtil';

export class WorkflowsOverviewApi {
  private readonly logger: RootLoggerService;
  private readonly config: ReleaseConfig;

  private constructor(logger: RootLoggerService, config: ReleaseConfig) {
    this.logger = logger;
    this.config = config;
  }

  static fromConfig(config: ReleaseConfig, logger: RootLoggerService) {
    return new WorkflowsOverviewApi(logger, config);
  }

  async redirectToWorkflowRunPage(
    instanceName: string,
    templateId: string,
    releaseTitle: string,
    folderId: string,
  ) {
    this.logger?.debug(
      `Redirecting to Workflows Run Page, instance: ${instanceName}`,
    );

    const instanceConfig = this.config.getInstanceConfig(instanceName);
    const accessToken = getCredentials(instanceConfig);
    const apiUrl = getReleaseApiHost(instanceConfig);

    function convertIdPath(unconvertedId: string): string {
      const parts = unconvertedId.split('/');
      return parts.slice(1).join('-');
    }

    function getReleaseId(fullTemplateId: string): string {
      const parts = fullTemplateId.split('/');
      return parts[parts.length - 1];
    }

    const workflow: WorkflowContent = await this.startRelease(
      accessToken,
      apiUrl,
      getReleaseId(templateId),
      releaseTitle,
      folderId,
    );
    const templateIdConverted = convertIdPath(workflow?.id);
    const redirectUrl = `${apiUrl}${RELEASE_WORKFLOW_TRIGGER_WORKFLOW_PATH}/${templateIdConverted}`;

    return redirectUrl;
  }

  async getWorkflowsOverviewApi(
    instanceName: string,
    pageNumber: string,
    resultsPerPage: string,
    searchInput: string,
    categories: string[],
    author: string,
  ): Promise<WorkflowsList> {
    this.logger?.debug(`Calling Workflows List api, instance: ${instanceName}`);

    const instanceConfig = this.config.getInstanceConfig(instanceName);
    const accessToken = getCredentials(instanceConfig);
    const apiUrl = getReleaseApiHost(instanceConfig);

    const workflows: WorkflowsOverview = await this.getWorkflowsList(
      accessToken,
      apiUrl,
      pageNumber,
      resultsPerPage,
      searchInput,
      categories,
      author,
    );

    function getRepoLink(repoRemoteLink: string, commitId: string): string {
      return `${repoRemoteLink}/commit/${commitId}`;
    }

    function getImageLink(logo: Logo): string {
      if (logo?.id)
        return `${apiUrl}${RELEASE_WORKFLOW_LOGO_API_PATH}/${logo?.id}`;
      return '';
    }

    const workflowDetails = workflows.content.map(d => ({
      title: d.title,
      id: d.id,
      description: d.description,
      logoLink: getImageLink(d.logo),
      author: d.author,
      folderTitle: d.folderTitle,
      defaultTargetFolder: d.defaultTargetFolder ? d.defaultTargetFolder : '',
      categories: Array.isArray(d.categories) ? d.categories : [d.categories],
      git: {
        commitId: d.scmTraceabilityData.commit.substring(0, 8),
        repoLink: getRepoLink(
          d.scmTraceabilityData.remote,
          d.scmTraceabilityData.commit,
        ),
      },
    }));

    return {
      workflows: workflowDetails,
      totalPages: workflows.totalPages,
      totalElements: workflows.totalElements,
    };
  }

  private async getWorkflowsList(
    accessToken: string,
    apiUrl: string,
    pageNumber: string,
    resultsPerPage: string,
    searchInput: string,
    categories: string[],
    author: string,
  ) {
    const body = JSON.stringify({
      ...(searchInput && { searchInput }),
      ...(categories.length && { categories }),
      ...(author && { author }),
    });
    const response = await fetch(
      `${apiUrl}${RELEASE_WORKFLOW_LIST_API_PATH}?page=${pageNumber}&resultsPerPage=${resultsPerPage}`,
      {
        method: 'POST',
        headers: {
          'x-release-personal-token': `${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: body,
      },
    );
    if (!response.ok) {
      await parseErrorResponse(this.logger, response);
    }
    return await response.json();
  }

  private async startRelease(
    accessToken: string,
    apiUrl: string,
    templateId: string,
    releaseTitle: string,
    folderId: string,
  ) {
    const body = JSON.stringify({
      ...(releaseTitle && { releaseTitle }),
      ...(folderId && { folderId }),
    });

    const response = await fetch(
      `${apiUrl}${RELEASE_WORKFLOW_CREATE_RELEASE_API_PATH}/${templateId}/start`,
      {
        method: 'POST',
        headers: {
          'x-release-personal-token': `${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: body,
      },
    );
    if (!response.ok) {
      await parseErrorResponse(this.logger, response);
    }
    return await response.json();
  }
}
