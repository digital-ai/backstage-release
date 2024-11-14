import React from 'react';
import {
  CheckboxProps,
  CssCell,
  CssGrid,
  DotCheckboxGroup, DotInputText,
  DotSkeleton,
  DotTypography
} from "@digital-ai/dot-components";
import { makeStyles } from "@material-ui/core/styles";

const author="testAuthor"
const categories = [
  {
    id: '3',
    title: 'Application Life Cycle Management',
  },
  {
    id: '2',
    title: 'Application onboarding',
  },
  {
    id: '4',
    title: 'Cloud & Container',
  },
  {
    id: '6',
    title: 'Digital.ai Release runner installation',
  },
  {
    id: '1',
    title: 'Infrastructure Service',
  },
  {
    id: '5',
    title: 'Serverless',
  },
]
const workflowSearch = {
  categories: ['Application Life Cycle Management'],
}
const checkboxOptions: CheckboxProps[] = categories.map((category) => ({
  label: category.title,
  value: category.id,
  checked: workflowSearch?.categories?.includes(category.title),
}));

function handleAuthorChange(value: string) {
  console.log( value)
}

function onCategoryFilterChange(options: CheckboxProps[]) {
  console.log(options)
}

const useStyles = makeStyles((theme) => ({
  logoStyle: {
    width: '300px',
  },
  layoutSec: {
    paddingTop: '0',
  },
  '@global': {
    ':root': {
      '--margin-dot': '10.5px',
    },
    '.MuiTypography-root.MuiTypography-body1.MuiFormControlLabel-label': {
      fontSize: '14px',
    },
    '.MuiTypography-subtitle2': {
      fontWeight: '700',
    }
  },
  workflowCatalog: {
    height: '100%',
    maxWidth: '165px',
    width: '100%',
    '& .workflow-drawer-content-left-cell': {
      height: '81vh',
      width: '16vw',
      minHeight: 0,
      [theme.breakpoints.down(719)]: {
        display: 'none',
      },

      '& .workflow-drawer-content-left': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: `1px solid #e3e5e8;`,
        height: '100%',
        padding: theme.spacing(2, 3, 3, 0),
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

export const WorkflowCategoryComponent = () => {
  const classes = useStyles();
  const isLoadingCategories = false;
  return  (
        <CssGrid className={classes.workflowCatalog}>
          <CssCell
              center={false}
              className="workflow-drawer-content-left-cell"
              lg={{start: 1, span: 3}}
              md={{start: 1, span: 3}}
              sm={{start: 1, span: 3}}
              xl={{start: 1, span: 3}}
          >
            <div className="workflow-drawer-content-left">
              <div>
                <div>
                  <DotTypography data-testid="category-filter-title" variant="subtitle2">
                    Categories
                  </DotTypography>
                  {isLoadingCategories ? (
                      <WorkflowCategoriesSkeleton/>
                  ) : (
                      <DotCheckboxGroup
                          className="categories-filter"
                          defaultValues={checkboxOptions.filter((checkboxOption) => checkboxOption.checked)}
                          onChange={(_event, options) => onCategoryFilterChange(options)}
                          options={checkboxOptions}
                          showSelectAll={true}
                      />
                  )}

                  <DotInputText
                      id="authored-by"
                      label="Authored By"
                      name="authored-by"
                      onChange={(e) => handleAuthorChange(e.target.value)}
                      persistentLabel={true}
                      placeholder="Start typing to filter Author"
                      value={author}
                  />

                </div>
              </div>
            </div>
          </CssCell>
          <CssCell
              center={false}
              className="tab-content-cell"
              lg={{start: 4, span: 9}}
              md={{start: 4, span: 9}}
              sm={{start: 1, span: 12}}
              xl={{start: 4, span: 9}}
              xs={{start: 1, span: 12}}
          ></CssCell>
        </CssGrid>
)};


export const WorkflowCategoriesSkeleton = () => {
  const classes = useStyles();
  return (
      <div className={classes.workflowCategoriesSkeleton}>
        <CheckboxSkeleton/>
        <div className="workflow-category-checkbox-items">
          {[...Array(getRandomInt(1, 7))].map((_, index: number) => (
              <CheckboxSkeleton key={index}/>
          ))}
        </div>
      </div>
  );
};
export const CheckboxSkeleton = () => {
  const classes = useStyles();
  return (
      <div className={classes.checkboxSkeletonWrapper}>
        <div>
          <DotSkeleton className="checkbox-skeleton" variant="rectangular"/>
        </div>
        <div className="checkbox-label-skeleton-wrapper">
          <DotSkeleton className="checkbox-label-skeleton" variant="rectangular"/>
        </div>
      </div>
  );
};
const cryptoArray = new Uint32Array(1);
export const getRandomInt = (min: number, max: number): number => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  window.crypto.getRandomValues(cryptoArray);
  const randomNumber = cryptoArray[0] / (0xffffffff + 1);
  return Math.floor(randomNumber * (maxFloored - minCeiled + 1)) + minCeiled;
};