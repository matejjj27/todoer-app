import { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TodoContext } from "../context/TodoProvider.tsx";
import { ComponentWithSideNav } from "../utils/types.ts";
import TodoCard from "../components/TodoCard.tsx";
import withNavigation from "../HOCs/withNavigation.tsx";
import useDragAndDrop from "../hooks/useDragAndDrop.tsx";
import { useParams } from "react-router-dom";

const Category = ({ isSideNavOpened }: ComponentWithSideNav) => {
  const { appData, editCategories, currentCategory } = useContext(TodoContext);
  const { categories: todoCategories } = appData;

  // findCurrentCategory fn so that current category is not lost upon refresh
  const { categoryName } = useParams();
  console.log(categoryName);

  const { onDragEnd } = useDragAndDrop();

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-850 py-6 p- ${
        isSideNavOpened ? "pl-64" : "pl-0"
      } max-sm:pl-0`}
    >
      <h1
        className={`dark:text-white text-3xl pl-3 ${
          !isSideNavOpened ? "ml-16" : ""
        }`}
      >
        {currentCategory?.label}
      </h1>
      <div className="flex justify-center gap-5 flex-wrap border-2 rounded-lg ml-2 mr-5 p-5 my-8 border-gray-350 dark:border-gray-900">
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, todoCategories, editCategories, currentCategory)
          }
        >
          {currentCategory && (
            <Droppable
              key={currentCategory?.id}
              droppableId={`${currentCategory?.id}`}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`todo-card p-4 rounded-lg shadow-md gap-2 dark:bg-${currentCategory.bgColor}-900 bg-${currentCategory.bgColor}-200`}
                >
                  <TodoCard todoCategory={currentCategory} />

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </DragDropContext>
      </div>
    </div>
  );
};

const CategoryWithNavigation = withNavigation(Category);
export default CategoryWithNavigation;
