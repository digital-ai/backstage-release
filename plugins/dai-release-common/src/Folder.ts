/***/
/**
 * Common functionalities for the dai-release plugin.
 *
 * @packageDocumentation
 */

/** @public */
export type Folder = {
  id: string;
  type: string;
  $token: string;
  title: string;
  children: Folder[];
  $metadata: {
    security: {
      permissions: string[];
      teams: string[];
    };
  };
};

export type FolderBackendResponse = {
  folders: Folder[];
  totalPages: number;
  totalElements: number;
};
