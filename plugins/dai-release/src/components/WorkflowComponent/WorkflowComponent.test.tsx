// import { DaiReleaseApiClient, daiReleaseApiRef } from '../../api';
// import {
//   DiscoveryApi,
//   IdentityApi,
//   discoveryApiRef,
// } from '@backstage/core-plugin-api';
// import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
// import { DotThemeProvider } from '@digital-ai/dot-components';
// import React from 'react';
// import { WorkflowComponent } from './WorkflowComponent';
// import { screen } from '@testing-library/react';
// import { useWorkflowCatalog } from '../../hooks/useWorkflowCatalog';
//
// jest.mock('../../hooks/useWorkflowCatalog');
//
// const mockUseWorkflowCatalog = useWorkflowCatalog as jest.MockedFunction<
//   typeof useWorkflowCatalog
// >;
//
// const discoveryApi: DiscoveryApi = {
//   getBaseUrl: async () => 'http://example.com/api/dai-release',
// };
// const identityApi = {
//   getCredentials: jest.fn(),
// } as unknown as IdentityApi;
//
// async function renderContent() {
//   return await renderInTestApp(
//     <TestApiProvider
//       apis={[
//         [discoveryApiRef, discoveryApi],
//         [
//           daiReleaseApiRef,
//           new DaiReleaseApiClient({ discoveryApi, identityApi }),
//         ],
//       ]}
//     >
//       <DotThemeProvider>
//         <WorkflowComponent />
//       </DotThemeProvider>
//     </TestApiProvider>,
//   );
// }
//
// beforeAll(() => {
//   global.ResizeObserver = class {
//     observe() {}
//     unobserve() {}
//     disconnect() {}
//   };
// });
// describe('WorkflowComponent', () => {
//   beforeEach(() => {
//     mockUseWorkflowCatalog.mockReturnValue({
//       data: [
//         {
//           id: '1',
//           title: 'Test Workflow 1',
//           author: 'Author 1',
//           folderTitle: 'Folder 1',
//           logoLink: '',
//           git: {
//             commitId: '123abc',
//             repoLink: 'https://github.com/test/repo1',
//           },
//           description: 'Description 1',
//           categories: ['Category1', 'Category2'],
//         },
//         {
//           id: '2',
//           title: 'Test Workflow 2',
//           author: 'Author 2',
//           folderTitle: 'Folder 2',
//           logoLink: '',
//           git: {
//             commitId: '456def',
//             repoLink: 'https://github.com/test/repo2',
//           },
//           description: 'Description 2',
//           categories: ['Category3', 'Category4'],
//         },
//       ],
//       error: undefined,
//       instance: 'instance1',
//       instanceList: [],
//       folderData: {},
//       loading: false,
//       setData(_data: any): void {},
//       setHasMore(_hasMore: boolean): void {},
//       setRowsPerPage(_pageSize: number): void {},
//       hasMore: false,
//       setLoading: jest.fn(),
//       setPage: jest.fn(),
//       setInstance: jest.fn(),
//     });
//   });
//
//   it('should render the WorkflowComponent with data', async () => {
//     await renderContent();
//
//     expect(screen.getByAltText('Release logo')).toBeInTheDocument();
//     expect(screen.getByText('Workflow catalog')).toBeInTheDocument();
//     expect(screen.getByText('Test Workflow 1')).toBeInTheDocument();
//     expect(screen.getByText('Test Workflow 2')).toBeInTheDocument();
//   });
//
//   it('should render the WorkflowComponent with no data', async () => {
//     mockUseWorkflowCatalog.mockReturnValue({
//       data: [],
//       error: undefined,
//       instance: 'instance1',
//       instanceList: undefined,
//       folderData: {},
//       loading: false,
//       hasMore: false,
//       setLoading: jest.fn(),
//       setPage: jest.fn(),
//       setData(_data: any): void {},
//       setHasMore(_hasMore: boolean): void {},
//       setRowsPerPage(_pageSize: number): void {},
//       setInstance: jest.fn(),
//     });
//     await renderContent();
//
//     expect(screen.getByAltText('Release logo')).toBeInTheDocument();
//     expect(screen.getByText('Workflow catalog')).toBeInTheDocument();
//     expect(screen.getByText('No workflows found')).toBeInTheDocument();
//   });
// });
