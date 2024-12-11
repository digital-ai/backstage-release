import { FolderBackendResponse, WorkflowsList } from '@digital-ai/plugin-dai-release-common';

export const catalogsFromRelease = {
  totalElements: 27,
  totalPages: 2,
  size: 20,
  number: 0,
  numberOfElements: 20,
  content: [
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folderb14ffba6a8f941c9b1aad07c1c847a9f/Release4c6b797f375a423e9712819b4456a96a',
      title: 'AWS Lambda create function using S3 zip file',
      description:
        'Workflow provides the steps that create an AWS Lambda Function using S3 zip file',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folderb14ffba6a8f941c9b1aad07c1c847a9f/Release4c6b797f375a423e9712819b4456a96a/TemplateLogofaf61bdd854e499e9dcbb769948d20ea',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Infrastructure Service'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folderb14ffba6a8f941c9b1aad07c1c847a9f',
      folderTitle: 'AWS',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 2,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder906847393ed04ad8a3a795d759a328ca/Release6de2b29aba51430fb61d9a0540e41a13',
      title: 'AWS Lambda setup function with Digital.ai Deploy',
      description:
        'Easily create an application in Digital.ai Deploy that can be deployed to AWS Lambda, including its respective environment and infrastructure setup.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder906847393ed04ad8a3a795d759a328ca/Release6de2b29aba51430fb61d9a0540e41a13/TemplateLogod2ece7585ae84d1aa986802ba5bab7fc',
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder906847393ed04ad8a3a795d759a328ca',
      folderTitle: 'Digital.ai Deploy',
      allowTargetFolderOverride: true,
      defaultTargetFolder: null,
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Release5cee5a0a483f4700a48d57be1385bf26',
      title: 'AWS SecretsManager create secret',
      description:
        'Easily create secrets in AWS Secrets Manager, which can again be looked up and substituted across Digital.ai Release templates and workflows.\n\nA Secret can be a map of key value pairs or a plain text value.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Release5cee5a0a483f4700a48d57be1385bf26/TemplateLogoa34da24a41814898b820f44a8a39df3c',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Cloud & Container'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa',
      folderTitle: 'Secret Management',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Release5f68cc5416e74949b2aac99f4a355960',
      title: 'AWS SecretsManager delete secret',
      description: 'Easily delete secret entries in AWS Secrets Manager.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Release5f68cc5416e74949b2aac99f4a355960/TemplateLogof8718675148740d8bc58a27b12685182',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Cloud & Container'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa',
      folderTitle: 'Secret Management',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Releasec1670684feb24c44bc0818b55b96d24c',
      title: 'AWS SecretsManager update secret',
      description:
        'Easily update secrets in AWS Secrets Manager, which can be looked up and substituted across Digital.ai Release templates and workflows.\n\nA Secret can be a map of key value pairs or a plain text value.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Releasec1670684feb24c44bc0818b55b96d24c/TemplateLogod46502881c094af18556b5152de6cc7f',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Cloud & Container'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa',
      folderTitle: 'Secret Management',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01/Releasee89b72501fff41eb96abcfc9397ddff3',
      title: 'Argo Rollouts install',
      description: 'Install Argo Rollouts to Kubernetes cluster.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01/Releasee89b72501fff41eb96abcfc9397ddff3/TemplateLogo3702b74e0733456ea496c99362f4e12a',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/png',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Application onboarding'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01',
      folderTitle: 'ArgoCD',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01/Release946218ad987f45738ddbe2ed7c0422b0',
      title: 'ArgoCD install',
      description:
        'Install ArgoCD on Kubernetes cluster for deploying an Application in no time.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01/Release946218ad987f45738ddbe2ed7c0422b0/TemplateLogo954cbb0e8374417a80a37df5e515c021',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/png',
      },
      author: 'Digital.ai',
      tags: [],
      categories: [
        'Application onboarding',
        'Application Life Cycle Management',
        'Infrastructure Service',
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01',
      folderTitle: 'ArgoCD',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01/Release969b62ab6419468aa133ae78297cd672',
      title: 'ArgoCD setup application',
      description:
        'Create an application in ArgoCD that can be deployed to Kubernetes cluster, with initial deployment',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01/Release969b62ab6419468aa133ae78297cd672/TemplateLogo6d4f76a5f7124ae29afeb25392db0f4f',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/png',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Application onboarding'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01',
      folderTitle: 'ArgoCD',
      allowTargetFolderOverride: true,
      defaultTargetFolder: null,
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01/Released5273bc1c09b4b77a2ff74f719be7509',
      title: 'ArgoCD setup deployment server',
      description: 'Create required connections for ArgoCD deployment server',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01/Released5273bc1c09b4b77a2ff74f719be7509/TemplateLogoaa89b380508b45659b67227eb288c676',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: ['deployment server', 'new', 'remote argocd'],
      categories: ['Create Deployment Server'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9b52993c807d4b878a4277cc23bbbc01',
      folderTitle: 'ArgoCD',
      allowTargetFolderOverride: true,
      defaultTargetFolder: null,
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folderfec8529e273b44099c39703373b87d2e/Releasea3027f54a7e948428fa8d828a620447f',
      title: 'Azure Container Registry list images',
      description: 'Lists the images present in an Azure Container Registry.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folderfec8529e273b44099c39703373b87d2e/Releasea3027f54a7e948428fa8d828a620447f/TemplateLogocd91c0520d6d4c15b54baf8b8e9c85ba',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/png',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Infrastructure Service'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folderfec8529e273b44099c39703373b87d2e',
      folderTitle: 'Azure',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Releaseb368db3c503e452d8707bb6e9869feaa',
      title: 'Azure KeyVault create secret',
      description:
        'Easily create secrets in Azure KeyVault, which can again be looked up and substituted across Digital.ai Release templates and workflows.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Releaseb368db3c503e452d8707bb6e9869feaa/TemplateLogo20c6eb4514df4123ae3812f3e1940065',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Cloud & Container'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa',
      folderTitle: 'Secret Management',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Released599842b54b849ed971c08ca806029ce',
      title: 'Azure KeyVault delete secret',
      description: 'Easily delete secret entries from Azure KeyVault.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Released599842b54b849ed971c08ca806029ce/TemplateLogo125c2cace0d44e6eae918d9bb16c89d8',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Cloud & Container'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa',
      folderTitle: 'Secret Management',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Release734df19014814a119feab389d841be6b',
      title: 'Azure KeyVault update secret',
      description:
        'Easily update secrets in Azure KeyVault, which can be looked up and substituted across Digital.ai Release templates and workflows.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa/Release734df19014814a119feab389d841be6b/TemplateLogo77016a7dbbdf402588e012b435a14b71',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Cloud & Container'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder9c589243471d47c4901ecf522ef06ffa',
      folderTitle: 'Secret Management',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder906847393ed04ad8a3a795d759a328ca/Release2d241271942c4593a63470077d77f0b1',
      title: 'Azure setup application with Digital.ai Deploy',
      description:
        'Seamlessly create an application in Digital.ai Deploy that can create Azure resource groups, including its respective environment and infrastructure setup.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder906847393ed04ad8a3a795d759a328ca/Release2d241271942c4593a63470077d77f0b1/TemplateLogo74040e58d7114cf08a53c76af41c6d94',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Application onboarding'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder906847393ed04ad8a3a795d759a328ca',
      folderTitle: 'Digital.ai Deploy',
      allowTargetFolderOverride: true,
      defaultTargetFolder: null,
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder3f2af8d352724f6fa8167ec1138f8840/Release4cc414e52ff244428d00e6dc3749e1ca',
      title: 'CheckmarxOne scan Git repository',
      description:
        'Triggers a CheckmarxOne scan on Git repository, performing SAST and SCA to detect security flaws and vulnerabilities in the code.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder3f2af8d352724f6fa8167ec1138f8840/Release4cc414e52ff244428d00e6dc3749e1ca/TemplateLogo5e7fd054b70f4e5f96c79f46f71c687e',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: [],
      categories: ['Application Life Cycle Management'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder3f2af8d352724f6fa8167ec1138f8840',
      folderTitle: 'CheckmarxOne',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder906847393ed04ad8a3a795d759a328ca/Release6d521c6b176e4a4483e017e4b7c2a4d9',
      title: 'Deploy setup deployment server',
      description: 'Create required connections for Deploy deployment server',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder906847393ed04ad8a3a795d759a328ca/Release6d521c6b176e4a4483e017e4b7c2a4d9/TemplateLogo90cdd90294a34ba8950ecdd64a910465',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'Digital.ai',
      tags: ['remote deploy', 'deployment server', 'new'],
      categories: ['Create Deployment Server'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder906847393ed04ad8a3a795d759a328ca',
      folderTitle: 'Digital.ai Deploy',
      allowTargetFolderOverride: true,
      defaultTargetFolder: null,
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folderc28958f5d9f9442aa0c83c8a6b55efd0/Releaseb901ce8b35884f349aa665f1b02593fa',
      title: 'Digital.ai Release get Change Risk Prediction value',
      description:
        'Allows users to predict the potential risk value associated with a specific project and model.',
      logo: {
        id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folderc28958f5d9f9442aa0c83c8a6b55efd0/Releaseb901ce8b35884f349aa665f1b02593fa/TemplateLogoa2b0fb8dd8124fd18c06f914154c48cf',
        type: 'xlrelease.TemplateLogo',
        contentType: 'image/svg+xml',
      },
      author: 'admin',
      tags: [],
      categories: [],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folderc28958f5d9f9442aa0c83c8a6b55efd0',
      folderTitle: 'CRP',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder01086399e216414f9d13e23baa6e6c9b/Releasefb67da4d58a748fab513ecd223592bff',
      title: 'Digital.ai Release runner additional install in Kubernetes',
      description:
        'Install an additional Digital.ai Release Runner in a Kubernetes cluster. You need a Digital.ai Release Kubernetes container plugin for this option.',
      logo: null,
      author: 'Digital.ai',
      tags: [],
      categories: ['Digital.ai Release runner installation'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder01086399e216414f9d13e23baa6e6c9b',
      folderTitle: 'Release runner',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder01086399e216414f9d13e23baa6e6c9b/Releaseaa17b058dd0543678864675e990116f7',
      title: 'Digital.ai Release runner install in Kubernetes',
      description:
        'Install a Digital.ai Release runner into an existing Kubernetes cluster using the `xl` client.',
      logo: null,
      author: 'Digital.ai',
      tags: [],
      categories: ['Digital.ai Release runner installation'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder01086399e216414f9d13e23baa6e6c9b',
      folderTitle: 'Release runner',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
    {
      id: 'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder01086399e216414f9d13e23baa6e6c9b/Release799f6c2d9ebe4dc89729a897c85f61f6',
      title:
        'Digital.ai Release runner install with Digital.ai Cloud Connector',
      description:
        'Install the Digital.ai Release runner with an embedded Kubernetes cluster using the Digital.ai Cloud Connector. You need a Digital.ai account for this option.',
      logo: null,
      author: 'Digital.ai',
      tags: [],
      categories: ['Digital.ai Release runner installation'],
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
        'Applications/FolderDefaultReleaseContent/Folder6c607131aba3425fb4a0474d29885619/Folder01086399e216414f9d13e23baa6e6c9b',
      folderTitle: 'Release runner',
      allowTargetFolderOverride: true,
      defaultTargetFolder:
        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
      executions: 0,
    },
  ],
  first: true,
  last: false,
};

export const workflowCatalogsList: WorkflowsList = {
  workflows: [
    {
      title: 'AWS Lamba setup function with Digital.ai Deploy',
      id: 'Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folder3aa7f619722240b9aac118502adb48a7/Releasef6c2bb8acb3f4b3892ae36cf3b2f798b',
      description:
        'Easily create an application in Digital.ai Deploy that can be deployed to AWS Lambda, including its respective environment and infrastructure setup.',
      logoLink:
        'http://xl-release-nightly.xebialabs.com:5516/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder22212ee5d12e4f9e875ca69bc0e2285e/Folderb1fde4f828dd4df9bb8afee3232326c5/Release7df72eb833d74d2baf470fb617572115/TemplateLogo88fe866e14844eb79952e3412f4d78a7',
      author: 'Digital.ai',
      folderTitle: 'Digital.ai Deploy',
      categories: [
        'Application onboarding',
        'Application Life Cycle Management',
        'Serverless',
        'Cloud & Container',
      ],
      git: {
        commitId: 'ab542eb5',
        repoLink:
          'https://github.com/Kevin-Daniel-P/release-content/commit/ab542eb5077f0f33c4498873fae7ae91d0a6c355',
      },defaultTargetFolder:
                'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9'
    },
    {
      title: 'AWS Lambda create function using S3 zip file',
      id: 'Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folder1b61caf443eb4e0cb3c172351f745575/Releasef906220571094498bfe4e0e05899888b',
      description:
        'Workflow provides the steps that create an AWS Lambda Function using S3 zip file',
      logoLink:
        'http://xl-release-nightly.xebialabs.com:5516/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder22212ee5d12e4f9e875ca69bc0e2285e/Folderb1fde4f828dd4df9bb8afee3232326c5/Release7df72eb833d74d2baf470fb617572115/TemplateLogo88fe866e14844eb79952e3412f4d78a7',
      author: 'Digital.ai',
      folderTitle: 'AWS',
      categories: ['Infrastructure Service'],
      git: {
        commitId: 'ab542eb5',
        repoLink:
          'https://github.com/Kevin-Daniel-P/release-content/commit/ab542eb5077f0f33c4498873fae7ae91d0a6c355',
      },defaultTargetFolder:
                        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9'
    },
    {
      title: 'AWS SecretsManager create secret',
      id: 'Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folder351ba1113373401f9ebdf4f5cae05242/Release458c80beef4d4373a940167ccdf20ad3',
      description:
        'Easily create secrets in AWS Secrets Manager, which can again be looked up and substituted across Digital.ai Release templates and workflows.\n\nA Secret can be a map of key value pairs or a plain text value.',
      logoLink:
        'http://xl-release-nightly.xebialabs.com:5516/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder22212ee5d12e4f9e875ca69bc0e2285e/Folderb1fde4f828dd4df9bb8afee3232326c5/Release7df72eb833d74d2baf470fb617572115/TemplateLogo88fe866e14844eb79952e3412f4d78a7',
      author: 'Digital.ai',
      folderTitle: 'Secret Management',
      categories: ['Cloud & Container'],
      git: {
        commitId: 'ab542eb5',
        repoLink:
          'https://github.com/Kevin-Daniel-P/release-content/commit/ab542eb5077f0f33c4498873fae7ae91d0a6c355',
      },defaultTargetFolder:
                        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9'
    },
    {
      title: 'AWS SecretsManager delete secret',
      id: 'Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folder351ba1113373401f9ebdf4f5cae05242/Releasedef83876fabe4c88bcbcbdb536e9446d',
      description: 'Easily delete secret entries in AWS Secrets Manager.',
      logoLink:
        'http://localhost:5516/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folder351ba1113373401f9ebdf4f5cae05242/Releasedef83876fabe4c88bcbcbdb536e9446d/TemplateLogoa24bef9c81bc4f7088ce842c566381ce',
      author: 'Digital.ai',
      folderTitle: 'Secret Management',
      categories: ['Cloud & Container'],
      git: {
        commitId: 'ab542eb5',
        repoLink:
          'https://github.com/Kevin-Daniel-P/release-content/commit/ab542eb5077f0f33c4498873fae7ae91d0a6c355',
      },defaultTargetFolder:
                        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9'
    },
    {
      title: 'AWS SecretsManager update secret',
      id: 'Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folder351ba1113373401f9ebdf4f5cae05242/Release870173593abf416f93922a389cb4ec27',
      description:
        'Easily update secrets in AWS Secrets Manager, which can be looked up and substituted across Digital.ai Release templates and workflows.\n\nA Secret can be a map of key value pairs or a plain text value.',
      logoLink:
        'http://localhost:5516/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folder351ba1113373401f9ebdf4f5cae05242/Release870173593abf416f93922a389cb4ec27/TemplateLogo4da1bde526854f2c9eecc03596fb982e',
      author: 'Digital.ai',
      folderTitle: 'Secret Management',
      categories: ['Cloud & Container'],
      git: {
        commitId: 'ab542eb5',
        repoLink:
          'https://github.com/Kevin-Daniel-P/release-content/commit/ab542eb5077f0f33c4498873fae7ae91d0a6c355',
      },defaultTargetFolder:
                        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9'
    },
    {
      title: 'Argo Rollouts install',
      id: 'Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folderc85572c8de294edb9538539539319b75/Release3f5811d4df0449b5971e8fd077b5f1ac',
      description: 'Install Argo Rollouts to Kubernetes cluster.',
      logoLink:
        'http://localhost:5516/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folderc85572c8de294edb9538539539319b75/Release3f5811d4df0449b5971e8fd077b5f1ac/TemplateLogob5e84a3e872e4713afadd70cd0ba9cad',
      author: 'Digital.ai',
      folderTitle: 'ArgoCD',
      categories: ['Application onboarding'],
      git: {
        commitId: 'ab542eb5',
        repoLink:
          'https://github.com/Kevin-Daniel-P/release-content/commit/ab542eb5077f0f33c4498873fae7ae91d0a6c355',
      },defaultTargetFolder:
                        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9'
    },
    {
      title: 'ArgoCD delete application',
      id: 'Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folderc85572c8de294edb9538539539319b75/Releasea8a675e4fbba46f9b08fd4bad10bc410',
      description: 'Delete Application in ArgoCD.',
      logoLink:
        'http://localhost:5516/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folderc85572c8de294edb9538539539319b75/Releasea8a675e4fbba46f9b08fd4bad10bc410/TemplateLogo87aed9d88efe40e4b7cb812a375a7e7e',
      author: 'Digital.ai',
      folderTitle: 'ArgoCD',
      categories: ['Application onboarding'],
      git: {
        commitId: 'ab542eb5',
        repoLink:
          'https://github.com/Kevin-Daniel-P/release-content/commit/ab542eb5077f0f33c4498873fae7ae91d0a6c355',
      },defaultTargetFolder:
                        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9'
    },
    {
      title: 'ArgoCD delete live deployment configuration',
      id: 'Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folderc85572c8de294edb9538539539319b75/Release44b03bb9f24649a7a1d0d7f365161103',
      description: 'Delete ArgoCD live deployment configuration',
      logoLink:
        'http://localhost:5516/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folderc85572c8de294edb9538539539319b75/Release44b03bb9f24649a7a1d0d7f365161103/TemplateLogo6c0a3bec70e44c7397c626e2d9469e80',
      author: 'Digital.ai',
      folderTitle: 'ArgoCD',
      categories: ['Application onboarding'],
      git: {
        commitId: 'ab542eb5',
        repoLink:
          'https://github.com/Kevin-Daniel-P/release-content/commit/ab542eb5077f0f33c4498873fae7ae91d0a6c355',
      },defaultTargetFolder:
                        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9'
    },
    {
      title: 'ArgoCD install',
      id: 'Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folderc85572c8de294edb9538539539319b75/Releasef877a7d2d9b0485ba728ee6e74611d0a',
      description:
        'Install ArgoCD on Kubernetes cluster for deploying an Application in no time.',
      logoLink:
        'http://localhost:5516/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folderc85572c8de294edb9538539539319b75/Releasef877a7d2d9b0485ba728ee6e74611d0a/TemplateLogo9cd9ce8c3b5c46a9a274c2b32de047e3',
      author: 'Digital.ai',
      folderTitle: 'ArgoCD',
      categories: [
        'Application onboarding',
        'Application Life Cycle Management',
        'Infrastructure Service',
      ],
      git: {
        commitId: 'ab542eb5',
        repoLink:
          'https://github.com/Kevin-Daniel-P/release-content/commit/ab542eb5077f0f33c4498873fae7ae91d0a6c355',
      },defaultTargetFolder:
                        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9'
    },
    {
      title: 'ArgoCD setup application',
      id: 'Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folderc85572c8de294edb9538539539319b75/Release027df3eaa5234739800fad96049664a9',
      description:
        'Create an application in ArgoCD that can be deployed to Kubernetes cluster, with initial deployment',
      logoLink:
        'http://localhost:5516/api/v1/templates/logo/Applications/FolderDefaultReleaseContent/Folder4a343064f8df4d1196e99144b4f43ae6/Folderc85572c8de294edb9538539539319b75/Release027df3eaa5234739800fad96049664a9/TemplateLogoc3e7331166d4496baf22b87c673307bc',
      author: 'Digital.ai',
      folderTitle: 'ArgoCD',
      categories: ['Application onboarding'],
      git: {
        commitId: 'ab542eb5',
        repoLink:
          'https://github.com/Kevin-Daniel-P/release-content/commit/ab542eb5077f0f33c4498873fae7ae91d0a6c355',
      },defaultTargetFolder:
                        'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9'
    },
  ],
  totalPages: 4,
  totalElements: 33,
};

export const FoldersListBackendResponse: FolderBackendResponse = {
  folders: [
             {
               id: "Applications/FolderDefaultReleaseContent",
               type: "xlrelease.Folder",
               $token: "f519ae1e-2ef7-4186-9931-58e87ce0fc02",
               title: "Digital.ai - Official",
               children: [
                 {
                   id: "Applications/FolderDefaultReleaseContent/Foldereff63691391142ae8fbc0e0ef76eb6c5",
                   type: "xlrelease.Folder",
                   $token: "091af4bc-6ada-491e-ae25-58d19f28b236",
                   title: "Workflow Executions",
                   children: [],
                   $metadata: {
                     security: {
                       permissions: ["folder#view", "folder#edit"],
                       teams: [],
                     },
                   },
                 },
                 {
                   id: "Applications/FolderDefaultReleaseContent/Folderd570ac729e164bd6af7ab446701a4654",
                   type: "xlrelease.Folder",
                   $token: "f48de376-d9e1-400d-95e4-d6524b8bcce5",
                   title: "Workflows",
                   children: [
                     {
                       id: "Applications/FolderDefaultReleaseContent/Folderd570ac729e164bd6af7ab446701a4654/Folder51151a266d4d4d71bd1b466675626ab5",
                       type: "xlrelease.Folder",
                       $token: "70ea13e1-8215-4615-8ca8-d1e9d30b802b",
                       title: "Digital.ai Deploy",
                       children: [],
                       $metadata: {
                         security: {
                           permissions: ["folder#view", "folder#edit"],
                           teams: [],
                         },
                       },
                     },
                     // More children items here...
                   ],
                   $metadata: {
                     security: {
                       permissions: ["folder#view", "folder#edit"],
                       teams: [],
                     },
                   },
                 },
                 // More children items here...
               ],
               $metadata: {
                 security: {
                   permissions: ["folder#view", "folder#edit"],
                   teams: [],
                 },
               },
             },
             {
               id: "Applications/FolderSamplesAndTutorials",
               type: "xlrelease.Folder",
               $token: "df7aa5b1-5473-4e69-a4f2-7a5d5b6b5db3",
               title: "Samples & Tutorials",
               children: [
                 {
                   id: "Applications/FolderSamplesAndTutorials/Folder1556f05e631c48b2b0d935c6a9f8560d",
                   type: "xlrelease.Folder",
                   $token: "e56d8275-8f39-4c19-bb54-2c7d853088fd",
                   title: "Workspace 2",
                   children: [],
                   $metadata: {
                     security: {
                       permissions: ["folder#view", "folder#edit"],
                       teams: [],
                     },
                   },
                 },
                 {
                   id: "Applications/FolderSamplesAndTutorials/Folder2336b7ded4c247df916af3c12a3a4d0e",
                   type: "xlrelease.Folder",
                   $token: "f84e28b4-fb61-4634-b110-bcbb3c7de93d",
                   title: "Worspace 1",
                   children: [],
                   $metadata: {
                     security: {
                       permissions: ["folder#view", "folder#edit"],
                       teams: [],
                     },
                   },
                 },
               ],
               $metadata: {
                 security: {
                   permissions: ["folder#view", "folder#edit"],
                   teams: [],
                 },
               },
             },
           ]
,
  totalPages: 0,
  totalElements: 3,
};
