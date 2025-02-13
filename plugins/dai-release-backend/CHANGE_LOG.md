# Changelog

## [v0.1.2](https://github.com/digital-ai/backstage-release/tree/dai-release-backend/v0.1.2) (13/02/2025)

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
  - @digital-ai/plugin-dai-release-common@0.1.2
  - @types/express@^5.0.0
  - express@^4.21.2
  - node-fetch@^3.3.2
  - @backstage/cli@^0.29.6
  - husky@^9.1.7
  - lint-staged@^15.4.3
  - msw@^2.7.0
  - prettier@3.4.2

## [v0.1.2-alpha.2](https://github.com/digital-ai/backstage-release/tree/dai-release-backend/v0.1.2-alpha.2) (10/01/2025)

### Features

- API to get release workflow folders
- API to get release workflow redirect url for workflow execution
- Added new field "defaultTargetFolder" in the list workflows API

## [v0.1.2-alpha.1](https://github.com/digital-ai/backstage-release/tree/dai-release-backend/v0.1.2-alpha.1) (06/01/2025)

### Bug Fixes

- Fix the exception in the backend API when the data returned from the release doesn't have a commit ID.

## [v0.1.2-alpha.0](https://github.com/digital-ai/backstage-release/tree/dai-release-backend/v0.1.2-alpha.0) (17/12/2024)

### Features

- API to get release workflow catalog.
- API to get configured release instances.
- API to get release categories
- Support for DAI release 23.3, 24.1 and 24.3 versions.
- Permissions feature to access backend API's
- Backend API support to apply filters on categories, authored by, and search input.

## [v0.1.1](https://github.com/digital-ai/backstage-release/tree/dai-release-backend/v0.1.1) (08/11/2024)

### Library upgrade

- Replaced winston logger with LoggerService
- Replaced PermissionEvaluator to PermissionService
- Removed permission support for old backend system
- Updated dependencies
  - @backstage/backend-common@^0.24.1
  - @backstage/backend-defaults@^0.4.4
  - @backstage/backend-plugin-api@^0.8.1
  - @backstage/catalog-model@^1.6.0
  - @backstage/config@^1.2.0
  - @backstage/errors@^1.2.4
  - @backstage/plugin-auth-node@^0.5.1
  - @backstage/plugin-permission-common@^0.8.1
  - @backstage/plugin-permission-node@^0.8.2
  - @backstage/backend-test-utils@^0.5.1
  - @digital-ai/plugin-dai-release-common@0.1.1-alpha.0
  - express@^4.19.2
  - express-promise-router@^4.1.1
  - node-fetch@^2.7.0
  - yn@^5.0.0

### Features

- API to get release templates.
- API to get configured release instances.
- API to get metadata information based on folder for each templates.
- Support for DAI release 23.1, 23.3 and 24.1 versions.
- Permissions feature to access backend API's
- Backend API support to apply filters on name and tags.

## [v0.1.1-alpha.0](https://github.com/digital-ai/backstage-release/tree/dai-release-backend/v0.1.1-alpha.0) (18/09/2024)

### Library upgrade

- Replaced winston logger with LoggerService
- Replaced PermissionEvaluator to PermissionService
- Removed permission support for old backend system
- Updated dependencies
  - @backstage/backend-common@^0.24.1
  - @backstage/backend-defaults@^0.4.4
  - @backstage/backend-plugin-api@^0.8.1
  - @backstage/catalog-model@^1.6.0
  - @backstage/config@^1.2.0
  - @backstage/errors@^1.2.4
  - @backstage/plugin-auth-node@^0.5.1
  - @backstage/plugin-permission-common@^0.8.1
  - @backstage/plugin-permission-node@^0.8.2
  - @backstage/backend-test-utils@^0.5.1
  - @digital-ai/plugin-dai-release-common@0.1.1-alpha.0
  - express@^4.19.2
  - express-promise-router@^4.1.1
  - node-fetch@^2.7.0
  - yn@^5.0.0

## [v0.1.0](https://github.com/digital-ai/backstage-release/tree/dai-release-backend/v0.1.0) (11/06/2024)

### Features

- API to get recent releases
- API to get configured release instances
- Support for DAI release 23.1, 23.3 and 24.1 versions
- Permissions feature to access backend API's
- Backend API support to apply filters on title, status, start and end dates

