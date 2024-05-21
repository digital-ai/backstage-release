import {
  AuthenticationError,
  NotAllowedError,
  NotFoundError,
} from '@backstage/errors';
import { Config } from '@backstage/config';
import { Logger } from 'winston';
import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';

export async function parseErrorResponse(logger: Logger, response: Response) {
  logger?.error(
    `Error occurred while accessing release: status: ${response.status}, statusText: ${response.statusText} `,
  );
  const responseText = await response.text();
  if (responseText) {
    logger?.error(`Response Error - ${responseText}`);
  }
  if (response.status === 401) {
    logger?.error(`Inside 401`);
    throw new AuthenticationError(
      `Access Denied: Missing or invalid release Token. Unauthorized to Use Digital.ai Release`,
    );
  } else if (response.status === 403) {
    throw new NotAllowedError(
      `Permission Denied: The configured release User lacks necessary permission in Digital.ai Release`,
    );
  } else if (response.status === 404) {
    throw new NotFoundError(`Release service request not found`);
  }
  throw new Error(
    `failed to fetch data, status ${response.status} ${response.statusText}`,
  );
}

export function validateInstanceRes(instancesList: ReleaseInstanceConfig[]) {
  if (instancesList && instancesList.length === 0) {
    return false;
  }
  return instancesList.every(data => {
    return !(data.name === '' || data.host === '' || data.token === '');
  });
}

export function readValues(config: Config, keyName: string) {
  // check the config values and overwrite to handle error in UI
  return config.has(keyName) && config.get(keyName) !== ''
    ? config.getString(keyName)
    : '';
}
