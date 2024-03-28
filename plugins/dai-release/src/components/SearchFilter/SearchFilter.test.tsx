import {
  renderInTestApp,
  setupRequestMockHandlers,
} from '@backstage/test-utils';
import { SearchFilter } from './SearchFilter';
import React from 'react';
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

  it('should render the home page', async () => {
    await renderInTestApp(<SearchFilter />);
    expect(screen.getByText('Digital.ai Release')).toBeInTheDocument();
  });
});
