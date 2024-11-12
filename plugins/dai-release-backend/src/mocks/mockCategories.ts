import {
  Categories,
  ReleaseCategories,
} from '@digital-ai/plugin-dai-release-common';

export const categoriesReleaseApiResponse: Categories = {
  totalElements: 6,
  totalPages: 1,
  size: 100,
  number: 0,
  numberOfElements: 6,
  content: [
    {
      id: '3',
      title: 'Application Life Cycle Management',
      active: true,
      associatedWorkflowsCount: 4,
      type: 'xlrelease.Category',
    },
    {
      id: '2',
      title: 'Application onboarding',
      active: true,
      associatedWorkflowsCount: 12,
      type: 'xlrelease.Category',
    },
    {
      id: '4',
      title: 'Cloud & Container',
      active: true,
      associatedWorkflowsCount: 10,
      type: 'xlrelease.Category',
    },
    {
      id: '6',
      title: 'Digital.ai Release runner installation',
      active: true,
      associatedWorkflowsCount: 3,
      type: 'xlrelease.Category',
    },
    {
      id: '1',
      title: 'Infrastructure Service',
      active: true,
      associatedWorkflowsCount: 4,
      type: 'xlrelease.Category',
    },
    {
      id: '5',
      title: 'Serverless',
      active: true,
      associatedWorkflowsCount: 2,
      type: 'xlrelease.Category',
    },
  ],
  first: true,
  last: true,
};

export const categoriesBackendPluginApiResponse: ReleaseCategories = {
  activeCategory: [
    {
      id: '3',
      title: 'Application Life Cycle Management',
    },
    {
      id: '2',
      title: 'Application onboarding',
    },
    {
      id: '4',
      title: 'Cloud & Container',
    },
    {
      id: '6',
      title: 'Digital.ai Release runner installation',
    },
    {
      id: '1',
      title: 'Infrastructure Service',
    },
    {
      id: '5',
      title: 'Serverless',
    },
  ],
};
