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

export type WorkflowsResponse = {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  content: WorkflowContent[];
  first: boolean;
  last: boolean;
};