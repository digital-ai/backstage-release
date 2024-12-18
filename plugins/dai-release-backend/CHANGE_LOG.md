# Changelog

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

