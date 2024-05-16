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
      throw new Error(
        `Error: invalid values or missing property for daiRelease in config yaml`,
      );
    }
  }

  public getInstanceConfig(instanceName: string): ReleaseInstanceConfig {
    // A name is provided, look it up.
    const instanceConfig = this.instances.find(
      c => c.displayName === instanceName,
    );
    if (!instanceConfig) {
      throw new Error(
        `Couldn't find a release instance '${instanceName}' in the config`,
      );
    }
    return instanceConfig;
  }
}
