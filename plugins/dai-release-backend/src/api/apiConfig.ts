import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';

export const RELEASE_OVERVIEW_API_PATH = '/api/v1/releases/search/overview';
export const RELEASE_OVERVIEW_EXISTING_API_PATH = '/api/v1/releases/search';
export const RELEASE_COUNT_API_PATH = '/api/v1/releases/count';
export const RELEASE_FOLDERS_LIST_API_PATH =
  '/api/v1/folders/list?depth=1000&permissions=false&resultsPerPage=1000000';
export const RELEASE_DETAILS_REDIRECT_PATH = '/#/releases/';
export const TEMPLATE_DETAILS_REDIRECT_PATH = '/#/templates/';
export const CREATE_RELEASE_REDIRECT_PATH =
  '/#/releases/create?fromTemplateId=';
export const RELEASE_TEMPLATE_LIST_API_PATH = '/api/v1/templates';

export const getCredentials = (config: ReleaseInstanceConfig) => {
  try {
    const accessToken = config.token;
    return `${accessToken}`;
  } catch (error: unknown) {
    throw new Error(`Error: ${(error as Error).message}`);
  }
};

export const getReleaseApiHost = (config: ReleaseInstanceConfig): string => {
  try {
    const validHost = config.host;
    return `${removeTrailingSlash(validHost)}`;
  } catch (error: unknown) {
    throw new Error(`Error: ${(error as Error).message}`);
  }
};

export const getEncodedQueryVal = (queryString?: string): string => {
  return encodeURIComponent(
    queryString || queryString === 'undefined' ? queryString : '',
  );
};

export const getDecodedQueryVal = (queryString?: string): string => {
  return decodeURIComponent(
    queryString || queryString === 'undefined' ? queryString : '',
  );
};

export const getReleaseDetailsRedirectUri = (
  config: ReleaseInstanceConfig,
  releaseId: string,
): string => {
  const parts = releaseId.split('/');
  parts.shift();
  const releaseIdUrl = parts.join('-');
  return `${getReleaseApiHost(config)}${RELEASE_DETAILS_REDIRECT_PATH}${releaseIdUrl}`;
};

export const getTemplateDetailsRedirectUri = (
  config: ReleaseInstanceConfig,
  releaseId: string,
): string => {
  const parts = releaseId.split('/');
  parts.shift();
  const releaseIdUrl = parts.join('-');
  return `${getReleaseApiHost(config)}${TEMPLATE_DETAILS_REDIRECT_PATH}${releaseIdUrl}`;
};

export const getCreateReleaseRedirectUri = (
  config: ReleaseInstanceConfig,
  releaseId: string,
): string => {
  const parts = releaseId.split('/');
  parts.shift();
  const releaseIdUrl = parts.join('-');
  return `${getReleaseApiHost(config)}${CREATE_RELEASE_REDIRECT_PATH}${releaseIdUrl}`;
};

function removeTrailingSlash(input: string): string {
  return input.endsWith('/') ? input.slice(0, -1) : input;
}
