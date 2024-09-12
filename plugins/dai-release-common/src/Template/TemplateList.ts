/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

/** @public */
export type TemplateList = {
  total: number;
  templates: Template[];
};

export type Template = {
  id: string;
  title: string;
  folder?: string;
  newReleaseRedirectUri: string;
  titleRedirectUri: string;
};

/** @public */
export type TemplateOverview = {
  id: string;
  type: string;
  status: string;
  kind: string;
  title: string;
  plannedDuration: number;
  $scmTraceabilityDataId: number;
};