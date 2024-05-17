import {
  Folder,
  ReleaseCountResults,
  ReleaseFallBackOverview,
  ReleaseList,
  ReleaseOverview,
} from '@digital-ai/plugin-dai-release-common';
import { ConfigReader } from '@backstage/config';

export const config = new ConfigReader({
  daiRelease: {
    host: 'http://localhost',
    token: 'rpa_8a2f34b48etoken4daeaef797de8e2e',
  },
});

export const configWithEmptyHost = new ConfigReader({
  daiRelease: {
    host: '',
    token: 'rpa_8a2f34b48etoken4daeaef797de8e2e',
  },
});

export const configWithEmptyToken = new ConfigReader({
  daiRelease: {
    host: 'http://localhost',
    token: '',
  },
});

export const configWithMissingToken = new ConfigReader({
  daiRelease: {
    host: 'http://localhost',
  },
});

export const releasesOverviewReleaseApiResponse: ReleaseOverview[] = [
  {
    id: 'Applications/Folder1/Release1',
    type: 'xlrelease.Release',
    title: 'Configure Release',
    startDate: 1710827481135,
    endDate: 1711468820908,
    status: 'PLANNED',
    kind: 'RELEASE',
  },
  {
    id: 'Applications/Folder2/Folder2/Folder1/Release2',
    type: 'xlrelease.Release',
    title: 'Welcome release',
    startDate: 1710940430763,
    endDate: 1711555250637,
    status: 'IN_PROGRESS',
    kind: 'RELEASE',
  },
];

export const releasesOverviewFallbackReleaseApiResponse: ReleaseFallBackOverview[] =
  [
    {
      id: 'Applications/Folder1/Release1',
      type: 'xlrelease.Release',
      title: 'Configure Release',
      dueDate: '2024-05-22T17:00:58.698Z',
      startDate: '2024-05-15T09:06:14.388Z',
      status: 'PLANNED',
      kind: 'RELEASE',
    },
    {
      id: 'Applications/Folder2/Folder2/Folder1/Release2',
      type: 'xlrelease.Release',
      title: 'Welcome release',
      dueDate: '2024-05-22T17:00:14.703Z',
      startDate: '2024-05-15T09:06:14.934Z',
      status: 'IN_PROGRESS',
      kind: 'RELEASE',
    },
  ];

export const releasesCountReleaseApiResponse: ReleaseCountResults = {
  live: {
    total: 2,
    byStatus: {
      IN_PROGRESS: 1,
      PLANNED: 1,
    },
  },
  archived: {
    total: 0,
    byStatus: {},
  },
  all: {
    total: 2,
    byStatus: {
      IN_PROGRESS: 1,
      PLANNED: 1,
    },
  },
};

export const folderListReleaseApiResponse: Folder[] = [
  {
    id: 'Applications/Folder1',
    type: 'xlrelease.Folder',
    $token: 'cd1becd7-5ef0-4153-bd2d-43a82730ab1b',
    title: 'Deploy',
    children: [],
    $metadata: {
      security: {
        permissions: ['folder#view', 'folder#edit'],
        teams: [],
      },
    },
  },
  {
    id: 'Applications/Folder2',
    type: 'xlrelease.Folder',
    $token: '50e33bd1-2423-4759-b2ca-1b524c084a9e',
    title: 'Digital.ai - Official',
    children: [
      {
        id: 'Applications/Folder2/Folder1',
        type: 'xlrelease.Folder',
        $token: '348c5241-7ecd-49ee-8759-6a201a8e5301',
        title: 'Workflow Executions',
        children: [],
        $metadata: {
          security: {
            permissions: ['folder#view', 'folder#edit'],
            teams: [],
          },
        },
      },
      {
        id: 'Applications/Folder2/Folder2',
        type: 'xlrelease.Folder',
        $token: '04bc1d20-8792-4906-a576-5e30412a8cda',
        title: 'Workflows',
        children: [
          {
            id: 'Applications/Folder2/Folder2/Folder1',
            type: 'xlrelease.Folder',
            $token: 'c279199d-9a58-446c-973d-788e56bc57c0',
            title: 'Subfolders',
            children: [],
            $metadata: {
              security: {
                permissions: ['folder#view', 'folder#edit'],
                teams: [],
              },
            },
          },
        ],
        $metadata: {
          security: {
            permissions: ['folder#view', 'folder#edit'],
            teams: [],
          },
        },
      },
    ],
    $metadata: {
      security: {
        permissions: ['folder#view', 'folder#edit'],
        teams: [],
      },
    },
  },
  {
    id: 'Applications/Folder3',
    type: 'xlrelease.Folder',
    $token: '4882d267-69f7-4bf4-9e6e-e1ff28ab42d9',
    title: 'Samples & Tutorials',
    children: [
      {
        id: 'Applications/Folder3/Folder1',
        type: 'xlrelease.Folder',
        $token: '79141a73-78f8-47f3-9e4c-97062330e9b2',
        title: 'Inner folder',
        children: [],
        $metadata: {
          security: {
            permissions: ['folder#view', 'folder#edit'],
            teams: [],
          },
        },
      },
    ],
    $metadata: {
      security: {
        permissions: ['folder#view', 'folder#edit'],
        teams: [],
      },
    },
  },
];

export const releasesBackendApiResponse: ReleaseList = {
  total: 2,
  releases: [
    {
      id: 'Applications/Folder1/Release1',
      title: 'Configure Release',
      folder: 'Deploy',
      status: 'PLANNED',
      fromDate: 1710827481135,
      endDate: 1711468820908,
      releaseRedirectUri: 'http://localhost/#/releases/Folder1-Release1',
    },
    {
      id: 'Applications/Folder2/Folder2/Folder1/Release2',
      title: 'Welcome release',
      folder: 'Digital.ai - Official > Workflows > Subfolders',
      status: 'IN_PROGRESS',
      fromDate: 1710940430763,
      endDate: 1711555250637,
      releaseRedirectUri:
        'http://localhost/#/releases/Folder2-Folder2-Folder1-Release2',
    },
  ],
};

export const releasesFallbackBackendApiResponse: ReleaseList = {
  total: 2,
  releases: [
    {
      id: 'Applications/Folder1/Release1',
      title: 'Configure Release',
      folder: 'Deploy',
      status: 'PLANNED',
      fromDate: 1715763974388,
      endDate: 1716397258698,
      releaseRedirectUri: 'http://localhost/#/releases/Folder1-Release1',
    },
    {
      id: 'Applications/Folder2/Folder2/Folder1/Release2',
      title: 'Welcome release',
      folder: 'Digital.ai - Official > Workflows > Subfolders',
      status: 'IN_PROGRESS',
      fromDate: 1715763974934,
      endDate: 1716397214703,
      releaseRedirectUri:
        'http://localhost/#/releases/Folder2-Folder2-Folder1-Release2',
    },
  ],
};
