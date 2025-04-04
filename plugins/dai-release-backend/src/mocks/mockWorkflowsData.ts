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

export const workflowsBackendResponse = {
  totalElements: 1,
  totalPages: 1,
  workflows: [
    {
      title: 'AWS Lambda setup function with Digital.ai Deploy',
      id: 'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf',
      description:
        'Easily create an application in Digital.ai Deploy that can be deployed to AWS Lambda, including its respective environment and infrastructure setup.',
      logoLink:
        'http://localhost/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf/TemplateLogo519cecd39c99458999a7101b405eb622',
      author: 'Digital.ai',
      folderTitle: 'Digital.ai Deploy',
      categories: [
        'Application onboarding',
        'Application Life Cycle Management',
        'Serverless',
        'Cloud & Container',
      ],
      git: {
        commitId: '059d0a89',
        repoLink:
          'https://github.com/digital-ai/release-content/commit/059d0a89d6f6273a4f21cd437150197896f01920',
      },
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder809a2fcb78964de1bf9a5760413727d0',
    },
  ],
};

export const workflowsResponse = {
  totalElements: 1,
  totalPages: 1,
  size: 10,
  number: 0,
  numberOfElements: 1,
  content: [
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf',
      title: 'AWS Lambda setup function with Digital.ai Deploy',
      description:
        'Easily create an application in Digital.ai Deploy that can be deployed to AWS Lambda, including its respective environment and infrastructure setup.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf/TemplateLogo519cecd39c99458999a7101b405eb622',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: [],
      categories: [
        'Application onboarding',
        'Application Life Cycle Management',
        'Serverless',
        'Cloud & Container',
      ],
      scmTraceabilityData: {
        kind: 'git',
        commit: '059d0a89d6f6273a4f21cd437150197896f01920',
        author: 'Patrick Deisinger',
        date: 1730732523000,
        message:
          "[DigitalAIOfficial/25.1.1] Argo setup app don't send chart in case of git app (#85)",
        remote: 'https://github.com/digital-ai/release-content',
        fileName: 'DigitalAIOfficial/Releasefile.yaml',
      },
      folderId:
        'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878',
      folderTitle: 'Digital.ai Deploy',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder809a2fcb78964de1bf9a5760413727d0',
      executions: 0,
    },
  ],
  first: true,
  last: false,
};

export const workflowsRedirectRequest = {
  templateId:
    'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf',
  releaseTitle: 'AWS Lambda setup function with Digital.ai Deploy',
  folderId:
    'Applications/FolderDefaultReleaseContent/Folder809a2fcb78964de1bf9a5760413727d0',
};

export const workflowsRedirectRequestError = {
  templateId:
    'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/ErrorRelease',
  releaseTitle: 'AWS Lambda setup function with Digital.ai Deploy',
  folderId:
    'Applications/FolderDefaultReleaseContent/Folder809a2fcb78964de1bf9a5760413727d0',
};

export const workflowsTriggerBackendResponse = {
  url: 'http://localhost/#/stepper/FolderDefaultReleaseContent-Folder0a5f467c12cf41ce967092077b2138e5-Folder303182ca1d5443b2b63a0ff04eec5878-Release2bb84833587a48bf8af3943006e1acdf',
};

export const workflowsTriggerResponse = {
  id: 'Applications/FolderDefaultReleaseContent/Folder0a5f467c12cf41ce967092077b2138e5/Folder303182ca1d5443b2b63a0ff04eec5878/Release2bb84833587a48bf8af3943006e1acdf',
};
