import {
  TemplateGitMetaInfo,
  TemplateList,
  TemplateOverview,
} from '@digital-ai/plugin-dai-release-common';

export const templatesReleaseApiResponse: TemplateOverview[] = [
  {
    id: 'Applications/Folder1/Release1',
    type: 'xlrelease.Release',
    title: 'Configure Release',
    kind: 'RELEASE',
  },
  {
    id: 'Applications/Folder2/Folder2/Folder1/Release2',
    type: 'xlrelease.Release',
    title: 'Welcome release',
    kind: 'RELEASE',
  },
];

export const templateBackendPluginApiResponse: TemplateList = {
  templates: [
    {
      id: 'Applications/Folder1/Release1',
      title: 'Configure Release',
      folder: 'Deploy',
      folderId: 'Applications/Folder1',
      newReleaseRedirectUri:
        'http://localhost/#/releases/create?fromTemplateId=Folder1-Release1',
      titleRedirectUri: 'http://localhost/#/templates/Folder1-Release1',
    },
    {
      id: 'Applications/Folder2/Folder2/Folder1/Release2',
      title: 'Welcome release',
      folder: 'Digital.ai - Official > Workflows > Subfolders',
      folderId: 'Applications/Folder2',
      newReleaseRedirectUri:
        'http://localhost/#/releases/create?fromTemplateId=Folder2-Folder2-Folder1-Release2',
      titleRedirectUri:
        'http://localhost/#/templates/Folder2-Folder2-Folder1-Release2',
    },
  ],
};

export const templateFolderGitConfigResponse = [
  {
    id: 'Applications/Folder1/Release1',
    type: 'git.Repository',
    folderId: 'Applications/Folder1',
    title: 'Configure Release',
    url: 'http://localhost/git/Folder1',
  },
];

export const templateGitCommitVersionResponse = {
  fetched: '1727083176684',
  versions: [
    {
      name: 'Welcome release',
      shortMessage: 'Initial commit',
      commiter: 'John Doe',
      commitTime: 1624545454,
      commitHash: 'a1b2c3d4e5f6',
    },
  ],
};

export const templateGitMetaInfoResponse: TemplateGitMetaInfo = {
  folderId: 'Applications/Folder1',
  url: 'http://localhost/git/Folder1',
  name: 'Welcome release',
  shortMessage: 'Initial commit',
  committer: 'John Doe',
  commitTime: 1624545454,
  commitHash: 'a1b2c3d4e5f6',
};
