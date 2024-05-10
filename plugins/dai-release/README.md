# Digital.ai Release Plugin

   - Welcome to the Digital.ai (Dai) Release plugin for Backstage!
   - With Dai Release Plugin you can monitor all your active releases and view the release flow.

This is a combination of 2 plugins - the frontend and the backend.

### Support Info

The plugin packages and provided steps are tested in the below versions.

Backstage version: <= 1.23.0

Backstage NPM package version: <= 0.5.11

## Setup

The following section helps you add the Digital.ai Release frontend plugin.

### Prerequisites

You need to set up the [Dai Release backend plugin](https://www.npmjs.com/package/@digital-ai/plugin-dai-release-backend) before you move forward with any of these steps.

### Installing and Configuring the Frontend Plugin

   The frontend plugin needs to be added to your application. To do so:

####   1. Run the following command from the Backstage root directory:

```shell
yarn --cwd packages/app add @digital-ai/plugin-dai-release
```
####   2. Add the `DaiReleasePage` extension to your `App.tsx`:

Modify your app routes in `App.tsx` to include the `ReleaseHomePage` component exported from the plugin, for example:

```tsx
// In packages/app/src/App.tsx
import {ReleaseSvgIcon} from '@digital-ai/plugin-dai-release';

const routes = (
     <FlatRoutes>
        {/* ...other routes */}
        <Route path="/dai-release" element={<DaiReleasePage/>}/>
```

####   3. Add Digital.ai Release to your app Sidebar:

```
import {ReleaseSvgIcon} from '@digital-ai/plugin-dai-release';

<SidebarItem icon={ReleaseSvgIcon} to="dai-release" text="Dai Release" />
```

## Links

* [Introduction](https://github.com/digital-ai/backstage-release/wiki/Introduction-%E2%80%90-IDP-&-Backstage) about IDP, Backstage and release plugin features
* Install [Frontend Plugin](https://github.com/digital-ai/backstage-release/wiki/DAI-Release-Plugin-%E2%80%90-Frontend)
* Install [Backend Plugin](https://github.com/digital-ai/backstage-release/wiki/DAI-Release-Plugin-%E2%80%90-Backend)
* Enabling [Permissions](https://github.com/digital-ai/backstage-release/wiki/Enabling-Permissions)
* [Create API key in release](https://github.com/digital-ai/backstage-release/wiki/Using-API-Key-from-Release)
* [Warnings and Error messages](https://github.com/digital-ai/backstage-release/wiki/Warnings-and-Error-Messages)
