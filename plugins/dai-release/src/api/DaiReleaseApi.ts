import {
  ReleaseInstanceConfig,
  ReleaseList,
} from '@digital-ai/plugin-dai-release-common';
import { TemplateList } from '@digital-ai/plugin-dai-release-common';
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
}
