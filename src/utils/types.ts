export interface ITodo {
  id?: string;
  name: string;
  isCompleted?: boolean;
  dueDate?: Date;
  subCategory: ISubCategory;
}

export interface ICategory {
  id?: string;
  name: string;
  color?: string;
  subCategories: ISubCategory[];
}
export interface ISubCategory {
  id?: string;
  name: string;
  color?: string;
  todos: ITodo[];
  category: ICategory;
}

export interface ComponentWithSideNav {
  isSideNavOpened?: boolean;
  toggleSideNav?: () => void;
}
