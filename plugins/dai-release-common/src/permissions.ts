import { createPermission } from '@backstage/plugin-permission-common';

/**
 * This permission is used to determine if a user is allowed to view the deploy plugin
 *
 * @public
 */
export const daiReleaseViewPermission = createPermission({
  name: 'daiRelease.view',
  attributes: {
    action: 'read',
  },
});

/**
 * @public
 */
export const daiReleasePermissions = [daiReleaseViewPermission];
