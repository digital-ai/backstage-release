import { Dispatch, SetStateAction } from 'react';
import { renderHook } from '@testing-library/react-hooks/pure';
import { useAsyncRetry } from 'react-use';
import useAsyncRetryWithSelectiveDeps from './stateSelectiveDeps';

jest.mock('react-use', () => ({
  useAsyncRetry: jest.fn(),
}));
describe('useAsyncRetryWithSelectiveDeps', () => {
  let mockAsyncFn: jest.Mock<Promise<any>, []>;
  let mockSetPage: jest.MockedFunction<Dispatch<SetStateAction<number>>>;
  let pageNumber: number;
  let otherDeps: any[];
  let useAsyncRetryMock: jest.Mock;

  beforeEach(() => {
    mockAsyncFn = jest.fn(() => Promise.resolve('data'));
    mockSetPage = jest.fn();
    pageNumber = 0;
    otherDeps = [{}, 5, 'start_date', '', '', '', '', 'default'];
    useAsyncRetryMock = useAsyncRetry as jest.Mock;
    useAsyncRetryMock.mockReturnValue({
      value: 'testValue',
      loading: false,
      error: null,
      retry: jest.fn(),
    });
  });

  it('should call useAsyncRetry with the initial trigger', () => {
    renderHook(() =>
      useAsyncRetryWithSelectiveDeps(
        mockAsyncFn,
        pageNumber,
        mockSetPage,
        otherDeps,
      ),
    );

    expect(useAsyncRetryMock).toHaveBeenCalledWith(mockAsyncFn, [
      pageNumber,
      ...otherDeps,
    ]);
  });

  it('should reset page and trigger if dependencies change', () => {
    const { rerender } = renderHook(
      ({ asyncFn, page, setPage, deps }) =>
        useAsyncRetryWithSelectiveDeps(asyncFn, page, setPage, deps),
      {
        initialProps: {
          asyncFn: mockAsyncFn,
          page: pageNumber,
          setPage: mockSetPage,
          deps: otherDeps,
        },
      },
    );

    const newDeps = [{}, 5, 'end_date', '', '', '', '', 'default'];
    rerender({
      asyncFn: mockAsyncFn,
      page: pageNumber,
      setPage: mockSetPage,
      deps: newDeps,
    });

    expect(mockSetPage).toHaveBeenCalledWith(0);
    expect(useAsyncRetryMock).toHaveBeenCalledWith(mockAsyncFn, [
      0,
      ...newDeps,
    ]);
  });

  it('should update trigger if only the page changes', () => {
    const { rerender } = renderHook(
      ({ asyncFn, page, setPage, deps }) =>
        useAsyncRetryWithSelectiveDeps(asyncFn, page, setPage, deps),
      {
        initialProps: {
          asyncFn: mockAsyncFn,
          page: pageNumber,
          setPage: mockSetPage,
          deps: otherDeps,
        },
      },
    );

    const newPage = 1;
    rerender({
      asyncFn: mockAsyncFn,
      page: newPage,
      setPage: mockSetPage,
      deps: otherDeps,
    });

    expect(useAsyncRetryMock).toHaveBeenCalledWith(mockAsyncFn, [
      newPage,
      ...otherDeps,
    ]);
  });
});
