/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

import { ReleaseStatus } from './ReleaseOverview';

/** @public */
export type ReleaseCountResults = {
  live: ReleaseCountResult;
  archived: ReleaseCountResult;
  all: ReleaseCountResult;
};

export type ReleaseCountResult = {
  total: number;
  byStatus: StatusCount;
};

export type StatusCount = {
  [key in ReleaseStatus]: number;
};
