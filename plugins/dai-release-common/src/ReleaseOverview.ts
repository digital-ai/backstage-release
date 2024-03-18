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

export enum FlagStatus {
  OK = 'OK',
  ATTENTION_NEEDED = 'ATTENTION_NEEDED',
  AT_RISK = 'AT_RISK',
}

export type Flag = {
  status: FlagStatus;
  comment: string | null;
};

export type ReleaseOverview = {
  id: string;
  type: string;
  title: string;
  startDate: number;
  endDate: number;
  status: ReleaseStatus;
  plannedDuration: number;
  archived: boolean;
  riskScore: number;
  totalTasks: number | null;
  totalRemainingTasks: number | null;
  calculatedProgressPercent: number | null;
  flag: Flag;
  kind: ReleaseKind;
  currentPhase: string;
};

export type ReleaseOverviewResults = {
  page: number;
  cis: ReleaseOverview[];
};
