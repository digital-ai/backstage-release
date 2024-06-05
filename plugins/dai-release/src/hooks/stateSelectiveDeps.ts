import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useAsyncRetry } from 'react-use';

const arraysEqual = (prevOthers: any[], currentOthers: any[]) =>
  prevOthers.length === currentOthers.length &&
  prevOthers.every((val, index) => val === currentOthers[index]);

const useAsyncRetryWithSelectiveDeps = <T>(
  asyncFn: () => Promise<T>,
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  deps: any[],
) => {
  const [trigger, setTrigger] = useState<any[]>([page, ...deps]);
  const prevPageRef = useRef<number>(page);
  const prevDepsRef = useRef<any[]>(deps);

  useEffect(() => {
    const prevPage = prevPageRef.current;
    const prevDeps = prevDepsRef.current;
    const depsChanged = !arraysEqual(prevDeps, deps);
    const pageChanged = prevPage !== page;

    if (depsChanged) {
      // If any of the other dependencies changed, reset the page to 0
      prevPageRef.current = 0; // Reset page ref to 0
      setPage(0);
      setTrigger([0, ...deps]);
    } else if (pageChanged) {
      // If only page changed, include the actual page
      prevPageRef.current = page;
      setTrigger([page, ...deps]);
    }
    prevDepsRef.current = deps;
  }, [page, setPage, deps]);

  return useAsyncRetry(asyncFn, trigger);
};

export default useAsyncRetryWithSelectiveDeps;
