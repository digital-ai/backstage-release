import {
  renderInTestApp,
  setupRequestMockHandlers,
} from '@backstage/test-utils';
import { ExampleComponent } from './ExampleComponent';
import React from 'react';
import { rest } from 'msw';
import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';

describe('ExampleComponent', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });

  it('should render', async () => {
    await renderInTestApp(<ExampleComponent />);
    expect(
      screen.getByText('Welcome to Digital.ai Release!'),
    ).toBeInTheDocument();
  });
});
