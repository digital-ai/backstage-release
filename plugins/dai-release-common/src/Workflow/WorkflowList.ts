/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

/** @public */
export type Logo = {
  id: string;
  type: string;
  contentType: string;
};

export type ScmTraceabilityData = {
  kind: string;
  commit: string;
  author: string;
  date: number;
  message: string;
  remote: string;
  fileName: string;
};

export type WorkflowContent = {
  id: string;
  title: string;
  description: string;
  logo: Logo;
  author: string;
  tags: string[];
  categories: string[];
  scmTraceabilityData: ScmTraceabilityData;
  folderId: string;
  folderTitle: string;
  allowTargetFolderOverride: boolean;
  defaultTargetFolder: string;
  executions: number;
};
// Main API Response - releaseAPI/workflows/search
export type WorkflowsOverview = {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  content: WorkflowContent[];
  first: boolean;
  last: boolean;
};

export type GitInfo = {
  commitId: string;
  repoLink: string;
};

export type Workflow = {
  title: string;
  id: string;
  description: string;
  logoLink: string;
  author: string;
  folderTitle: string;
  categories: string[];
  git: GitInfo;
  defaultTargetFolder: string;
};

// Backend API Response - workflow/redirect
export type WorkflowsList = {
  workflows: Workflow[];
  totalPages: number;
  totalElements: number;
};
