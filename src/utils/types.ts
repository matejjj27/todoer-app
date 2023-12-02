export interface ITodo {
  id: string;
  label: string;
  isCompleted: boolean;
}

export interface ITodoCategory {
  id: string;
  label: string;
  todos: ITodo[];
}

export interface IAppData {
  categoryCounter: number;
  todoCounter: number;
  categories: ITodoCategory[];
}

export interface ComponentWithSideNav {
  isSideNavOpened?: boolean;
  toggleSideNav?: () => void;
}
