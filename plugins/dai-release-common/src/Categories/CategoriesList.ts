/** @public */
export type Categories = {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  content: CategoriesContentList[];
  first: boolean;
  last: boolean;
};

export type CategoriesContentList = {
  id: string;
  title: string;
  active: boolean;
  associatedWorkflowsCount: number;
  type: string;
};

export type CategoriesContentActiveList = {
  id: string;
  title: string;
};

export type ReleaseCategories = {
  activeCategory: CategoriesContentActiveList[];
};
