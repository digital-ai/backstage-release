import { DaiReleaseApiClient, daiReleaseApiRef } from '../../api';
import {
  DiscoveryApi,
  IdentityApi,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import {
  TestApiProvider,
  renderInTestApp,
  setupRequestMockHandlers,
} from '@backstage/test-utils';
import { MetaModalPopupComponent } from './MetaModalPopupComponent';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const identityApi = {
  getCredentials: jest.fn(),
} as unknown as IdentityApi;

describe('MetaModalPopupComponent', () => {
  const server = setupServer();
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });
  it('should render loading state when modalPopupData is not available', async () => {
    const rendered = await renderContent({
      openModal: true,
      onClose: () => {},
      instance: 'default',
      modalPopupInputId: 'test',
      modalTitle: 'Test',
      modalPopupData: null,
      setModalPopupData: () => {},
    });

    const loadingIndicator = rendered.getByRole('progressbar');
    expect(loadingIndicator).toBeInTheDocument();
  });
  it('should render modal with data when modalPopupData is available', async () => {
    const mockData = {
      name: 'Test',
      url: 'http://example.com',
      commitHash: 'abc123',
      commitTime: Date.now(),
      committer: 'John Doe',
      shortMessage: 'Initial commit',
    };
    const rendered = await renderContent({
      openModal: true,
      onClose: () => {},
      instance: 'default',
      modalPopupInputId: 'test',
      modalTitle: 'Test Title',
      modalPopupData: mockData,
      setModalPopupData: () => {},
    });

    expect(
      rendered.getByText('Meta information - Test Title'),
    ).toBeInTheDocument();
    expect(rendered.getByText('GIT')).toBeInTheDocument();
    expect(rendered.getByText(mockData.commitHash)).toBeInTheDocument();
    expect(rendered.getByText(mockData.committer)).toBeInTheDocument();
    expect(
      rendered.getByText(`[${mockData.name}] ${mockData.shortMessage}`),
    ).toBeInTheDocument();
    expect(rendered.getByText(mockData.url)).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const onCloseMock = jest.fn();
    const rendered = await renderContent({
      openModal: true,
      onClose: onCloseMock,
      instance: 'default',
      modalPopupInputId: 'test',
      modalTitle: '',
      modalPopupData: {},
      setModalPopupData: () => {},
    });

    const closeButton = rendered.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should render "No data available" when modalPopupData.name is not available', async () => {
    const mockData = {};
    const rendered = await renderContent({
      openModal: true,
      onClose: () => {},
      instance: 'default',
      modalPopupInputId: 'test',
      modalTitle: '',
      modalPopupData: mockData,
      setModalPopupData: () => {},
    });

    expect(rendered.getByText('No data available.')).toBeInTheDocument();
  });
});
const discoveryApi: DiscoveryApi = {
  getBaseUrl: async () => 'http://example.com/api/dai-release',
};
async function renderContent(args: {
  openModal: boolean;
  onClose: () => void;
  instance: string;
  modalPopupInputId: string;
  modalTitle: string;
  modalPopupData: any;
  setModalPopupData: (data: any) => void;
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
      <MetaModalPopupComponent
        openModal={args.openModal}
        onClose={args.onClose}
        instance={args.instance}
        modalPopupInputId={args.modalPopupInputId}
        modalTitle={args.modalTitle}
        modalPopupData={args.modalPopupData}
        setModalPopupData={args.setModalPopupData}
      />
    </TestApiProvider>,
  );
}
