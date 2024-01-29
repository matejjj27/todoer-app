import { ReactNode, createContext, useEffect, useState } from "react";
import { ITodo, ICategory, ISubCategory } from "../utils/types";
import useApi from "../hooks/useApi";

interface Todos {
  categories: ICategory[];
  currentCategory: ICategory | undefined;
  findCategoryById: (id: string) => Promise<void>;
  getCategories: () => Promise<ICategory>;
  addNewCategory: (newCategory: ICategory) => void;
  addNewSubCategory: (newSubCategory: ISubCategory) => void;
  addNewTodo: (newTodo: ITodo) => void;
  moveTodo: (
    newCategory: ICategory,
    movedTodoID: string,
    destinationSubCategoryId: string
  ) => void;
  editCategory: (newCategory: ICategory) => void;
  editSubCategory: (newSubcategory: ISubCategory) => void;
  editTodo: (newTodo: ITodo) => void;
  deleteCategory: (categoryId: string) => void;
  deleteSubCategory: (subCategoryId: string) => void;
  deleteTodo: (todoId: string) => void;
}

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoContext = createContext<Todos>({} as Todos);

const TodoProvider = ({ children }: TodoProviderProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentCategory, setCurrentCategory] = useState<ICategory>();

  const { get, post, patch, del } = useApi();

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = async () => {
    return await get("/categories").then((res) => {
      setCategories(res.data);
      return res.data;
    });
  };

  const findCategoryById = async (id: string) => {
    const categories = await getCategories();
    categories.map((category: ICategory) => {
      if (category.id === id) {
        setCurrentCategory(category);
      }
    });
  };

  const addNewCategory = (newCategory: ICategory) => {
    post("/categories", newCategory).then(() => {
      getCategories();
    });
  };

  const addNewSubCategory = (newSubCategory: ISubCategory) => {
    post("/sub-categories", newSubCategory).then(() => {
      if (currentCategory?.id) findCategoryById(currentCategory?.id);
    });
  };

  const addNewTodo = (newTodo: ITodo) => {
    post("/todos", newTodo).then(() => {
      if (currentCategory?.id) findCategoryById(currentCategory?.id);
    });
  };

  const moveTodo = (
    newCategory: ICategory,
    movedTodoID: string,
    destinationSubCategoryId: string
  ) => {
    patch(`/categories/moveTodo/${newCategory.id}`, {
      ...newCategory,
      destinationSubCategoryId,
      todoId: movedTodoID
    }).then(() => {
      if (currentCategory?.id) findCategoryById(currentCategory?.id);
    });
  };

  const editCategory = (newCategory: ICategory) => {
    patch(`/categories/${newCategory.id}`, newCategory).then(() => {
      if (currentCategory?.id) findCategoryById(currentCategory?.id);
    });
  };

  const editSubCategory = (newSubCategory: ISubCategory) => {
    patch(`/sub-categories/${newSubCategory.id}`, newSubCategory);
  };

  const editTodo = (newTodo: ITodo) => {
    patch(`/todos/${newTodo.id}`, newTodo).then(() => {
      if (currentCategory?.id) findCategoryById(currentCategory?.id);
    });
  };

  const deleteCategory = (categoryId: string) => {
    del(`/categories/${categoryId}`).then(() => {
      if (currentCategory?.id) findCategoryById(currentCategory?.id);
    });
  };

  const deleteSubCategory = (subCategoryId: string) => {
    del(`/sub-categories/${subCategoryId}`).then(() => {
      if (currentCategory)
        setCurrentCategory({
          ...currentCategory,
          subCategories: currentCategory.subCategories.filter(
            (subCategory) => subCategory.id !== subCategoryId
          )
        });
    });
  };

  const deleteTodo = (todoId: string) => {
    del(`/todos/${todoId}`).then(() => {
      if (currentCategory?.id) findCategoryById(currentCategory?.id);
    });
  };

  const value = {
    categories,
    currentCategory,
    findCategoryById,
    getCategories,
    addNewCategory,
    addNewSubCategory,
    addNewTodo,
    moveTodo,
    editCategory,
    editSubCategory,
    editTodo,
    deleteCategory,
    deleteSubCategory,
    deleteTodo
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
