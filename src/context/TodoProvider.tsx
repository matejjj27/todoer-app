import { ReactNode, createContext, useEffect, useState } from "react";
import { ITodo, ICategory, ISubCategory, ILoadingState } from "../utils/types";
import useApi from "../hooks/useApi";

interface ITodoContext {
  loadingStates: ILoadingState;
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

export const TodoContext = createContext<ITodoContext>({} as ITodoContext);

const TodoProvider = ({ children }: TodoProviderProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentCategory, setCurrentCategory] = useState<ICategory>();
  const [loadingStates, setLoadingStates] = useState<ILoadingState>({
    isFindCategoryByIdLoading: false,
    isGetCategoriesLoading: true,
    isAddNewCategoryLoading: false,
    isAddNewSubCategoryLoading: false,
    isAddNewTodoLoading: false,
    isMoveTodoLoading: false,
    isEditCategoryLoading: false,
    isEditSubCategoryLoading: false,
    isEditTodoLoading: false,
    isDeleteCategoryLoading: false,
    isDeleteSubCategoryLoading: false,
    isDeleteTodoLoading: false
  });

  const { get, post, patch, del } = useApi();

  useEffect(() => {
    getCategories().finally(() =>
      setLoadingStates((prevState) => ({
        ...prevState,
        isGetCategoriesLoading: false
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = async () => {
    setLoadingStates((prevState) => ({
      ...prevState,
      isGetCategoriesLoading: true
    }));
    return await get("/categories")
      .then((res) => {
        setCategories(res.data);
        return res.data;
      })
      .finally(() =>
        setLoadingStates((prevState) => ({
          ...prevState,
          isGetCategoriesLoading: false
        }))
      );
  };

  const findCategoryById = async (id: string) => {
    setLoadingStates((prevState) => ({
      ...prevState,
      isFindCategoryByIdLoading: true
    }));
    const categories = await getCategories();
    categories.map((category: ICategory) => {
      if (category.id === id) {
        setCurrentCategory(category);
      }
    });
    setLoadingStates((prevState) => ({
      ...prevState,
      isFindCategoryByIdLoading: false
    }));
  };

  const addNewCategory = (newCategory: ICategory) => {
    post("/categories", newCategory).then((res) => {
      setCategories((prev) => [...prev, res.data]);
    });
  };

  const addNewSubCategory = (newSubCategory: ISubCategory) => {
    post("/sub-categories", newSubCategory).then((res) => {
      setCurrentCategory((prevCategory) => {
        if (!prevCategory) return prevCategory;
        return {
          ...prevCategory,
          subCategories: [...prevCategory.subCategories, res.data]
        };
      });
    });
  };

  const addNewTodo = (newTodo: ITodo) => {
    post("/todos", newTodo).then((res) => {
      if (
        currentCategory &&
        currentCategory.subCategories.some(
          (subCategory) => subCategory.id === res.data.subCategory.id
        )
      ) {
        setCurrentCategory((prevCategory) => {
          if (!prevCategory) return prevCategory;
          return {
            ...prevCategory,
            subCategories: prevCategory.subCategories.map((subCategory) => {
              if (subCategory.id === res.data.subCategory.id) {
                return {
                  ...subCategory,
                  todos: [...subCategory.todos, res.data]
                };
              }
              return subCategory;
            })
          };
        });
      }
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
      if (currentCategory) {
        const updatedCategory = { ...currentCategory };

        const originalSubCategory = updatedCategory.subCategories.find(
          (subCategory) =>
            subCategory.todos.some((todo) => todo.id === movedTodoID)
        );
        const destinationSubCategory = updatedCategory.subCategories.find(
          (subCategory) => subCategory.id === destinationSubCategoryId
        );

        if (originalSubCategory && destinationSubCategory) {
          const movedTodo = originalSubCategory.todos.find(
            (todo) => todo.id === movedTodoID
          );
          originalSubCategory.todos = originalSubCategory.todos.filter(
            (todo) => todo.id !== movedTodoID
          );

          if (movedTodo) {
            destinationSubCategory.todos.push(movedTodo);
          }

          setCurrentCategory(updatedCategory);
        }
      }
    });
  };

  const editCategory = (newCategory: ICategory) => {
    patch(`/categories/${newCategory.id}`, newCategory).then(() => {
      if (currentCategory?.id === newCategory.id) {
        setCurrentCategory(newCategory);
      }
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === newCategory.id ? newCategory : category
        )
      );
    });
  };

  const editSubCategory = (newSubCategory: ISubCategory) => {
    patch(`/sub-categories/${newSubCategory.id}`, newSubCategory);
  };

  const editTodo = (newTodo: ITodo) => {
    patch(`/todos/${newTodo.id}`, newTodo).then(() => {
      if (currentCategory) {
        setCurrentCategory((prevCategory) => {
          if (!prevCategory) return prevCategory;
          return {
            ...prevCategory,
            subCategories: prevCategory.subCategories.map((subCategory) => ({
              ...subCategory,
              todos: subCategory.todos.map((todo) =>
                todo.id === newTodo.id ? newTodo : todo
              )
            }))
          };
        });
      }
    });
  };

  const deleteCategory = (categoryId: string) => {
    del(`/categories/${categoryId}`).then(() => {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
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
      if (currentCategory) {
        setCurrentCategory((prevCategory) => {
          if (!prevCategory) return prevCategory;
          return {
            ...prevCategory,
            subCategories: prevCategory.subCategories.map((subCategory) => ({
              ...subCategory,
              todos: subCategory.todos.filter((todo) => todo.id !== todoId)
            }))
          };
        });
      }
    });
  };

  const value = {
    loadingStates,
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
