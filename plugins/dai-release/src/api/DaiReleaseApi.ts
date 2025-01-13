import {
  FolderBackendResponse,
  ReleaseCategories,
  ReleaseInstanceConfig,
  ReleaseList,
  TemplateGitMetaInfo,
  TemplateList,
  WorkflowsList,
} from '@digital-ai/plugin-dai-release-common';
import { createApiRef } from '@backstage/core-plugin-api';
import dayjs from 'dayjs';

/** @public */
export const daiReleaseApiRef = createApiRef<DaiReleaseApi>({
  id: 'plugin.dai-release.service',
});

/** @public */
export interface DaiReleaseApi {
  getReleases(
    page: number,
    rowsPerPage: number,
    orderBy: string,
    searchTile: string,
    fromDate: dayjs.Dayjs | null,
    toDate: dayjs.Dayjs | null,
    statusTags: string[] | undefined,
    instanceName: string,
  ): Promise<{ items: ReleaseList }>;

  getInstanceList(): Promise<ReleaseInstanceConfig[]>;

  getTemplates(
    page: number,
    rowsPerPage: number,
    searchTile: string,
    instanceName: string,
    tags: string[],
    options?: { signal?: AbortSignal },
  ): Promise<{ items: TemplateList }>;

  getTemplateMetaInfo(
    instanceName: string,
    folderId: string,
    options?: { signal?: AbortSignal },
  ): Promise<TemplateGitMetaInfo>;

  getReleaseCategories(instanceName: string): Promise<ReleaseCategories>;

  getWorkflowCatalog(
    page: number,
    resultsPerPage: number,
    searchInput: string,
    categories: string[],
    author: string,
    instanceName: string,
    options?: { signal?: AbortSignal },
  ): Promise<WorkflowsList>;

  getFolders(instanceName: string): Promise<FolderBackendResponse>;

  generateWorkflowRedirect(
    instanceName: string,
    templateId: string,
    releaseTitle: string,
    folderId: string,
    options?: { signal?: AbortSignal },
  ): Promise<{ url: string }>;
}
