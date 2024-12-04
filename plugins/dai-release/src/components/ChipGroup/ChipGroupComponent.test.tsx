import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ChipGroup } from './ChipGroupComponent';
import { DotThemeProvider } from '@digital-ai/dot-components';
import React from 'react';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
describe('ChipGroup', () => {
  it('renders all chips when they fit within the container', () => {
    render(
      <DotThemeProvider>
        <ChipGroup labels={['Chip1', 'Chip2', 'Chip3']} />
      </DotThemeProvider>,
    );
    expect(screen.getByText('Chip1')).toBeInTheDocument();
    expect(screen.getByText('Chip2')).toBeInTheDocument();
    expect(screen.getByText('Chip3')).toBeInTheDocument();
  });

  it('renders exceeding chip counter when chips exceed container width', () => {
    render(
      <DotThemeProvider>
        <ChipGroup labels={['Chip1', 'Chip2', 'Chip3', 'Chip4', 'Chip5']} />
      </DotThemeProvider>,
    );
    expect(screen.getByText('Chip1')).toBeInTheDocument();
    expect(screen.getByText('Chip2')).toBeInTheDocument();
    expect(screen.getByTestId('exceeding-width-chip-span')).toBeInTheDocument();
  });

  it('renders tooltip with all exceeding chips', () => {
    render(
      <DotThemeProvider>
        <ChipGroup labels={['Chip1', 'Chip2', 'Chip3', 'Chip4', 'Chip5']} />
      </DotThemeProvider>,
    );
    expect(screen.getByTestId('exceeding-width-chip-span')).toBeInTheDocument();
    fireEvent.mouseOver(screen.getByTestId('exceeding-width-chip-span'));
    expect(screen.getByText('Chip3')).toBeInTheDocument();
    expect(screen.getByText('Chip4')).toBeInTheDocument();
    expect(screen.getByText('Chip5')).toBeInTheDocument();
  });

  it('renders no chips when labels array is empty', () => {
    render(
      <DotThemeProvider>
        <ChipGroup labels={[]} />
      </DotThemeProvider>,
    );
    expect(screen.queryByTestId('chip-group-span')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('exceeding-width-chip-span'),
    ).not.toBeInTheDocument();
  });

  it('renders chips with character limit applied', () => {
    render(
      <DotThemeProvider>
        <ChipGroup labels={['LongChipLabel']} chipCharactersLimit={4} />
      </DotThemeProvider>,
    );
    expect(screen.getByText('Long...')).toBeInTheDocument();
  });
});
