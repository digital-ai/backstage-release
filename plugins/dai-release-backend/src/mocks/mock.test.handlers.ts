import { HttpResponse, http } from 'msw';
import {
  folderListReleaseApiResponse,
  releaseInstanceConfigResponse,
  releasesCountReleaseApiResponse,
  releasesOverviewFallbackReleaseApiResponse,
  releasesOverviewReleaseApiResponse,
} from './mockData';
import {
  templateFolderGitConfigResponse,
  templateGitCommitVersionResponse,
  templateGitMetaInfoResponse,
  templatesReleaseApiResponse
} from './mockTemplateData';
import {
  workflowsResponse,
  workflowsTriggerResponse,
  workflowsTriggerBackendResponse
} from './mockWorkflowsData';

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
  http.post('http://localhost/api/v1/workflows/search', () => {
    return new HttpResponse(JSON.stringify(workflowsResponse));
  }),
  http.post('http://localhost/api/v1/templates/Applications/Release2bb84833587a48bf8af3943006e1acdf/create', () => {
    return new HttpResponse(JSON.stringify(workflowsTriggerResponse));
  })
//   http.post('http://localhost/#/stepper/FolderDefaultReleaseContent-Folder0a5f467c12cf41ce967092077b2138e5-Folder303182ca1d5443b2b63a0ff04eec5878-Release2bb84833587a48bf8af3943006e1acdf', () => {
//     return new HttpResponse(JSON.stringify(workflowsTriggerBackendResponse));
//   })

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
  http.post('http://localhost/api/v1/workflows/search', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  }),
  http.post('http://localhost/api/v1/templates/Applications/Release2bb84833587a48bf8af3943006e1acdf/create', () => {
    return new HttpResponse(JSON.stringify('[]'), {
      status: 404,
      statusText: 'Not found',
    });
  })

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
  http.post('http://localhost/api/v1/workflows/search', () => {
    return new HttpResponse('You do not have release#view permission', {
      status: 403,
      statusText: 'forbidden',
    });
  }),
  http.post('http://localhost/api/v1/templates/Applications/Release2bb84833587a48bf8af3943006e1acdf/create', () => {
    return new HttpResponse('You do not have release#view permission', {
      status: 403,
      statusText: 'forbidden',
    });
  })
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
  http.post('http://localhost/api/v1/workflows/search', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Unexpected error',
    });
  }),
  http.post('http://localhost/api/v1/templates/Applications/Release2bb84833587a48bf8af3943006e1acdf/create', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Unexpected error',
    });
  })
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
  http.post('http://localhost/api/v1/workflows/search', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }),
  http.post('http://localhost/api/v1/templates/Applications/Release2bb84833587a48bf8af3943006e1acdf/create', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  })
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
