import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { DotThemeProvider } from '@digital-ai/dot-components';
import React from 'react';
import { Workflow } from '@digital-ai/plugin-dai-release-common';
import { WorkflowCard } from './WorkflowCardComponent';

const mockWorkflow: Workflow = {
  id: '1',
  title: 'Test Workflow',
  author: 'Test Author',
  folderTitle: 'Test Folder',
  logoLink: '',
  git: {
    commitId: '123abc',
    repoLink: 'https://github.com/test/repo',
  },
  description: 'Test Description',
  categories: ['Category1', 'Category2'],
  defaultTargetFolder:
    'FolderDefaultReleaseContent/Folder4ba59f494e064f5eb7c861d31ec423c9',
};
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('WorkflowCard', () => {
  it('renders the workflow card with all details', () => {
    render(
      <DotThemeProvider>
        <WorkflowCard onClick={jest.fn} workflow={mockWorkflow} />
      </DotThemeProvider>,
    );
    expect(screen.getByText('Test Workflow')).toBeInTheDocument();
    expect(screen.getByText('by Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Folder:')).toBeInTheDocument();
    expect(screen.getByText('Test Folder')).toBeInTheDocument();
    expect(screen.getByText('Git version:')).toBeInTheDocument();
    expect(screen.getByText('123abc')).toBeInTheDocument();
    expect(screen.getByText('Category1')).toBeInTheDocument();
    expect(screen.getByText('Category2')).toBeInTheDocument();
  });

  it('calls onClick when the run workflow button is clicked', () => {
    const handleClick = jest.fn();
    render(
      <DotThemeProvider>
        <WorkflowCard workflow={mockWorkflow} onClick={handleClick} />
      </DotThemeProvider>,
    );
    fireEvent.click(screen.getByText('Run workflow'));
    expect(handleClick).toHaveBeenCalledWith('1');
  });

  it('renders the default avatar when logoLink is not provided', () => {
    render(
      <DotThemeProvider>
        <WorkflowCard onClick={jest.fn} workflow={mockWorkflow} />
      </DotThemeProvider>,
    );
    expect(
      screen.getByRole('img', { name: 'Test Workflow' }),
    ).toBeInTheDocument();
  });

  it('does not render git version when commitId is not provided', () => {
    const workflowWithoutCommitId = {
      ...mockWorkflow,
      git: { commitId: '', repoLink: '' },
    };
    render(
      <DotThemeProvider>
        <WorkflowCard workflow={workflowWithoutCommitId} onClick={jest.fn()} />
      </DotThemeProvider>,
    );
    expect(screen.queryByText('Git version:')).not.toBeInTheDocument();
  });
});
