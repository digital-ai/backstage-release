/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

/** @public */
export type TemplateList = {
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
  kind: string;
  title: string;
};
