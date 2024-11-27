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
};

// Backend API Response - /workflows
export type WorkflowsList = {
  workflows: Workflow[];
  totalPages: number;
  totalElements: number;
};

export type FolderOverview = {
  id: string;
  type: string;
  $token: string;
  title: string;
  children: FolderOverview[]; // Recursive structure for nested children
  $metadata?: Metadata; // Optional metadata property
}

export type Metadata = {
  security: Security;
}

export type Security = {
  permissions: string[];
  teams: string[];
}

export type FoldersList = {
  id: string;
  title: string;
  children: FoldersList[];
}