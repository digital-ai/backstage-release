import { BackendDynamicPluginInstaller } from '@backstage/backend-dynamic-feature-service';
import {daiReleasePlugin} from "../plugin";


export const dynamicPluginInstaller: BackendDynamicPluginInstaller = {
  kind: 'new',
  install:() => daiReleasePlugin,
};