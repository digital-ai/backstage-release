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
