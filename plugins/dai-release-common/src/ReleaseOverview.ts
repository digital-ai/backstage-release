/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

/** @public */
export type ReleaseOverview = {
  id: string;
  type: string;
  title: string;
  startDate: number;
  endDate: number;
  status: string;
  kind: string;
};
