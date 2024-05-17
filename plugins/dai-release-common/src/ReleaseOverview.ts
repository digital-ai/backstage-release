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

export type ReleaseFallBackOverview = {
  id: string;
  type: string;
  title: string;
  startDate: string;
  dueDate: string;
  status: string;
  kind: string;
};
