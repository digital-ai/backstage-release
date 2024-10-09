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
  folderId: string;
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

export type TemplateFolderGitConfig = {
  id: string;
  type: string;
  title: string;
  url: string;
};

export type TemplateGitCommitVersion = {
  name: string;
  shortMessage: string;
  commiter: string;
  commitTime: number;
  commitHash: string;
};

export type TemplateCommitVersions = {
  fetched: string;
  versions: TemplateGitCommitVersion[];
};

export type TemplateGitMetaInfo = {
  folderId: string;
  url: string;
  name: string;
  shortMessage: string;
  committer: string;
  commitTime: number;
  commitHash: string;
};
