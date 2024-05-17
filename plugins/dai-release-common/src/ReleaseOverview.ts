/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

/** @public */

export interface Overview  {
  id: string;
  type: string;
  title: string;
  status: string;
  kind: string;
};
export interface ReleaseOverview extends Overview {
  startDate: number;
  endDate: number;
};
export interface ReleaseFallBackOverview extends Overview {
  startDate: string;
  dueDate: string;
};
