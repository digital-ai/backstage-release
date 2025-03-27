## [v0.1.4](https://github.com/digital-ai/backstage-release/tree/dai-release/v0.1.4) (27/03/2025)

### Bug Fixes

- Workflow using DotThemeProvider component which need theme details. 
  So used appThemeApiRef to get active theme name and passed it to DotThemeProvider.

## [v0.1.3](https://github.com/digital-ai/backstage-release/tree/dai-release/v0.1.3) (20/03/2025)

### Bug Fixes

- Filter changes for Templates and Releases

## [v0.1.2](https://github.com/digital-ai/backstage-release/tree/dai-release/v0.1.2) (13/02/2025)

### Library upgrade

- Updated dependencies
  - @backstage/backend-common@^0.25.0
  - @backstage/backend-defaults@^0.7.0
  - @backstage/backend-plugin-api@^1.1.1
  - @backstage/catalog-model@^1.7.3
  - @backstage/config@^1.3.2
  - @backstage/errors@^1.2.7
  - @backstage/plugin-auth-node@^0.5.6
  - @backstage/plugin-permission-common@^0.8.4
  - @backstage/plugin-permission-node@^0.8.7
  - @backstage/backend-test-utils@^1.2.1
  - node-fetch@^3.3.2
  - @backstage/cli@^0.29.6
  - husky@^9.1.7
  - lint-staged@^15.4.3
  - msw@^2.7.0
  - prettier@3.4.2

## [v0.1.2-alpha.2](https://github.com/digital-ai/backstage-release/tree/dai-release/v0.1.2-alpha.2) (10/01/2025)

### Features

- Added a DotDialog popup on clicking "Run workflow" from catalog page.
- The Dialog Box showcases the List of folders in which the workflow execution can be done.
- Once the Folder is selected and When "Run workflow" button is clicked it redirects to release workflow start page.

## [v0.1.2-alpha.1](https://github.com/digital-ai/backstage-release/tree/dai-release/v0.1.2-alpha.1) (06/01/2025)

### Bug Fixes

- Reset the categories and author when there is a change in instances.
- Avoid duplicate calls when there is a change in instances.
- Removed duplicate data.
- Reset the scroll to the top when there is a change in the instances.

## [v0.1.2-alpha.0](https://github.com/digital-ai/backstage-release/tree/dai-release/v0.1.2-alpha.0) (17/12/2024)

### Features

- Listing workflow catalog
- Listing categories
- Permissions feature to view plugin
- Multiple Instance support
- Apply filters based on categories, Authored by, and Search input
- Free text search on title and description

## [v0.1.1](https://github.com/digital-ai/backstage-release/tree/dai-release/v0.1.1) (08/11/2024)

### Library upgrade

- Updated dependencies
  - @backstage/core-components@^0.14.10
  - @backstage/core-plugin-api@^1.9.3
  - @backstage/errors@^1.2.4
  - @backstage/plugin-permission-react@^0.4.25
  - @backstage/theme@^0.5.6
  - @digital-ai/plugin-dai-release-common@0.1.1-alpha.0
  - @emotion/react@^11.13.3
  - @emotion/styled@^11.13.0
  - @material-ui/core@^4.12.4
  - @material-ui/icons@^4.11.3"
  - @mui/material@^6.0.2
  - @mui/styled-engine-sc@^6.0.2
  - @mui/x-date-pickers@^7.16.0
  - @types/lodash@^4.17.7
  - dayjs@^1.11.13
  - react-use@^17.5.1
  - styled-components@^6.1.13

### Features

- Monitor releases templates.
- Link to open template.
- Link to create new release from template that redirect to the release instance.
- Popup to view metadata information.
- Permissions feature to view plugin
- Multiple Instance support
- Apply filters on name and tags.
- Free text search on name and tags.

## [v0.1.1-alpha.0](https://github.com/digital-ai/backstage-release/tree/dai-release/v0.1.1-alpha.0) (18/09/2024)

### Library upgrade

- Updated dependencies
  - @backstage/core-components@^0.14.10
  - @backstage/core-plugin-api@^1.9.3
  - @backstage/errors@^1.2.4
  - @backstage/plugin-permission-react@^0.4.25
  - @backstage/theme@^0.5.6
  - @digital-ai/plugin-dai-release-common@0.1.0-alpha.0
  - @emotion/react@^11.13.3
  - @emotion/styled@^11.13.0
  - @material-ui/core@^4.12.4
  - @material-ui/icons@^4.11.3"
  - @mui/material@^6.0.2
  - @mui/styled-engine-sc@^6.0.2
  - @mui/x-date-pickers@^7.16.0
  - @types/lodash@^4.17.7
  - dayjs@^1.11.13
  - react-use@^17.5.1
  - styled-components@^6.1.13

## [v0.1.0](https://github.com/digital-ai/backstage-release/tree/dai-release/v0.1.0) (11/06/2024)

### Features

- Monitor recent releases
- Link to open release flow
- Permissions feature to view plugin
- Multiple Instance support
- Apply filters on title, status, start and end dates
- Sort releases by start and end dates


