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
