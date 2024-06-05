import { useEffect, useRef, useState } from 'react';
import { useAsyncRetry } from 'react-use';

const useAsyncRetryWithSelectiveDeps = <T>(
  asyncFn: () => Promise<T>,
  page: number,
  deps: any[],
) => {
  const [trigger, setTrigger] = useState<any[]>([page, ...deps]);
  const prevPageRef = useRef<number>(page);
  const prevDepsRef = useRef<any[]>(deps);
  console.log(prevPageRef);
  useEffect(() => {
    const prevPage = prevPageRef.current;
    const prevDeps = prevDepsRef.current;

    // Debugging logs to check values
    console.log('Previous Page:', prevPage);
    console.log('Current Page:', page);

    const depsChanged = !arraysEqual(prevDeps, deps);
    const pageChanged = prevPage !== page;

    if (depsChanged) {
      // If any of the other dependencies changed, reset the page to 0
      prevPageRef.current = 0; // Reset page ref to 0
      setTrigger([0, ...deps]);
    } else if (pageChanged) {
      // If only page changed, include the actual page
      setTrigger([page, ...deps]);
      prevPageRef.current = page;
    }
    prevDepsRef.current = deps;
  }, [page, deps]);

  return useAsyncRetry(asyncFn, trigger);
};

const arraysEqual = (prevOthers: any[], currentOthers: any[]) =>
  prevOthers.length === currentOthers.length &&
  prevOthers.every((val, index) => val === currentOthers[index]);

export default useAsyncRetryWithSelectiveDeps;
