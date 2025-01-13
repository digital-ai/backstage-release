import {
  Folder,
  FolderBackendResponse,
} from '@digital-ai/plugin-dai-release-common';
import { ConfigReader } from '@backstage/config';

export const config = new ConfigReader({
  daiRelease: {
    instances: [
      {
        name: 'default',
        host: 'http://localhost',
        token: 'rpa_8a2f34b48etoken4daeaef797de8e2e',
      },
    ],
  },
});

export const FoldersListBackendResponse: FolderBackendResponse = {
  folders: [
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
  ],
  totalPages: 0,
  totalElements: 3,
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
