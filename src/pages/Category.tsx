/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TodoContext } from "../context/TodoProvider.tsx";
import { ComponentWithSideNav } from "../utils/types.ts";
import TodoCard from "../components/TodoCard.tsx";
import withNavigation from "../HOCs/withNavigation.tsx";
import useDragAndDrop from "../hooks/useDragAndDrop.tsx";
import { useParams } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { UIContext } from "../context/UIProvider.tsx";

const Category = ({ isSideNavOpened }: ComponentWithSideNav) => {
  const { isDarkMode } = useContext(UIContext);
  const {
    categories,
    currentCategory,
    editCategory,
    addNewSubCategory,
    findCategoryById
  } = useContext(TodoContext);

  const [newSubCategoryName, setNewSubCategoryName] = useState<string>("");
  const [isNewSubCategoryClicked, setIsNewSubCategoryClicked] =
    useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>(
    currentCategory?.name || ""
  );
  const [isEditing, setIsEditing] = useState(false);

  const { categoryId } = useParams();
  const { onDragEnd } = useDragAndDrop();

  const subCategoryInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNewCategoryName(currentCategory?.name || "");
  }, [currentCategory?.name]);

  useEffect(() => {
    if (isNewSubCategoryClicked) {
      subCategoryInputRef!.current!.focus();
    }
  }, [isNewSubCategoryClicked]);

  useEffect(() => {
    if (categoryId) findCategoryById(categoryId);
  }, [categoryId]);

  const handleEditCategory = () => {
    const trimmedNewCategoryName = newCategoryName.trim();
    if (trimmedNewCategoryName !== "" && currentCategory) {
      editCategory({
        ...currentCategory,
        name: trimmedNewCategoryName
      });
    } else {
      categoryInputRef!.current!.focus();
    }
    setIsEditing(false);
  };

  const handleSubCategoryCreate = () => {
    const trimmedSubCategory = newSubCategoryName.trim();
    if (trimmedSubCategory !== "" && currentCategory) {
      addNewSubCategory({
        name: trimmedSubCategory,
        color: "red",
        todos: [],
        category: currentCategory
      });
    }
    setIsNewSubCategoryClicked(false);
    setNewSubCategoryName("");
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      subCategoryInputRef?.current?.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsNewSubCategoryClicked(false);
      setNewSubCategoryName("");
    }
  };

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-850 py-7 p- ${
        isSideNavOpened ? "pl-64" : "pl-0"
      } max-sm:pl-0`}
    >
      <input
        ref={categoryInputRef}
        name="category-label"
        onFocus={() => setIsEditing(true)}
        placeholder="Category..."
        className={`text-3xl pl-3 ${!isSideNavOpened ? "ml-16" : ""} ${
          isEditing ? "" : "cursor-pointer"
        } mt-1 bg-transparent text-gray-900 dark:text-white overflow-hidden whitespace-nowrap border-none outline-none`}
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        onBlur={handleEditCategory}
      />
      <div className="flex justify-center gap-5 flex-wrap border-2 rounded-lg ml-2 mr-5 p-5 my-8 border-gray-350 dark:border-gray-900">
        <DragDropContext
          onDragEnd={(result) =>
            // onDragEnd(
            //   result,
            //   currentCategory?.subCategories || [],
            //   editCategories,
            //   currentCategory
            // )
            console.log("sd")
          }
        >
          {currentCategory?.subCategories?.map((todoSubCategory, index) => {
            const { color } = todoSubCategory;
            return (
              <Droppable key={todoSubCategory.id} droppableId={`${index}`}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`todo-card p-4 rounded-lg shadow-md gap-2 dark:bg-${color}-900 bg-${color}-200`}
                  >
                    <TodoCard todoSubCategory={todoSubCategory} />

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
          {isNewSubCategoryClicked && (
            <div
              className={`todo-card p-4 rounded-lg shadow-md gap-2 dark:bg-black-900 bg-black-200`}
            >
              <input
                ref={subCategoryInputRef}
                name="sub-category-label"
                placeholder="Sub-Category..."
                className={`cursor-pointer mt-1 text-2xl font-bold bg-transparent text-gray-900 dark:text-white overflow-hidden whitespace-nowrap max-w-full border-none outline-none`}
                value={newSubCategoryName}
                onChange={(e) => setNewSubCategoryName(e.target.value)}
                onBlur={handleSubCategoryCreate}
                onKeyDown={handleEnterKey}
              />
            </div>
          )}
          <div
            className="todo-card text-center justify-center cursor-pointer shadow-md dark:bg-gray-750 bg-gray-350"
            onClick={() => setIsNewSubCategoryClicked(true)}
          >
            <PlusIcon height={60} color={isDarkMode ? "white" : "black"} />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

const CategoryWithNavigation = withNavigation(Category);
export default CategoryWithNavigation;
