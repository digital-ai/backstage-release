import { useEffect, useState } from 'react';

export const useDebouncedValue = (value: any, delay: number | undefined) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};
interface StartAndSpan {
  span: number;
  start: number;
}

interface CellProps {
  lg: StartAndSpan;
  md: StartAndSpan;
  sm: StartAndSpan;
  xl: StartAndSpan;
  xs: StartAndSpan;
  xxl: StartAndSpan;
}

export const calculateCellProps = (index: number): CellProps => {
  const sizeConstants = {
    xxl: {
      columns: 12,
      cards: 3,
    },
    xl: {
      columns: 12,
      cards: 2,
    },
    lg: {
      columns: 12,
      cards: 2,
    },
    md: {
      columns: 12,
      cards: 1,
    },
    sm: {
      columns: 8,
      cards: 1,
    },
    xs: {
      columns: 4,
      cards: 1,
    },
  };

  return {
    xxl: {
      start:
        (index % sizeConstants.xxl.cards) *
          (sizeConstants.xxl.columns / sizeConstants.xxl.cards) +
        1,
      span: sizeConstants.xxl.columns / sizeConstants.xxl.cards,
    },
    xl: {
      start:
        (index % sizeConstants.xl.cards) *
          (sizeConstants.xl.columns / sizeConstants.xl.cards) +
        1,
      span: sizeConstants.xl.columns / sizeConstants.xl.cards,
    },
    lg: {
      start:
        (index % sizeConstants.lg.cards) *
          (sizeConstants.lg.columns / sizeConstants.lg.cards) +
        1,
      span: sizeConstants.lg.columns / sizeConstants.lg.cards,
    },
    md: {
      start:
        (index % sizeConstants.md.cards) *
          (sizeConstants.md.columns / sizeConstants.md.cards) +
        1,
      span: sizeConstants.md.columns / sizeConstants.md.cards,
    },
    sm: {
      start:
        (index % sizeConstants.sm.cards) *
          (sizeConstants.sm.columns / sizeConstants.sm.cards) +
        1,
      span: sizeConstants.sm.columns / sizeConstants.sm.cards,
    },
    xs: {
      start:
        (index % sizeConstants.xs.cards) *
          (sizeConstants.xs.columns / sizeConstants.xs.cards) +
        1,
      span: sizeConstants.xs.columns / sizeConstants.xs.cards,
    },
  };
};
