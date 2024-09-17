import {
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
      newReleaseRedirectUri:
        'http://localhost/#/releases/create?fromTemplateId=Folder1-Release1',
      titleRedirectUri: 'http://localhost/#/templates/Folder1-Release1',
    },
    {
      id: 'Applications/Folder2/Folder2/Folder1/Release2',
      title: 'Welcome release',
      folder: 'Digital.ai - Official > Workflows > Subfolders',
      newReleaseRedirectUri:
        'http://localhost/#/releases/create?fromTemplateId=Folder2-Folder2-Folder1-Release2',
      titleRedirectUri:
        'http://localhost/#/templates/Folder2-Folder2-Folder1-Release2',
    },
  ],
};
