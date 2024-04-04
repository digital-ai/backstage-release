/* eslint-disable jest/no-conditional-expect */

import { DaiReleaseApiClient } from './DaiReleaseApiClient';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import {
  AuthenticationError,
  NotAllowedError,
  ResponseError,
} from '@backstage/errors';
import { releases } from '../mocks/mocks';
import { rest } from 'msw';
import { setupRequestMockHandlers } from '@backstage/test-utils';
import { setupServer } from 'msw/node';

const discoveryApi: DiscoveryApi = {
  getBaseUrl: async () => 'http://example.com/api/dai-release',
};

function checkParam(
  params: URLSearchParams,
  key: string,
  value: string,
): boolean {
  return params.get(key) === value;
}

describe('ReleaseApiClient', () => {
  const worker = setupServer();
  setupRequestMockHandlers(worker);
  const client = new DaiReleaseApiClient({ discoveryApi });

  describe('getReleases', () => {
    it('should return valid response', async () => {
      worker.use(
        rest.get(
          'http://example.com/api/dai-release/releases',
          (req, res, ctx) => {
            if (
              checkParam(req.url.searchParams, 'orderBy', 'end_date') &&
              checkParam(req.url.searchParams, 'pageNumber', '0') &&
              checkParam(req.url.searchParams, 'resultsPerPage', '1') &&
              checkParam(req.url.searchParams, 'orderDirection', 'desc')
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

      const response = await client.getReleases(0, 1, 'end_date', 'desc');
      expect(response !== undefined).toBeTruthy();
    });
    it('should return error', async () => {
      worker.use(
        rest.get(
          'http://example.com/api/dai-release/releases',
          (_, res, ctx) => {
            res(ctx.status(500), ctx.set('Content-Type', 'application/json'));
          },
        ),
      );
      try {
        await client.getReleases(0, 1, '5', 'desc');
      } catch (e) {
        expect(e instanceof Error).toBeTruthy();
      }
    });
    it('should return AuthenticationError', async () => {
      worker.use(
        rest.get('http://example.com/api/dai-release/releases', (_, res, ctx) =>
          res(ctx.status(401), ctx.set('Content-Type', 'application/json')),
        ),
      );
      try {
        await client.getReleases(0, 1, '3', 'desc');
      } catch (e) {
        expect(e instanceof AuthenticationError).toBeTruthy();
      }
    });
    it('should return NotAllowedError', async () => {
      worker.use(
        rest.get('http://example.com/api/dai-release/releases', (_, res, ctx) =>
          res(ctx.status(403), ctx.set('Content-Type', 'application/json')),
        ),
      );
      try {
        await client.getReleases(0, 1, '3', 'desc');
      } catch (e) {
        expect(e instanceof NotAllowedError).toBeTruthy();
      }
    });
    it('should return ServiceUnavailableError', async () => {
      worker.use(
        rest.get('http://example.com/api/dai-release/releases', (_, res, ctx) =>
          res(ctx.status(403), ctx.set('Content-Type', 'application/json')),
        ),
      );
      try {
        await client.getReleases(0, 1, '5', 'desc');
      } catch (e) {
        expect(e instanceof NotAllowedError).toBeTruthy();
      }
    });
  });
});
