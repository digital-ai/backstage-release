import {
  TemplateGitMetaInfo,
  TemplateList,
} from '@digital-ai/plugin-dai-release-common';

export const templates = {
  page: 1,
  cis: [
    {
      id: 'FolderSamplesAndTutorials-ReleaseTemplate_configure',
      type: 'xlrelease.Release',
      status: 'TEMPLATE',
      kind: 'RELEASE',
      title: 'Configure Release',
      plannedDuration: 0,
      securityUid: 9,
      security: {
        permissions: [
          'release#edit_precondition',
          'release#edit',
          'template#edit',
          'workflow#view_execution',
          'workflow#abort_execution',
          'release#edit_security',
          'group#view',
          'release#lock_task',
          'app_pipelines#edit',
          'delivery_pattern#view',
          'template#create_release_other_folder',
          'group#edit',
          'template#lock_task',
          'folder#generate_configuration',
          'release#task_transition',
          'delivery_pattern#edit',
          'trigger#view_trigger',
          'app_pipelines#view',
          'release#edit_task_input_output_properties',
          'release#edit_task_tags',
          'folder#view_versions',
          'trigger#edit_trigger',
          'folder#apply_changes',
          'release#view',
          'folder#edit_notifications',
          'delivery#view',
          'release#edit_blackout',
          'release#edit_failure_handler',
          'template#edit_precondition',
          'folder#edit',
          'release#abort',
          'template#edit_failure_handler',
          'folder#edit_variables',
          'folder#edit_configuration',
          'release#advance_task_transition',
          'folder#edit_versions',
          'release#restart_phase',
          'folder#view',
          'release#edit_task_script',
          'release#edit_task_flag',
          'release#edit_task_configuration_facet',
          'release#edit_task_dates',
          'dashboard#view',
          'workflow#start_execution',
          'release#edit_task',
          'release#edit_task_attachments',
          'release#reassign_task',
          'delivery#edit',
          'template#edit_security',
          'template#create_release',
          'release#edit_task_description',
          'delivery#edit_tracked_item',
          'release#start',
          'template#view',
          'template#edit_triggers',
          'dashboard#edit',
          'folder#edit_security',
        ],
        teams: [
          'QA',
          'Template Owner',
          'Release Manager',
          'Release Admin',
          'Folder Owner',
        ],
      },
      $scmTraceabilityDataId: 0,
    },
    {
      id: 'FolderSamplesAndTutorials-ReleaseTemplate_blue_green_deployment',
      type: 'xlrelease.Release',
      status: 'TEMPLATE',
      kind: 'RELEASE',
      title: 'Deployment pattern: Blue / Green',
      plannedDuration: 0,
      securityUid: 9,
      security: {
        permissions: [
          'release#edit_precondition',
          'release#edit',
          'template#edit',
          'workflow#view_execution',
          'workflow#abort_execution',
          'release#edit_security',
          'group#view',
          'release#lock_task',
          'app_pipelines#edit',
          'delivery_pattern#view',
          'template#create_release_other_folder',
          'group#edit',
          'template#lock_task',
          'folder#generate_configuration',
          'release#task_transition',
          'delivery_pattern#edit',
          'trigger#view_trigger',
          'app_pipelines#view',
          'release#edit_task_input_output_properties',
          'release#edit_task_tags',
          'folder#view_versions',
          'trigger#edit_trigger',
          'folder#apply_changes',
          'release#view',
          'folder#edit_notifications',
          'delivery#view',
          'release#edit_blackout',
          'release#edit_failure_handler',
          'template#edit_precondition',
          'folder#edit',
          'release#abort',
          'template#edit_failure_handler',
          'folder#edit_variables',
          'folder#edit_configuration',
          'release#advance_task_transition',
          'folder#edit_versions',
          'release#restart_phase',
          'folder#view',
          'release#edit_task_script',
          'release#edit_task_flag',
          'release#edit_task_configuration_facet',
          'release#edit_task_dates',
          'dashboard#view',
          'workflow#start_execution',
          'release#edit_task',
          'release#edit_task_attachments',
          'release#reassign_task',
          'delivery#edit',
          'template#edit_security',
          'template#create_release',
          'release#edit_task_description',
          'delivery#edit_tracked_item',
          'release#start',
          'template#view',
          'template#edit_triggers',
          'dashboard#edit',
          'folder#edit_security',
        ],
        teams: [
          'QA',
          'Template Owner',
          'Release Manager',
          'Release Admin',
          'Folder Owner',
        ],
      },
      $scmTraceabilityDataId: 0,
    },
    {
      id: 'FolderSamplesAndTutorials-ReleaseTemplate_canary_deployment',
      type: 'xlrelease.Release',
      status: 'TEMPLATE',
      kind: 'RELEASE',
      title: 'Deployment pattern: Canary Release',
      plannedDuration: 0,
      securityUid: 9,
      security: {
        permissions: [
          'release#edit_precondition',
          'release#edit',
          'template#edit',
          'workflow#view_execution',
          'workflow#abort_execution',
          'release#edit_security',
          'group#view',
          'release#lock_task',
          'app_pipelines#edit',
          'delivery_pattern#view',
          'template#create_release_other_folder',
          'group#edit',
          'template#lock_task',
          'folder#generate_configuration',
          'release#task_transition',
          'delivery_pattern#edit',
          'trigger#view_trigger',
          'app_pipelines#view',
          'release#edit_task_input_output_properties',
          'release#edit_task_tags',
          'folder#view_versions',
          'trigger#edit_trigger',
          'folder#apply_changes',
          'release#view',
          'folder#edit_notifications',
          'delivery#view',
          'release#edit_blackout',
          'release#edit_failure_handler',
          'template#edit_precondition',
          'folder#edit',
          'release#abort',
          'template#edit_failure_handler',
          'folder#edit_variables',
          'folder#edit_configuration',
          'release#advance_task_transition',
          'folder#edit_versions',
          'release#restart_phase',
          'folder#view',
          'release#edit_task_script',
          'release#edit_task_flag',
          'release#edit_task_configuration_facet',
          'release#edit_task_dates',
          'dashboard#view',
          'workflow#start_execution',
          'release#edit_task',
          'release#edit_task_attachments',
          'release#reassign_task',
          'delivery#edit',
          'template#edit_security',
          'template#create_release',
          'release#edit_task_description',
          'delivery#edit_tracked_item',
          'release#start',
          'template#view',
          'template#edit_triggers',
          'dashboard#edit',
          'folder#edit_security',
        ],
        teams: [
          'QA',
          'Template Owner',
          'Release Manager',
          'Release Admin',
          'Folder Owner',
        ],
      },
      $scmTraceabilityDataId: 0,
    },
    {
      id: 'FolderDefaultReleaseContent-Folderb25ccf9d9fad4f0ba3e93065ff93826d-Folder01de981ab5e94f989d9fb85bcec83e3e-Releasebd40e27fcc3644abb798bf4f68628f3d',
      type: 'xlrelease.Release',
      status: 'TEMPLATE',
      kind: 'RELEASE',
      title: 'Financial Institution Governance Pipeline',
      plannedDuration: 0,
      securityUid: 13,
      security: {
        permissions: [],
        teams: [],
      },
      $scmTraceabilityDataId: 1,
    },
    {
      id: 'FolderSamplesAndTutorials-ReleaseTemplate_tour',
      type: 'xlrelease.Release',
      status: 'TEMPLATE',
      kind: 'RELEASE',
      title: 'Guided Tour for Release Managers',
      plannedDuration: 0,
      securityUid: 9,
      security: {
        permissions: [
          'release#edit_precondition',
          'release#edit',
          'template#edit',
          'workflow#view_execution',
          'workflow#abort_execution',
          'release#edit_security',
          'group#view',
          'release#lock_task',
          'app_pipelines#edit',
          'delivery_pattern#view',
          'template#create_release_other_folder',
          'group#edit',
          'template#lock_task',
          'folder#generate_configuration',
          'release#task_transition',
          'delivery_pattern#edit',
          'trigger#view_trigger',
          'app_pipelines#view',
          'release#edit_task_input_output_properties',
          'release#edit_task_tags',
          'folder#view_versions',
          'trigger#edit_trigger',
          'folder#apply_changes',
          'release#view',
          'folder#edit_notifications',
          'delivery#view',
          'release#edit_blackout',
          'release#edit_failure_handler',
          'template#edit_precondition',
          'folder#edit',
          'release#abort',
          'template#edit_failure_handler',
          'folder#edit_variables',
          'folder#edit_configuration',
          'release#advance_task_transition',
          'folder#edit_versions',
          'release#restart_phase',
          'folder#view',
          'release#edit_task_script',
          'release#edit_task_flag',
          'release#edit_task_configuration_facet',
          'release#edit_task_dates',
          'dashboard#view',
          'workflow#start_execution',
          'release#edit_task',
          'release#edit_task_attachments',
          'release#reassign_task',
          'delivery#edit',
          'template#edit_security',
          'template#create_release',
          'release#edit_task_description',
          'delivery#edit_tracked_item',
          'release#start',
          'template#view',
          'template#edit_triggers',
          'dashboard#edit',
          'folder#edit_security',
        ],
        teams: [
          'QA',
          'Template Owner',
          'Release Manager',
          'Release Admin',
          'Folder Owner',
        ],
      },
      $scmTraceabilityDataId: 0,
    },
    {
      id: 'FolderSamplesAndTutorials-ReleaseTemplate_sample',
      type: 'xlrelease.Release',
      status: 'TEMPLATE',
      kind: 'RELEASE',
      title: 'Sample Release Template',
      plannedDuration: 0,
      securityUid: 9,
      security: {
        permissions: [
          'release#edit_precondition',
          'release#edit',
          'template#edit',
          'workflow#view_execution',
          'workflow#abort_execution',
          'release#edit_security',
          'group#view',
          'release#lock_task',
          'app_pipelines#edit',
          'delivery_pattern#view',
          'template#create_release_other_folder',
          'group#edit',
          'template#lock_task',
          'folder#generate_configuration',
          'release#task_transition',
          'delivery_pattern#edit',
          'trigger#view_trigger',
          'app_pipelines#view',
          'release#edit_task_input_output_properties',
          'release#edit_task_tags',
          'folder#view_versions',
          'trigger#edit_trigger',
          'folder#apply_changes',
          'release#view',
          'folder#edit_notifications',
          'delivery#view',
          'release#edit_blackout',
          'release#edit_failure_handler',
          'template#edit_precondition',
          'folder#edit',
          'release#abort',
          'template#edit_failure_handler',
          'folder#edit_variables',
          'folder#edit_configuration',
          'release#advance_task_transition',
          'folder#edit_versions',
          'release#restart_phase',
          'folder#view',
          'release#edit_task_script',
          'release#edit_task_flag',
          'release#edit_task_configuration_facet',
          'release#edit_task_dates',
          'dashboard#view',
          'workflow#start_execution',
          'release#edit_task',
          'release#edit_task_attachments',
          'release#reassign_task',
          'delivery#edit',
          'template#edit_security',
          'template#create_release',
          'release#edit_task_description',
          'delivery#edit_tracked_item',
          'release#start',
          'template#view',
          'template#edit_triggers',
          'dashboard#edit',
          'folder#edit_security',
        ],
        teams: [
          'QA',
          'Template Owner',
          'Release Manager',
          'Release Admin',
          'Folder Owner',
        ],
      },
      $scmTraceabilityDataId: 0,
    },
    {
      id: 'FolderSamplesAndTutorials-ReleaseTemplate_sample_with_Deployit',
      type: 'xlrelease.Release',
      status: 'TEMPLATE',
      kind: 'RELEASE',
      title: 'Sample Release Template with Digital.ai Deploy',
      plannedDuration: 0,
      securityUid: 9,
      security: {
        permissions: [
          'release#edit_precondition',
          'release#edit',
          'template#edit',
          'workflow#view_execution',
          'workflow#abort_execution',
          'release#edit_security',
          'group#view',
          'release#lock_task',
          'app_pipelines#edit',
          'delivery_pattern#view',
          'template#create_release_other_folder',
          'group#edit',
          'template#lock_task',
          'folder#generate_configuration',
          'release#task_transition',
          'delivery_pattern#edit',
          'trigger#view_trigger',
          'app_pipelines#view',
          'release#edit_task_input_output_properties',
          'release#edit_task_tags',
          'folder#view_versions',
          'trigger#edit_trigger',
          'folder#apply_changes',
          'release#view',
          'folder#edit_notifications',
          'delivery#view',
          'release#edit_blackout',
          'release#edit_failure_handler',
          'template#edit_precondition',
          'folder#edit',
          'release#abort',
          'template#edit_failure_handler',
          'folder#edit_variables',
          'folder#edit_configuration',
          'release#advance_task_transition',
          'folder#edit_versions',
          'release#restart_phase',
          'folder#view',
          'release#edit_task_script',
          'release#edit_task_flag',
          'release#edit_task_configuration_facet',
          'release#edit_task_dates',
          'dashboard#view',
          'workflow#start_execution',
          'release#edit_task',
          'release#edit_task_attachments',
          'release#reassign_task',
          'delivery#edit',
          'template#edit_security',
          'template#create_release',
          'release#edit_task_description',
          'delivery#edit_tracked_item',
          'release#start',
          'template#view',
          'template#edit_triggers',
          'dashboard#edit',
          'folder#edit_security',
        ],
        teams: [
          'QA',
          'Template Owner',
          'Release Manager',
          'Release Admin',
          'Folder Owner',
        ],
      },
      $scmTraceabilityDataId: 0,
    },
    {
      id: 'FolderSamplesAndTutorials-ReleaseTemplate_welcome',
      type: 'xlrelease.Release',
      status: 'TEMPLATE',
      kind: 'RELEASE',
      title: 'Welcome to Release!',
      plannedDuration: 0,
      securityUid: 2,
      security: {
        permissions: [
          'release#edit_precondition',
          'release#edit',
          'template#edit',
          'release#reassign_task',
          'template#edit_security',
          'template#create_release',
          'release#edit_security',
          'release#view',
          'release#lock_task',
          'release#start',
          'template#lock_task',
          'template#view',
          'release#edit_failure_handler',
          'template#edit_precondition',
          'release#abort',
          'template#edit_failure_handler',
          'release#edit_task',
        ],
        teams: ['Template Owner', 'Release Admin'],
      },
      $scmTraceabilityDataId: 0,
    },
  ],
};

export const mockTemplateList: TemplateList = {
  templates: [
    {
      id: 'aatemp',
      title: 'aatemp',
      folder: 'Folder 1',
      folderId: 'Applications/Folder1',
      newReleaseRedirectUri: '/release/new/template1',
      titleRedirectUri: '/release/title/template1',
    },
    {
      id: 'zztemp',
      title: 'zztemp',
      folder: 'Folder 2',
      folderId: 'Applications/Folder2',
      newReleaseRedirectUri: '/release/new/template2',
      titleRedirectUri: '/release/title/template2',
    },
    {
      id: 'rradfTemp',
      title: 'rradfTemp',
      folder: 'Folder 3',
      folderId: 'Applications/Folder3',
      newReleaseRedirectUri: '/release/new/template3',
      titleRedirectUri: '/release/title/template3',
    },
  ],
};

export const mockEmptyTemplateList: TemplateList = {
  templates: [],
};

export const mockTemplateGitMetaInfo: TemplateGitMetaInfo = {
  folderId: 'Applications/Folder1',
  url: 'https://github.com/digital-ai/release-content',
  name: 'DigitalAIOfficial/24.1.1',
  shortMessage:
    '[release/24.1.x] Workflow Template name and logo updation. (#40)',
  committer: 'GitHub',
  commitTime: 1717739139000,
  commitHash: '08a500db0ed6d3241fc1a4be1e9a2d56f11f33e7',
};
