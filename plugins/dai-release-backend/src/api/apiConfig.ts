import { Config } from '@backstage/config';

export const RELEASE_OVERVIEW_API_PATH = '/api/v1/releases/search/overview';
export const RELEASE_OVERVIEW_EXISTING_API_PATH = '/api/v1/releases/search';
export const RELEASE_COUNT_API_PATH = '/api/v1/releases/count';
export const RELEASE_FOLDERS_LIST_API_PATH =
  '/api/v1/folders/list?depth=1000&permissions=false&resultsPerPage=1000000';
export const RELEASE_DETAILS_REDIRECT_PATH = '/#/releases/';

export const getCredentials = (config: Config) => {
  try {
    const accessToken = config.getString('daiRelease.token');
    return `${accessToken}`;
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

export const getReleaseDetailsRedirectUri = (
  config: Config,
  releaseId: string,
): string => {
  const parts = releaseId.split('/');
  parts.shift();
  const releaseIdUrl = parts.join('-');
  return `${getReleaseApiHost(config)}${RELEASE_DETAILS_REDIRECT_PATH}${releaseIdUrl}`;
};
