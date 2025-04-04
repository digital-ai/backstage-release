import { HttpResponse, http } from 'msw';
import {
  releaseInstanceConfigResponse,
  releasesCountReleaseApiResponse,
  releasesOverviewFallbackReleaseApiResponse,
  releasesOverviewReleaseApiResponse,
} from './mockData';
import {
  templateFolderGitConfigResponse,
  templateGitCommitVersionResponse,
  templateGitMetaInfoResponse,
  templatesReleaseApiResponse,
} from './mockTemplateData';
import {
  workflowsResponse,
  workflowsTriggerResponse,
} from './mockWorkflowsData';
import { categoriesReleaseApiResponse } from './mockCategories';
import { folderListReleaseApiResponse } from './mockFolderData';

export const mockTestHandlers = [
  http.post('http://localhost/api/v1/releases/search', () => {
    return new HttpResponse(JSON.stringify(releasesOverviewReleaseApiResponse));
  }),
  http.post('http://localhost/api/v1/releases/search/overview', () => {
    return new HttpResponse(JSON.stringify(releasesOverviewReleaseApiResponse));
  }),
  http.post('http://localhost/api/v1/releases/count', () => {
    return new HttpResponse(JSON.stringify(releasesCountReleaseApiResponse));
  }),
  http.get('http://localhost/api/v1/folders/list', () => {
    return new HttpResponse(JSON.stringify(folderListReleaseApiResponse));
  }),
  http.get('http://localhost/api/v1/instances', () => {
    return new HttpResponse(JSON.stringify(releaseInstanceConfigResponse));
  }),
  http.get('http://localhost/api/v1/templates', () => {
    return new HttpResponse(JSON.stringify(templatesReleaseApiResponse));
  }),
  http.get('http://localhost/api/v1/config/byTypeAndTitle', () => {
    return new HttpResponse(JSON.stringify(templateFolderGitConfigResponse));
  }),
  http.get(
    'http://localhost/api/v1/folders/versioning/Applications/Folder1/versions',
    () => {
      return new HttpResponse(JSON.stringify(templateGitCommitVersionResponse));
    },
  ),
  http.get('http://localhost/api/v1/template/meta', () => {
    return new HttpResponse(JSON.stringify(templateGitMetaInfoResponse));
  }),
  http.get('http://localhost/api/v1/categories', () => {
    return new HttpResponse(JSON.stringify(categoriesReleaseApiResponse));
  }),
  http.post('http://localhost/api/v1/workflows/search', () => {
    return new HttpResponse(JSON.stringify(workflowsResponse));
  }),
  http.post(
    'http://localhost/api/v1/templates/Release2bb84833587a48bf8af3943006e1acdf/start',
    () => {
      return new HttpResponse(JSON.stringify(workflowsTriggerResponse));
    },
  ),
  http.post('http://localhost/api/v1/workflow/redirect', () => {
    return new HttpResponse(JSON.stringify(workflowsTriggerResponse));
  }),
];

export const error404ResponseHandler = [
  http.post('http://localhost/api/v1/releases/search/overview', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  }),
  http.post('http://localhost/api/v1/releases/search', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  }),
  http.post('http://localhost/api/v1/releases/count', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  }),
  http.get('http://localhost/api/v1/folders/list', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  }),
  http.get('http://localhost/api/v1/instances', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  }),
  http.get('http://localhost/api/v1/templates', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  }),
  http.get('http://localhost/api/v1/categories', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  }),
  http.post('http://localhost/api/v1/workflows/search', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  }),
  http.post(
    'http://localhost/api/v1/templates/Release2bb84833587a48bf8af3943006e1acdf/start',
    () => {
      return new HttpResponse(JSON.stringify('[]'), {
        status: 404,
        statusText: 'Not found',
      });
    },
  ),
];

export const error403ResponseHandler = [
  http.post('http://localhost/api/v1/releases/search/overview', () => {
    return new HttpResponse('You do not have release#view permission', {
      status: 403,
      statusText: 'forbidden',
    });
  }),
  http.post('http://localhost/api/v1/releases/search', () => {
    return new HttpResponse('You do not have release#view permission', {
      status: 403,
      statusText: 'forbidden',
    });
  }),
  http.post('http://localhost/api/v1/releases/count', () => {
    return new HttpResponse('You do not have release#view permission', {
      status: 403,
      statusText: 'forbidden',
    });
  }),
  http.get('http://localhost/api/v1/folders/list', () => {
    return new HttpResponse('You do not have release#view permission', {
      status: 403,
      statusText: 'forbidden',
    });
  }),
  http.get('http://localhost/api/v1/instances', () => {
    return new HttpResponse('You do not have release#view permission', {
      status: 403,
      statusText: 'forbidden',
    });
  }),
  http.get('http://localhost/api/v1/templates', () => {
    return new HttpResponse('You do not have release#view permission', {
      status: 403,
      statusText: 'forbidden',
    });
  }),

  http.get('http://localhost/api/v1/categories', () => {
    return new HttpResponse('You do not have release#view permission', {
      status: 403,
      statusText: 'forbidden',
    });
  }),
  http.post('http://localhost/api/v1/workflows/search', () => {
    return new HttpResponse('You do not have release#view permission', {
      status: 403,
      statusText: 'forbidden',
    });
  }),
  http.post(
    'http://localhost/api/v1/templates/Release2bb84833587a48bf8af3943006e1acdf/start',
    () => {
      return new HttpResponse('You do not have release#view permission', {
        status: 403,
        statusText: 'forbidden',
      });
    },
  ),
  http.post(
    'http://localhost/api/v1/templates/Release2bb84833587a48bf8af3943006e1acde/start',
    () => {
      return new HttpResponse(
        "You do not have 'Start workflow execution' privilege",
        {
          status: 403,
          statusText: 'forbidden',
        },
      );
    },
  ),
];

export const error500ResponseHandler = [
  http.post('http://localhost/api/v1/releases/search/overview', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Unexpected error',
    });
  }),
  http.post('http://localhost/api/v1/releases/search', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Unexpected error',
    });
  }),
  http.post('http://localhost/api/v1/releases/count', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Unexpected error',
    });
  }),
  http.get('http://localhost/api/v1/folders/list', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Unexpected error',
    });
  }),
  http.get('http://localhost/api/v1/instances', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Unexpected error',
    });
  }),
  http.get('http://localhost/api/v1/templates', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Unexpected error',
    });
  }),

  http.get('http://localhost/api/v1/categories', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Unexpected error',
    });
  }),
  http.post('http://localhost/api/v1/workflows/search', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Unexpected error',
    });
  }),

  http.post(
    'http://localhost/api/v1/templates/Release2bb84833587a48bf8af3943006e1acdf/start',
    () => {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Unexpected error',
      });
    },
  ),

  http.post(
    'http://localhost/api/v1/templates/Release2bb84833587a48bf8af3943006e1acdf/start',
    () => {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Unexpected error',
      });
    },
  ),
  http.post('http://localhost/api/v1/templates/ErrorRelease/start', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: `You do not have enough permissions to run a workflow in the selected folder.
        Please choose another folder or contact your Release Administrator for further assistance.`,
    });
  }),
];

export const error401ResponseHandler = [
  http.post('http://localhost/api/v1/releases/search/overview', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }),
  http.post('http://localhost/api/v1/releases/search', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }),
  http.post('http://localhost/api/v1/releases/count', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }),
  http.get('http://localhost/api/v1/folders/list', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }),
  http.get('http://localhost/api/v1/instances', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }),
  http.get('http://localhost/api/v1/templates', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }),

  http.get('http://localhost/api/v1/categories', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }),
  http.post('http://localhost/api/v1/workflows/search', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }),

  http.post(
    'http://localhost/api/v1/templates/Release2bb84833587a48bf8af3943006e1acdf/start',
    () => {
      return new HttpResponse(null, {
        status: 401,
        statusText: 'Unauthorized',
      });
    },
  ),
];

export const mockTestHandlersfallBack = [
  http.post('http://localhost/api/v1/releases/search/overview', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  }),
  http.post('http://localhost/api/v1/releases/search', () => {
    return new HttpResponse(
      JSON.stringify(releasesOverviewFallbackReleaseApiResponse),
    );
  }),
  http.post('http://localhost/api/v1/releases/count', () => {
    return new HttpResponse(JSON.stringify(releasesCountReleaseApiResponse));
  }),
  http.get('http://localhost/api/v1/folders/list', () => {
    return new HttpResponse(JSON.stringify(folderListReleaseApiResponse));
  }),
];
