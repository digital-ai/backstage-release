/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

import { ReleaseStatus } from './ReleaseOverview';

/** @public */
export type ReleaseList = {
  total: number;
  releases: Release[];
};

export type Release = {
  id: string;
  title: string;
  folder: string;
  status: ReleaseStatus;
  startDate: number;
  endDate: number;
  releaseRedirectUri: string;
};
