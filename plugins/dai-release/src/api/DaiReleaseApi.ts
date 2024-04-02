import { createApiRef } from '@backstage/core-plugin-api';
import { ReleaseList } from '@digital-ai/plugin-dai-release-common';

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
    orderDirection: string,
  ): Promise<{ items: ReleaseList }>;
}
