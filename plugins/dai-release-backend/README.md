# Digital.ai Release Backend

## Setup

The following sections will help you get the (Digital.ai) Dai Release Backend plugin setup and running.

### Configuration

The Dai Release plugin requires the following YAML to be added to your `app-config.yaml`:

```yaml
daiRelease:
  host: { HOST } #http://xl-release-nightly.xebialabs.com:4516
  token: ${apiKey}
```

Configuration Details:

- `host` will be your release application host.
- `token` environment variable must be set, that is your release application api token. Create an account with read permission and use that.

### Up and Running

Here's how to get the backend up and running:

1. First we need to add the `@digital-ai/plugin-dai-release-backend` package to your backend:

   ```sh
   # From your Backstage root directory
   yarn --cwd packages/backend add @digital-ai/plugin-dai-release-backend
   ```

2. Then we will create a new file named `packages/backend/src/plugins/dai-release.ts`, and add the
   following to it:

   ```ts
   import { createRouter } from '@digital-ai/plugin-dai-release-backend';
   import { Router } from 'express';
   import type { PluginEnvironment } from '../types';

   export default function createPlugin(
     env: PluginEnvironment,
   ): Promise<Router> {
     return createRouter({
       logger: env.logger,
       config: env.config,
     });
   }
   ```

3. Next we wire this into the overall backend router, edit `packages/backend/src/index.ts`:

   ```ts
   import daiRelease from './plugins/dai-release';
   // ...
   async function main() {
     // ...
     // Add this line under the other lines that follow the useHotMemoize pattern
     const daiReleaseEnv = useHotMemoize(module, () => createEnv('dai-release'));
     // ...
     // Insert this line under the other lines that add their routers to apiRouter in the same way
     apiRouter.use('/dai-release', await daiRelease(daiReleaseEnv));
   ```

4. Now run `yarn start-backend` from the repo root
5. Finally open `http://localhost:7007/api/dai-release/health` in a browser and it should return `{"status":"ok"}`

#### New Backend System

The Dai Release backend plugin has support for the [new backend system](https://backstage.io/docs/backend-system/), here's how you can set that up:

In your `packages/backend/src/index.ts` make the following changes:

```diff
  import { createBackend } from '@backstage/backend-defaults';

  const backend = createBackend();

  // ... other feature additions

+ backend.add(import('@digital-ai/plugin-dai-release-backend'));

  backend.start();
```
