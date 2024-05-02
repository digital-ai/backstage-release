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
          'group:default/backstage-admins',
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
import {
    daiReleaseViewPermission
} from "@digital-ai/plugin-dai-release-common";
```

**Note:** The group "group:default/backstage-admins" is simply an example and does not exist. You can point this to any group you have in your catalog instead.
