/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

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
  [key: string]: number;
};
