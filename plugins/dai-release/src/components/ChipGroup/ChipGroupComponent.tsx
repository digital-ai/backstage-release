import { DotChip, DotTooltip } from '@digital-ai/dot-components';
import React, {
  MutableRefObject,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { debounce } from 'lodash';
import { makeStyles } from '@material-ui/core';

export interface ChipGroupProps {
  chipCharactersLimit?: number;
  className?: string;
  labels: string[];
  onChipDelete?: (label: string) => void;
}

export interface ExceedingWidthChip {
  index: number;
  label: string;
}

export interface UseChipGroupWidths {
  chipCounterWidth: number;
  chipWidths: number[];
  containerWidth: number;
}

const useStyles = makeStyles(theme => ({
  chipGroup: {
    display: 'flex',
    gap: theme.spacing(1),
    width: '100%',
    '& .hidden-chip': {
      display: 'none',
    },
  },
  roundCorner: {
    borderRadius: '4px',
  },
  ellipsis: {
    display: 'inline-block',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

export const useChipGroup = (
  exceedingChipsCountRef: MutableRefObject<HTMLSpanElement | null>,
  elementsRef: MutableRefObject<HTMLSpanElement[]>,
  containerRef: MutableRefObject<HTMLDivElement | null>,
): UseChipGroupWidths => {
  const [chipWidths, setChipWidths] = useState<number[]>([]);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const chipCounterWidth =
    exceedingChipsCountRef.current?.getBoundingClientRect().width || 0;

  /* Get width for each chip so that it can be used to calculate how much chips can fit into the container  */
  useLayoutEffect(() => {
    const width = elementsRef.current.map(
      el => el.getBoundingClientRect().width,
    );
    setChipWidths(width);
  }, [elementsRef]);

  useLayoutEffect(() => {
    if (!containerRef.current) return () => {};
    const handleResize = (width: number) => setContainerWidth(width);
    const handleDebounce = debounce(handleResize, 100);
    const observer = new ResizeObserver(entries => {
      handleDebounce(entries[0].target.getBoundingClientRect().width);
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      handleDebounce.cancel();
    };
  }, [containerRef]);

  return {
    chipWidths,
    containerWidth,
    chipCounterWidth,
  };
};

export const ChipGroup = ({ chipCharactersLimit, labels }: ChipGroupProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const exceedingChipsCountRef = useRef<HTMLSpanElement | null>(null);
  const elementsRef = useRef<HTMLSpanElement[]>([]);
  const classes = useStyles();

  const { chipWidths, containerWidth, chipCounterWidth } = useChipGroup(
    exceedingChipsCountRef,
    elementsRef,
    containerRef,
  );

  const exceedingWidthChips: ExceedingWidthChip[] = [];
  let remainingContainerWidth = containerWidth;

  const calculateGapWidth = (index: number, counterWidth: number) => {
    const isLastVisibleItem =
      index >= chipWidths.length - exceedingWidthChips.length - 1;
    const isChipCounterVisible = counterWidth > 0;
    return isLastVisibleItem && !isChipCounterVisible ? 0 : 8;
  };

  chipWidths.forEach((width, index) => {
    const gapWidth = calculateGapWidth(index, chipCounterWidth);
    const totalTakenWidth = width + gapWidth;
    const isExceedingWidth =
      totalTakenWidth > remainingContainerWidth - chipCounterWidth;

    if (isExceedingWidth && index > 0) {
      exceedingWidthChips.push({ index, label: labels[index] });
    } else {
      remainingContainerWidth -= totalTakenWidth;
    }
  });

  const getTooltipWithExceedingChips = (): ReactNode => {
    return (
      <>
        {exceedingWidthChips.map(chip => (
          <div key={chip.label}>
            {chip.label}
            <br />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={classes.chipGroup} ref={containerRef}>
      {labels.map((label: string, index: number) => {
        return (
          <span
            className={
              exceedingWidthChips.some(
                exceedingChip => exceedingChip.index === index,
              )
                ? 'hidden-chip'
                : undefined
            }
            data-testid="chip-group-span"
            key={label}
            ref={element => {
              if (element !== null) {
                elementsRef.current[index] = element;
              }
            }}
          >
            <DotChip charactersLimit={chipCharactersLimit} size="small">
              {label}
            </DotChip>
          </span>
        );
      })}
      {exceedingWidthChips.length > 0 && (
        <span
          data-testid="exceeding-width-chip-span"
          ref={exceedingChipsCountRef}
        >
          <DotTooltip title={getTooltipWithExceedingChips()}>
            <DotChip size="small">{`+${exceedingWidthChips.length.toString()}`}</DotChip>
          </DotTooltip>
        </span>
      )}
    </div>
  );
};
