import {
  renderInTestApp,
  setupRequestMockHandlers,
} from '@backstage/test-utils';
import React from 'react';
import { SearchFilter } from './SearchFilter';
import { rest } from 'msw';
import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';

describe('HomePageComponent', () => {
  const server = setupServer();
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });

  it('should render the search filter elements', async () => {
    await renderInTestApp(<SearchFilter />);
    expect(screen.getByLabelText('Order by')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Start')).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toBeInTheDocument();
  });
});
