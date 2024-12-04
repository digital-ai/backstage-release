import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DotThemeProvider } from '@digital-ai/dot-components';
import React from 'react';
import { WorkflowCardSkeleton } from './WorkflowCardSkeletonComponent';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
describe('WorkflowCardSkeleton', () => {
  it('renders the skeleton with all elements', () => {
    render(
      <DotThemeProvider>
        <WorkflowCardSkeleton />
      </DotThemeProvider>,
    );
    expect(screen.getByTestId('title-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('footer-button-skeleton')).toBeInTheDocument();
  });

  it('renders the skeleton button', () => {
    render(
      <DotThemeProvider>
        <WorkflowCardSkeleton />
      </DotThemeProvider>,
    );
    expect(screen.getByText('Run workflow')).toBeInTheDocument();
  });
});
