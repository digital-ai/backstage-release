# Digital.ai Release Plugin

- Welcome to the Digital.ai (Dai) Release plugin for Backstage!
- With Dai Release Plugin you can monitor all your active releases and view the release flow.

This is a combination of 2 plugins - the frontend and the backend.

## Setup

The following section helps you add the Digital.ai Release frontend plugin.

### Prerequisites

You need to set up the [Dai Release backend plugin](https://www.npmjs.com/package/@digital-ai/plugin-dai-release-backend) before you move forward with any of these steps.

### Installing and Configuring the Frontend Plugin

The frontend plugin needs to be added to your application. To do so:

#### 1. Run the following command from the Backstage root directory:

```shell
yarn --cwd packages/app add @digital-ai/plugin-dai-release
```

#### 2. Add Active Releases to your Backstage::

##### a. Add the `DaiReleasePage` extension to your `App.tsx`:

Modify your app routes in `App.tsx` to include the `ReleaseHomePage` component exported from the plugin, for example:

```tsx
// In packages/app/src/App.tsx
import {DaiReleasePage} from '@digital-ai/plugin-dai-release';

const routes = (
     <FlatRoutes>
        {/* ...other routes */}
        <Route path="/dai-release" element={<DaiReleasePage/>}/>
```

##### b. Add Digital.ai Release to your app Sidebar:

```
import {ReleaseSvgIcon} from '@digital-ai/plugin-dai-release';

<SidebarItem icon={ReleaseSvgIcon} to="dai-release" text="Dai Release" />
```

#### 3. Add Release Template to your Backstage::

##### a. Add the `DaiTemplatePage` extension to your `App.tsx`:

Modify your app routes in `App.tsx` to include the `ReleaseHomePage` component exported from the plugin, for example:

```tsx
// In packages/app/src/App.tsx
import {DaiTemplatePage} from '@digital-ai/plugin-dai-release';

const routes = (
     <FlatRoutes>
        {/* ...other routes */}
        <Route path="/dai-template" element={<DaiTemplatePage/>}/>
```

##### b. Add Digital.ai Release to your app Sidebar:

```
import {ReleaseSvgIcon} from '@digital-ai/plugin-dai-release';

<SidebarItem icon={ReleaseSvgIcon} to="dai-template" text="Dai Release Template" />
```

## Links

For more information, see [Overview](https://docs.digital.ai/bundle/devops-release-version-v.24.1/page/release/concept/release-backstage-overview.html) and [Adding Release to Your Backstage IDP](https://docs.digital.ai/bundle/devops-release-version-v.24.1/page/release/concept/release-backstage-plugin.html)
