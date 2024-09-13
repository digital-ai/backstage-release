# Digital.ai Release Backend

It is a simple plugin that makes API requests to [Digital.ai](https://digital.ai/products/release/) Release

## Setup

### Installing and Configuring the Backend Plugin

The backend plugin needs to be added to your application. To do so:

#### 1. Run the following command from the Backstage root directory:

```shell
yarn --cwd packages/backend add @digital-ai/plugin-dai-release-backend
```

#### 2. Create plugin file for release backend in the packages/backend/src/plugins/ directory.

```ts
// packages/backend/src/plugins/dai-release.ts

import { createRouter } from '@digital-ai/plugin-dai-release-backend';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';

export default function createPlugin(env: PluginEnvironment): Promise<Router> {
  return createRouter({
    logger: env.logger,
    config: env.config,
    permissions: env.permissions,
  });
}
```

#### 3. Modify your backend router to expose the APIs for release backend.

```ts
// packages/backend/src/index.ts

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

#### 4. Configure the release instance by adding the following to your app-config.yaml files.

The Dai Release plugin requires the following YAML to be added to your `app-config.yaml`:
Dai Release plugin supports Digital-ai Release multi instance integration option.
\*\*\*Note: all values are mandatory, if any of the keys or values not entered application startup will fail

For single instance setup:

```yaml
daiRelease:
  instances:
    - name: { name-of-first-instance } #
      host: { host-of-first-instance } #http://digital-ai-1.release.com:4516
      token: { token-of-first-instance }
```

For multi instance setup:

```yaml
daiRelease:
  instances:
    - name: { name-of-first-instance } #
      host: { host-of-first-instance } #http://digital-ai-1.release.com:4516
      token: { token-of-first-instance }
    - name: { name-of-second-instance }
      host: { host-of-second-instance } #http://digital-ai-2.release.com:4516
      token: { token-of-second-instance }
```

Configuration Details:

- `name` will be used to display in UI for instance choosing
- `host` will be your release application host.
- `token` environment variable must be set, that is your release application api token. Create an account with read permission and use that.

#### 5. Run yarn start-backend from the repo root directory.

#### 6. Finally open http://localhost:7007/api/dai-release/health in a browser and returns {"status":"ok"}.

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

## Permissions

The DAI release plugin supports the [permissions framework](https://backstage.io/docs/permissions/overview), the following sections outline how you can use them with the assumption that you have the permissions framework setup and working.

**Note:** These sections are intended as guidance and are completely optional. The dai-release plugin will work with the permission framework off or on without any specific policy setup.

### Secure Sidebar Option

To use the permission framework to secure the Digital.ai Release sidebar option you'll want to do the following:

1. First we need to add the `@backstage/plugin-dai-release-common` package to your frontend app:

   ```sh
   # From your Backstage root directory
   yarn --cwd packages/app add @backstage/plugin-dai-release-common
   ```

2. Then open the `packages/app/src/components/Root/Root.tsx` file
3. Then add these imports after all the existing import statements:

   ```ts
   import { daiReleaseViewPermission } from '@digital-ai/plugin-dai-release-common';
   import { RequirePermission } from '@backstage/plugin-permission-react';
   ```

4. Then make the following change:

   ```diff
   -   <SidebarItem icon={ReleaseSvgIcon} to="dai-release" text="Digital.ai Release" />
   +   <RequirePermission
   +     permission={daiReleaseViewPermission}
   +     errorPage={<></>}>
   +     <SidebarItem icon={ReleaseSvgIcon} to="dai-release" text="Digital.ai Release" />
   +   </RequirePermission>
   ```

### Secure the dai-release Route

To use the permission framework to secure the dai-release route you'll want to do the following:

1. First we need to add the `@backstage/plugin-dai-release-common` package to your frontend app (skip this step if you've already done this):

   ```sh
   # From your Backstage root directory
   yarn --cwd packages/app add @backstage/plugin-dai-release-common
   ```

2. Then open the `packages/app/src/App.tsx` file
3. The add this import after all the existing import statements:

   ```ts
   import { daiReleaseViewPermission } from '@digital-ai/plugin-dai-release-common';
   ```

4. Then make the following change:

   ```diff
   -   <Route path="/dai-release" element={<DaiReleasePage />} />
   +   <Route path="/dai-release"
   +     element={
   +     <RequirePermission permission={daiReleaseViewPermission}>
   +       <DaiReleasePage/>
   +     </RequirePermission>
   +     }
   +   />
   ```

### Permission Policy

Here is an example permission policy that you might use to secure the Digital.ai Release plugin:

```ts
// packages/backend/src/plugins/permission.ts

class TestPermissionPolicy implements PermissionPolicy {
  async handle(request: PolicyQuery): Promise<PolicyDecision> {
    if (isPermission(request.permission, daiReleaseViewPermission)) {
      if (
        user?.identity.ownershipEntityRefs.includes(
          'group:default/release-admins',
        )
      ) {
        return { result: AuthorizeResult.ALLOW };
      }
      return { result: AuthorizeResult.DENY };
    }

    return { result: AuthorizeResult.ALLOW };
  }
}
```

To use this policy you'll need to make sure to add the `@backstage/plugin-dai-release-common` package to your backend you can do that by running this command:

```sh
# From your Backstage root directory
yarn --cwd packages/backend add @backstage/plugin-dai-release-common
```

You'll also need to add these imports:

```ts
import { daiReleaseViewPermission } from '@digital-ai/plugin-dai-release-common';
```

**Note:** The group "group:default/release-admins" is simply an example and might not exist. You can point this to any group you have in your catalog instead.

## Links

For more information, see [Overview](https://docs.digital.ai/bundle/devops-release-version-v.24.1/page/release/concept/release-backstage-overview.html) and [Adding Release to Your Backstage IDP](https://docs.digital.ai/bundle/devops-release-version-v.24.1/page/release/concept/release-backstage-plugin.html)
