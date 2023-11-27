/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useEffect, useState } from "react";
import { IAppData, ITodo, ITodoCategory } from "../utils/types";
import useTodoCategories from "../hooks/useTodoCategories";

interface Todos {
  appData: IAppData;
  isLoading: boolean;
  getTodoCategories: () => void;
  editCategories: (newCategories: ITodoCategory[]) => void;
  addNewCategory: (newCategory: ITodoCategory) => void;
  deleteCategory: (category: ITodoCategory) => void;
  editCategory: (category: ITodoCategory) => void;
  addNewTodo: (category: ITodoCategory) => void;
  completeTodo: (todo: ITodo, category: ITodoCategory) => void;
  editTodo: (todo: ITodo, category: ITodoCategory) => void;
  deleteTodo: (todo: ITodo, category: ITodoCategory) => void;
}

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoContext = createContext<Todos>({} as Todos);

const TodoProvider = ({ children }: TodoProviderProps) => {
  const data = useTodoCategories();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [appData, setAppData] = useState<IAppData>({});

  const editCategories = (newCategories: ITodoCategory[]) => {
    localStorage.setItem(
      "appData",
      JSON.stringify({
        ...appData,
        categories: newCategories
      })
    );
    setAppData((prev) => {
      return {
        ...prev,
        categories: newCategories
      };
    });
  };

  const addNewCategory = (newCategory: ITodoCategory) => {
    localStorage.setItem(
      "appData",
      JSON.stringify({
        ...appData,
        categoryCounter: appData.categoryCounter + 1,
        categories: [...appData.categories, newCategory]
      })
    );
    setAppData((prev) => {
      return {
        ...prev,
        categoryCounter: prev.categoryCounter + 1,
        categories: [...prev.categories, newCategory]
      };
    });
  };

  const deleteCategory = (category: ITodoCategory) => {
    const newCategories = appData?.categories?.filter(
      (cat) => category.id !== cat.id
    );
    localStorage.setItem(
      "appData",
      JSON.stringify({ ...appData, categories: newCategories })
    );
    setAppData((prev) => {
      return { ...prev, categories: newCategories };
    });
    console.log({ ...appData, categories: newCategories }, "after delete");
  };

  const editCategory = (category: ITodoCategory) => {
    const newCategories = appData.categories.map((cat) => {
      if (category.id === cat.id) return category;
      return cat;
    });
    localStorage.setItem(
      "appData",
      JSON.stringify({ ...appData, categories: newCategories })
    );
    setAppData((prev) => {
      return { ...prev, categories: newCategories };
    });
  };

  const addNewTodo = (todoCategory: ITodoCategory) => {
    const newTodo: ITodo = {
      id: `${appData.todoCounter + 1}`,
      label: `todo ${appData.todoCounter + 1}`,
      isCompleted: false
    };
    const updatedCategory = {
      ...todoCategory,
      todos: [...todoCategory.todos, newTodo]
    };
    const newCategories = appData.categories.map((item) => {
      if (item.id === todoCategory.id) return updatedCategory;
      return item;
    });

    localStorage.setItem(
      "appData",
      JSON.stringify({
        ...appData,
        todoCounter: appData.todoCounter + 1,
        categories: newCategories
      })
    );
    setAppData((prev) => {
      return {
        ...prev,
        todoCounter: prev.todoCounter + 1,
        categories: newCategories
      };
    });
  };

  const completeTodo = (todo: ITodo, todoCategory: ITodoCategory) => {
    const newTodos = todoCategory.todos.map((item) => {
      if (todo.id === item.id)
        return { ...todo, isCompleted: !item.isCompleted };
      return item;
    });
    editCategory({ ...todoCategory, todos: newTodos });
  };

  const editTodo = (todo: ITodo, todoCategory: ITodoCategory) => {
    const newTodos = todoCategory.todos.map((item) => {
      if (todo.id === item.id) return todo;
      return item;
    });
    editCategory({ ...todoCategory, todos: newTodos });
  };

  const deleteTodo = (todo: ITodo, todoCategory: ITodoCategory) => {
    const newTodos = todoCategory.todos.filter((item) => {
      if (todo.id !== item.id) return item;
    });
    editCategory({ ...todoCategory, todos: newTodos });
  };

  const getTodoCategories = async () => {
    setIsLoading(true);

    const newTodos = await JSON.parse(localStorage.getItem("appData"));
    setAppData(newTodos || data);

    setIsLoading(false);
  };

  useEffect(() => {
    getTodoCategories();
  }, []);

  const value = {
    appData,
    isLoading,
    getTodoCategories,
    editCategories,
    addNewCategory,
    deleteCategory,
    editCategory,
    addNewTodo,
    completeTodo,
    editTodo,
    deleteTodo
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
