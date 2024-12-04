import {
  CheckboxProps,
  DotCheckboxGroup,
  DotInputText,
  DotSkeleton,
  DotTypography,
} from '@digital-ai/dot-components';
import React, { useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { CategoriesContentActiveList } from '@digital-ai/plugin-dai-release-common';

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    ':root': {
      '--margin-dot': '10.5px',
    },
    '.MuiTypography-root.MuiTypography-body1.MuiFormControlLabel-label': {
      fontSize: '14px',
    },
    '.MuiTypography-subtitle2': {
      fontWeight: '700',
    },
  },
  workflowCatalog: {
    height: '100%',
    width: '100%',

    '& .workflow-drawer-content-left': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      '& .categories-filter': {
        margin: theme.spacing(0, 0, 2, 0),
        overflowY: 'auto',
      },
      '& button': {
        margin: theme.spacing(0),
        width: '100%',
      },
    },
  },

  workflowCategoriesSkeleton: {
    padding: theme.spacing(1, 0),
    '& .workflow-category-checkbox-items': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
      margin: theme.spacing(2.5, 0, 0, 4),
    },
  },
  checkboxSkeletonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '& .checkbox-label-skeleton-wrapper': {
      width: '100%',
      '& .checkbox-label-skeleton': {
        height: theme.spacing(2.25),
        width: '50%',
      },
    },
    '& .checkbox-skeleton': {
      width: theme.spacing(2.25),
      height: theme.spacing(2.25),
      margin: theme.spacing(0, 2, 0, 0),
    },
  },
}));

const cryptoArray = new Uint32Array(1);
export const getRandomInt = (min: number, max: number): number => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  window.crypto.getRandomValues(cryptoArray);
  const randomNumber = cryptoArray[0] / (0xffffffff + 1);
  return Math.floor(randomNumber * (maxFloored - minCeiled + 1)) + minCeiled;
};
export const CheckboxSkeleton = () => {
  const classes = useStyles();
  return (
    <div className={classes.checkboxSkeletonWrapper}>
      <div>
        <DotSkeleton className="checkbox-skeleton" variant="rectangular" />
      </div>
      <div className="checkbox-label-skeleton-wrapper">
        <DotSkeleton
          className="checkbox-label-skeleton"
          variant="rectangular"
        />
      </div>
    </div>
  );
};
export const WorkflowCategoriesSkeleton = () => {
  const classes = useStyles();
  return (
    <div className={classes.workflowCategoriesSkeleton}>
      <CheckboxSkeleton />
      <div className="workflow-category-checkbox-items">
        {[...Array(getRandomInt(1, 7))].map((_, index: number) => (
          <CheckboxSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

type workflowCategoryComponentProps = {
  releaseCategories: CategoriesContentActiveList[] | [];
  isLoadingCategories: boolean;
  instance: string;
};

export function WorkflowCategoryComponent({
  releaseCategories,
  isLoadingCategories,
  instance,
}: workflowCategoryComponentProps) {
  const classes = useStyles();
  const [workflowSearch, setWorkflowSearch] = useState<{
    categories: string[];
    author: string;
  }>({
    categories: [],
    author: '',
  });
  const checkboxOptions: CheckboxProps[] = releaseCategories.map(category => ({
    label: category.title,
    value: category.id,
    checked: workflowSearch?.categories?.includes(category.title),
  }));

  useEffect(() => {
    // Reset workflowSearch when instance changes
    setWorkflowSearch({
      categories: [],
      author: '',
    });
  }, [instance]);

  function handleAuthorChange(value: string) {
    workflowSearch.author = value;
  }

  function onCategoryFilterChange(options: CheckboxProps[]) {
    workflowSearch.categories = options
      .filter(option => option.checked)
      .map(option => option.value)
      .filter((value): value is string => value !== undefined);
  }
  return (
    <div className={classes.workflowCatalog}>
      <div className="workflow-drawer-content-left">
        <div>
          {releaseCategories.length > 0 && (
            <DotTypography
              data-testid="category-filter-title"
              variant="subtitle2"
            >
              Categories
            </DotTypography>
          )}
          {isLoadingCategories ? (
            <WorkflowCategoriesSkeleton />
          ) : (
            releaseCategories.length > 0 && (
              <DotCheckboxGroup
                className="categories-filter"
                defaultValues={checkboxOptions.filter(
                  checkboxOption => checkboxOption.checked,
                )}
                onChange={(_event, options) => onCategoryFilterChange(options)}
                options={checkboxOptions}
                showSelectAll
              />
            )
          )}
          <DotInputText
            id="authored-by"
            label="Authored By"
            name="authored-by"
            onChange={e => handleAuthorChange(e.target.value)}
            persistentLabel
            placeholder="Start typing to filter Author"
            value={workflowSearch.author}
          />
        </div>
      </div>
    </div>
  );
}
