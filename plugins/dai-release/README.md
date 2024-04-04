# Digital.ai Release Plugin

## Setup

The following sections will help you get the (Digital.ai) Dai Release plugin setup and running.

### Dai Release Backend

You need to setup the [Dai Release backend plugin](https://github.com/digital-ai/backstage-release/tree/main/plugins/dai-release-backend) before you move forward with any of these steps if you haven't already

### Dai Release - Shows List of Releases

To get the Dai Release to Shows List of Releases you'll need to do the following two steps:

1. First we need to add the `@digital-ai/plugin-dai-release` package to your frontend app:

   ```shell
   # From your Backstage root directory
   yarn --cwd packages/app add @digital-ai/plugin-dai-release
   ```

2. Add the `DaiReleasePage` extension to your `App.tsx`:

Modify your app routes in `App.tsx` to include the `ReleaseHomePage` component exported from the plugin, for example:

```tsx
// In packages/app/src/App.tsx
import {ReleaseSvgIcon} from '@digital-ai/plugin-dai-release';

const routes = (
     <FlatRoutes>
        {/* ...other routes */}
        <Route path="/dai-release" element={<DaiReleasePage/>}/>
```

3. Add Digital.ai Release to your app Sidebar:

```tsx```
   import {ReleaseSvgIcon} from '@digital-ai/plugin-dai-release';

   <SidebarItem icon={ReleaseSvgIcon} to="dai-release" text="Dai Release" />
```