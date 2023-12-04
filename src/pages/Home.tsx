import { useContext } from "react";
import { DropResult } from "react-beautiful-dnd";
import {
  DragDropContext,
  Droppable,
  DraggableLocation
} from "react-beautiful-dnd";
import { PlusIcon } from "@heroicons/react/24/solid";
import { TodoContext } from "../context/TodoProvider.tsx";
import { ComponentWithSideNav, ITodo } from "../utils/types.ts";
import TodoCard from "../components/TodoCard.tsx";
import withNavigation from "../HOCs/withNavigation.tsx";
import { UIContext } from "../context/UIProvider.tsx";

const Home = ({ isSideNavOpened }: ComponentWithSideNav) => {
  const { isDarkMode } = useContext(UIContext);
  const { appData, addNewCategory, editCategories } = useContext(TodoContext);
  const { categories: todoCategories } = appData;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sourceIndex = +source.droppableId;
    const destinationIndex = +destination.droppableId;

    if (sourceIndex === destinationIndex) {
      // Reorder todos within the same category
      const updatedTodos = reorderTodos(
        todoCategories[sourceIndex]?.todos,
        source.index,
        destination.index
      );

      const newCategories = [...todoCategories];
      newCategories[sourceIndex] = {
        ...todoCategories[sourceIndex],
        todos: updatedTodos
      };

      editCategories(newCategories);
    } else {
      // Move todo to another category
      const result = move(
        todoCategories[sourceIndex]?.todos,
        todoCategories[destinationIndex]?.todos,
        source,
        destination
      );

      const newCategories = [...todoCategories];
      newCategories[sourceIndex] = {
        ...todoCategories[sourceIndex],
        todos: result[source.droppableId]
      };
      newCategories[destinationIndex] = {
        ...todoCategories[destinationIndex],
        todos: result[destination.droppableId]
      };

      editCategories(newCategories.filter((item) => item.todos.length));
    }
  };

  const reorderTodos = (
    list: ITodo[],
    startIndex: number,
    endIndex: number
  ) => {
    const updatedTodos = [...list];
    const [removed] = updatedTodos.splice(startIndex, 1);
    updatedTodos.splice(endIndex, 0, removed);
    return updatedTodos;
  };

  const move = (
    source: ITodo[] | undefined,
    destination: ITodo[] | undefined,
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(source || []);
    const destClone = Array.from(destination || []);

    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    return {
      [droppableSource.droppableId]: sourceClone,
      [droppableDestination.droppableId]: destClone
    };
  };

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-850 py-7 p- ${
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
        <DragDropContext onDragEnd={onDragEnd}>
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
