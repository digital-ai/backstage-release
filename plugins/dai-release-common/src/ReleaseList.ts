/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

/** @public */
export type ReleaseList = {
  total: number;
  releases: Release[];
};

export type Release = {
  id: string;
  title: string;
  folder?: string;
  status: string;
  fromDate: number;
  endDate: number;
  releaseRedirectUri: string;
};
