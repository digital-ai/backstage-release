import { Config } from '@backstage/config';
import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';

export class ReleaseConfig {
  constructor(public readonly instances: ReleaseInstanceConfig[]) {}
  /**
   * Read all Release instance configurations.
   * @param config - Root configuration
   * @returns A ReleaseConfig that contains all configured Release instances.
   */
  static fromConfig(config: Config): ReleaseConfig {
    const releaseConfig = config.getConfig('daiRelease');

    function readValues(config: Config, keyName: string) {
      // check the config values and overwrite to handle error in UI
      return config.has(keyName) && config.get(keyName) != ''
        ? config.getString(keyName)
        : '';
    }

    // load all named instance config
    const instanceConfig: ReleaseInstanceConfig[] =
      releaseConfig.getOptionalConfigArray('instances')?.map(c => ({
        name: readValues(c, 'name'),
        host: readValues(c, 'host'),
        token: readValues(c, 'token'),
      })) || [];

    return new ReleaseConfig(instanceConfig);
  }

  public getInstanceConfig(instanceName: string): ReleaseInstanceConfig {
    // A name is provided, look it up.
    const instanceConfig = this.instances.find(c => c.name === instanceName);
    if (!instanceConfig) {
      throw new Error(
        `Couldn't find a release instance '${instanceName}' in the config`,
      );
    }
    return instanceConfig;
  }
}
