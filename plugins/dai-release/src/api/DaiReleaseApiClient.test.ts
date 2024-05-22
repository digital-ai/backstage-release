import { AuthenticationError, NotAllowedError } from '@backstage/errors';
import { DiscoveryApi, IdentityApi } from '@backstage/core-plugin-api';
import { releaseInstanceConfigResponse, releases } from '../mocks/mocks';
import { DaiReleaseApiClient } from './DaiReleaseApiClient';
import { rest } from 'msw';
import { setupRequestMockHandlers } from '@backstage/test-utils';
import { setupServer } from 'msw/node';

const discoveryApi: DiscoveryApi = {
  getBaseUrl: async () => 'https://example.com/api/dai-release',
};

const identityApi = {
  getCredentials: jest.fn(),
} as unknown as IdentityApi;

function checkParam(
  params: URLSearchParams,
  key: string,
  value: string,
): boolean {
  return params.get(key) === value;
}

describe('ReleaseApiClient', () => {
  beforeEach(() => {
    jest
      .spyOn(identityApi, 'getCredentials')
      .mockImplementation(async () => ({ token: 'token' }));
  });

  const worker = setupServer();
  setupRequestMockHandlers(worker);
  const client = new DaiReleaseApiClient({ discoveryApi, identityApi });

  describe('getReleases', () => {
    it('should return valid response', async () => {
      worker.use(
        rest.get(
          'https://example.com/api/dai-release/releases',
          (req, res, ctx) => {
            if (
              checkParam(req.url.searchParams, 'orderBy', 'end_date') &&
              checkParam(req.url.searchParams, 'pageNumber', '0') &&
              checkParam(req.url.searchParams, 'resultsPerPage', '1')
            ) {
              return res(
                ctx.status(200),
                ctx.set('Content-Type', 'application/json'),
                ctx.json(releases),
              );
            }
            return res(
              ctx.status(400),
              ctx.set('Content-Type', 'application/json'),
            );
          },
        ),
      );

      const response = await client.getReleases(
        0,
        1,
        'end_date',
        '',
        null,
        null,
        [],
        'default',
      );
      expect(response !== undefined).toBeTruthy();
    });
    it('should return error', async () => {
      worker.use(
        rest.get(
          'https://example.com/api/dai-release/release',
          (_, res, ctx) => {
            res(ctx.status(500), ctx.set('Content-Type', 'application/json'));
          },
        ),
      );
      let err;
      try {
        await client.getReleases(0, 1, '5', '', null, null, [], 'default');
      } catch (e) {
        err = e;
      } finally {
        expect(err instanceof Error).toBeTruthy();
      }
    });
    it('should return AuthenticationError', async () => {
      worker.use(
        rest.get(
          'https://example.com/api/dai-release/releases',
          (_, res, ctx) =>
            res(ctx.status(401), ctx.set('Content-Type', 'application/json')),
        ),
      );
      let err;
      try {
        await client.getReleases(0, 1, '3', '', null, null, [], 'default');
      } catch (e) {
        err = e;
      } finally {
        expect(err instanceof AuthenticationError).toBeTruthy();
      }
    });
    it('should return NotAllowedError', async () => {
      worker.use(
        rest.get(
          'https://example.com/api/dai-release/releases',
          (_, res, ctx) =>
            res(ctx.status(403), ctx.set('Content-Type', 'application/json')),
        ),
      );
      let err;
      try {
        await client.getReleases(0, 1, '3', '', null, null, [], 'default');
      } catch (e) {
        err = e;
      } finally {
        expect(err instanceof NotAllowedError).toBeTruthy();
      }
    });
  });
  describe('getInstanceList', () => {
    it('should return instance list', async () => {
      worker.use(
        rest.get(
          'https://example.com/api/dai-release/instances',
          (_req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.set('Content-Type', 'application/json'),
              ctx.json(releaseInstanceConfigResponse),
            );
          },
        ),
      );
      const response = await client.getInstanceList();
      expect(response !== undefined).toBeTruthy();
    });

    it('should return error from instance list', async () => {
      worker.use(
        rest.get(
          'https://example.com/api/dai-release/instances',
          (_req, res, ctx) => {
            return res(
              ctx.status(400),
              ctx.set('Content-Type', 'application/json'),
            );
          },
        ),
      );
      let err;
      try {
        await client.getInstanceList();
      } catch (e) {
        err = e;
      } finally {
        expect(err instanceof Error).toBeTruthy();
      }
    });
  });
});
