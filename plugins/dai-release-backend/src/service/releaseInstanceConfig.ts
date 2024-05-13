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
    try {
      const releaseConfig = config.getConfig('daiRelease');

      // load all named instance config
      const instanceConfig: ReleaseInstanceConfig[] =
        releaseConfig.getOptionalConfigArray('instances')?.map(c => ({
          displayName: c.getString('displayName'),
          host: c.getString('host'),
          token: c.getString('token'),
        })) || [];

      return new ReleaseConfig(instanceConfig);
    } catch (error: unknown) {
      throw new Error(`Error: ${(error as Error).message}`);
    }
  }

  public getInstanceConfig(instanceName: string): ReleaseInstanceConfig {
    let instanceConfig;

    if (instanceName && instanceName.trim() != '') {
      // A name is provided, look it up.
      instanceConfig = this.instances.find(c => c.displayName === instanceName);
    } else {
      //on initial load if the instance name not set from UI, take first instance from the config
      instanceConfig = this.instances[0];
    }
    if (!instanceConfig) {
      throw new Error(`Couldn't find a release instance in the config`);
    }
    return instanceConfig;
  }
}
