import { DaiReleaseApiClient, daiReleaseApiRef } from '../../api';
import {
  DiscoveryApi,
  IdentityApi,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
import { CategoriesContentActiveList } from '@digital-ai/plugin-dai-release-common';
import { DotThemeProvider } from '@digital-ai/dot-components';
import React from 'react';
import { WorkflowCategoryComponent } from './WorkflowCategoryComponent';
import { mockReleaseCategories } from '../../mocks/categoriesMocks';
import { screen } from '@testing-library/react';

function verifyAuthor() {
  const input = screen.getByLabelText('Authored By') as HTMLInputElement;
  expect(input).toBeInTheDocument();
  expect(input.id).toBe('authored-by');
  expect(input.name).toBe('authored-by');
  expect(input.placeholder).toBe('Start typing to filter Author');
  expect(input.value).toBe('');
}

describe('WorkflowCategoryComponent', () => {
  it('should render the Categories label,checkbox and Author input', async () => {
    await renderContent({
      instance: 'default',
      releaseCategories: mockReleaseCategories.activeCategory,
      isLoadingCategories: false,
    });
    const categoryFilterTitle = screen.getByTestId('category-filter-title');
    expect(categoryFilterTitle).toHaveTextContent('Categories');

    mockReleaseCategories.activeCategory.forEach(category => {
      const checkbox = screen.getByLabelText(category.title);
      expect(checkbox).toBeInTheDocument();
    });
    verifyAuthor();
  });

  it('should render the Author input with correct properties and it should not display the checkbox', async () => {
    await renderContent({
      instance: 'default',
      releaseCategories: [],
      isLoadingCategories: false,
    });
    const categoryFilterTitle = screen.queryByTestId('category-filter-title');
    expect(categoryFilterTitle).toBeNull();

    mockReleaseCategories.activeCategory.forEach(category => {
      const checkbox = screen.queryByLabelText(category.title);
      expect(checkbox).toBeNull();
    });
    verifyAuthor();
  });
});
const discoveryApi: DiscoveryApi = {
  getBaseUrl: async () => 'http://example.com/api/dai-release',
};
const identityApi = {
  getCredentials: jest.fn(),
} as unknown as IdentityApi;

async function renderContent(args: {
  instance: string;
  releaseCategories: CategoriesContentActiveList[];
  isLoadingCategories: boolean;
}) {
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
        <WorkflowCategoryComponent
          releaseCategories={args.releaseCategories}
          instance={args.instance}
          isLoadingCategories={args.isLoadingCategories}
          onSetWorkflowSearch={jest.fn()}
          workflowSearch={{ categories: [], author: '' }}
          resetState={jest.fn()}
        />
      </DotThemeProvider>
    </TestApiProvider>,
  );
}
