import {
  RELEASE_WORKFLOW_LIST_API_PATH,
  getCredentials,
  getReleaseApiHost,
} from './apiConfig';
import { Workflows } from '@digital-ai/plugin-dai-release-common';
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

  async getWorkflowsOverviewApi(instanceName: string): Promise<string[]> {
    this.logger?.debug(`Calling Workflows List api, instance: ${instanceName}`);

    const instanceConfig = this.config.getInstanceConfig(instanceName);
    const accessToken = getCredentials(instanceConfig);
    const apiUrl = getReleaseApiHost(instanceConfig);

    const workflows: Workflows = await this.getWorkflowsList(
      accessToken,
      apiUrl,
    );

//     const workflowsTitle: string[] = [];
//     workflows.content.forEach(d => workflowTitle.push(d.title));

    // Print all workflow titles to the console
    const workflowTitles = workflows.content.map(d => d.title);
    console.log(workflowTitles);

    return workflowTitles;
  }

  private async getWorkflowsList(accessToken: string, apiUrl: string) {

    const response = await fetch(`${apiUrl}${RELEASE_WORKFLOW_LIST_API_PATH}`, {
      method: 'POST',
      headers: {
        'x-release-personal-token': `${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: '{}'
    });
    if (!response.ok) {
      await parseErrorResponse(this.logger, response);
    }
    return await response.json();
  }
}