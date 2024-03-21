/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

/** @public */
export enum ReleaseStatus {
  TEMPLATE = 'TEMPLATE',
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
  FAILING = 'FAILING',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
  ABORTED = 'ABORTED',
}

export enum ReleaseKind {
  RELEASE = 'release',
  WORKFLOW = 'workflow',
}

export type ReleaseOverview = {
  id: string;
  type: string;
  title: string;
  startDate: number;
  endDate: number;
  status: ReleaseStatus;
  kind: ReleaseKind;
};
