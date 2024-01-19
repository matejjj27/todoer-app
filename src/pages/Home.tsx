import { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { PlusIcon } from "@heroicons/react/24/solid";
import { TodoContext } from "../context/TodoProvider.tsx";
import { ComponentWithSideNav } from "../utils/types.ts";
import TodoCard from "../components/TodoCard.tsx";
import withNavigation from "../HOCs/withNavigation.tsx";
import { UIContext } from "../context/UIProvider.tsx";
import useDragAndDrop from "../hooks/useDragAndDrop.tsx";

const Home = ({ isSideNavOpened }: ComponentWithSideNav) => {
  const { isDarkMode } = useContext(UIContext);
  const { appData, addNewCategory, editCategories } = useContext(TodoContext);
  const { categories: todoCategories } = appData;

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
        Sticky Wall
      </h1>
      <div className="flex justify-center gap-5 flex-wrap border-2 rounded-lg ml-2 mr-5 p-5 my-8 border-gray-350 dark:border-gray-900">
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, todoCategories, editCategories)
          }
        >
          {todoCategories?.map((todoCategory, index) => {
            const bgColor = todoCategory.bgColor;
            return (
              <Droppable key={todoCategory.id} droppableId={`${index}`}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`todo-card p-4 rounded-lg shadow-md gap-2 dark:bg-${bgColor}-900 bg-${bgColor}-200`}
                  >
                    <TodoCard todoCategory={todoCategory} />

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
          <div
            className="todo-card text-center justify-center cursor-pointer shadow-md dark:bg-gray-750 bg-gray-350"
            onClick={() =>
              addNewCategory({
                label: `Category ${appData.categoryCounter + 1}`,
                todos: [],
                bgColor: "white",
                id: `${appData.categoryCounter}`
              })
            }
          >
            <PlusIcon height={60} color={isDarkMode ? "white" : "black"} />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

const HomeWithNavigation = withNavigation(Home);
export default HomeWithNavigation;
