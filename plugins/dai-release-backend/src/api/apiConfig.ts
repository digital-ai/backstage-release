import { Config } from '@backstage/config';

export const RELEASE_OVERVIEW_API_PATH = '/releases/overview';
export const RELEASE_COUNT_API_PATH = '/releases/count';
export const RELEASE_TAGS_API_PATH = '/releases/tags';
export const RELEASE_RISK_CONFIG_API_PATH = '/api/v1/risks/config';
export const RELEASE_TAGS_ARCHIVED_API_PATH = '/releases/tags/archived';
export const RELEASE_FOLDERS_LIST_API_PATH = '/api/v1/folders/list';
export const RELEASE_DETAILS_REDIRECT_PATH = '/#/reports/deployments?taskId='; // TO-DO

export const getCredentials = (config: Config) => {
  try {
    const username = config.getString('daiRelease.username');
    const password = config.getString('daiRelease.password');

    return btoa(`${username}:${password}`);
  } catch (error: unknown) {
    throw new Error(`Error: ${(error as Error).message}`);
  }
};

export const getReleaseApiHost = (config: Config): string => {
  try {
    const validHost = config.getString('daiRelease.host');
    return `${validHost}`;
  } catch (error: unknown) {
    throw new Error(`Error: ${(error as Error).message}`);
  }
};

export const getEncodedQueryVal = (queryString?: string): string => {
  return encodeURIComponent(
    queryString || queryString === 'undefined' ? queryString : '',
  );
};

// TO-DO
export const getReleaseDetailsRedirectUri = (
  config: Config,
  taskId: string,
): string => {
  return `${getReleaseApiHost(config)}${RELEASE_DETAILS_REDIRECT_PATH}${taskId}`;
};
