export interface ITodo {
  id?: string;
  name: string;
  isCompleted?: boolean;
  dueDate?: Date;
  position?: number;
  subCategory: ISubCategory;
}

export interface ICategory {
  id?: string;
  name: string;
  color?: string;
  position?: number;
  subCategories: ISubCategory[];
}
export interface ISubCategory {
  id?: string;
  name: string;
  color?: string;
  todos: ITodo[];
  position?: number;
  category: ICategory;
}

export interface ComponentWithSideNav {
  isSideNavOpened?: boolean;
  toggleSideNav?: () => void;
}

export interface ILoadingState {
  isFindCategoryByIdLoading: boolean;
  isGetCategoriesLoading: boolean;
  isAddNewCategoryLoading: boolean;
  isAddNewSubCategoryLoading: boolean;
  isAddNewTodoLoading: boolean;
  isMoveTodoLoading: boolean;
  isEditCategoryLoading: boolean;
  isEditSubCategoryLoading: boolean;
  isEditTodoLoading: boolean;
  isDeleteCategoryLoading: boolean;
  isDeleteSubCategoryLoading: boolean;
  isDeleteTodoLoading: boolean;
}
