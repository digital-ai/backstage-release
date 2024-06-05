import { Config } from '@backstage/config';
import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';
import { readValues } from '../api/responseUtil';

export class ReleaseConfig {
  constructor(public readonly instances: ReleaseInstanceConfig[]) {}
  private static instanceList: ReleaseInstanceConfig[];

  /**
   * Read all Release instance configurations.
   * @param config - Root configuration
   * @returns A ReleaseConfig that contains all configured Release instances.
   */
  static fromConfig(config: Config): ReleaseConfig {
    const releaseConfig = config.getConfig('daiRelease');

    // load all named instance config
    this.instanceList =
      releaseConfig.getOptionalConfigArray('instances')?.map(c => ({
        name: readValues(c, 'name'),
        host: readValues(c, 'host'),
        token: readValues(c, 'token'),
      })) || [];
    return new ReleaseConfig(this.instanceList);
  }

  public getInstanceConfig(instanceName: string): ReleaseInstanceConfig {
    // A name is provided, look it up.
    const instanceConfig = ReleaseConfig.instanceList.find(
      c => c.name === instanceName,
    );
    if (!instanceConfig) {
      throw new Error(
        `Couldn't find a release instance '${instanceName}' in the config`,
      );
    }
    return instanceConfig;
  }

  public getInstanceList(): ReleaseInstanceConfig[] {
    return ReleaseConfig.instanceList;
  }
}
