import { DaiReleaseApiClient, daiReleaseApiRef } from '../../api';
import {
  DiscoveryApi,
  IdentityApi,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
import { DotThemeProvider } from '@digital-ai/dot-components';
import React from 'react';
import { WorkflowComponent } from './WorkflowComponent';
import { screen } from '@testing-library/react';

const discoveryApi: DiscoveryApi = {
  getBaseUrl: async () => 'http://example.com/api/dai-release',
};
const identityApi = {
  getCredentials: jest.fn(),
} as unknown as IdentityApi;

async function renderContent() {
  return await renderInTestApp(
    <TestApiProvider
      apis={[
        [discoveryApiRef, discoveryApi],
        [
          daiReleaseApiRef,
          new DaiReleaseApiClient({ discoveryApi, identityApi }),
        ],
      ]}
    >
      <DotThemeProvider>
        <WorkflowComponent />
      </DotThemeProvider>
    </TestApiProvider>,
  );
}

describe('WorkflowCategoryComponent', () => {
  it('should render the WorkflowComponent', async () => {
    await renderContent();
    expect(screen.getByAltText('Release logo')).toBeInTheDocument();
    expect(screen.getByText('Workflow catalog')).toBeInTheDocument();
    expect(screen.getByLabelText('Authored By')).toBeInTheDocument();
  });
});
