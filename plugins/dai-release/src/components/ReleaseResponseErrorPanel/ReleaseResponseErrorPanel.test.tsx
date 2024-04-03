import {
  AuthenticationError,
  NotAllowedError,
  NotFoundError,
  ServiceUnavailableError,
} from '@backstage/errors';
import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
import { ReleaseResponseErrorPanel } from './ReleaseResponseErrorPanel';
import React from 'react';

describe('ReleaseResponseErrorPanel', () => {
  it('should render the error panel with message', async () => {
    const error = new Error('test error');
    const rendered = renderContent(error);
    expect(
      (await rendered).getByText(`Warning: ${error.message}`),
    ).toBeInTheDocument();
  });

  it('should render the error panel for connection refused', async () => {
    const error = new ServiceUnavailableError(`Release Service Unavailable`);
    const rendered = renderContent(error);
    expect(
      (await rendered).getByText(`Warning: Release Service Unavailable`),
    ).toBeInTheDocument();
  });

  it('should render the error panel for unauthorized', async () => {
    const error = new AuthenticationError(
      `Access Denied: Missing or invalid Release Token. Unauthorized to Use Digital.ai Release`,
    );

    const rendered = renderContent(error);
    expect(
      (await rendered).getByText(
        `Warning: Access Denied: Missing or invalid Release Token. Unauthorized to Use Digital.ai Release`,
      ),
    ).toBeInTheDocument();
  });

  it('should render the error panel for reports permission denied', async () => {
    const error = new NotAllowedError(
      'Permission Denied: The configured Release User lacks necessary permission in Digital.ai Release',
    );
    const rendered = renderContent(error);
    expect(
      (await rendered).getByText(
        `Warning: Permission Denied: The configured Release User lacks necessary permission in Digital.ai Release`,
      ),
    ).toBeInTheDocument();
  });

  it('should render the error panel for not found', async () => {
    const error = new NotFoundError('Release service request not found');
    const rendered = renderContent(error);
    expect(
      (await rendered).getByText(`Warning: Release service request not found`),
    ).toBeInTheDocument();
  });
});

async function renderContent(error: Error) {
  return await renderInTestApp(
    <TestApiProvider apis={[]}>
      <ReleaseResponseErrorPanel error={error} />
    </TestApiProvider>,
  );
}
