import { useContext } from "react";
import { DropResult } from "react-beautiful-dnd";
import {
  DragDropContext,
  Droppable,
  DraggableLocation
} from "react-beautiful-dnd";
import { PlusIcon } from "@heroicons/react/24/solid";
import { TodoContext } from "../context/TodoContext.tsx";
import { ITodo } from "../utils/types.ts";
import TodoCard from "../components/TodoCard.tsx";

const Home = () => {
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
    <div className="bg-gray-700 p-20 flex justify-center max-sm:p-10 gap-6 flex-wrap">
      <DragDropContext onDragEnd={onDragEnd}>
        {todoCategories?.map((todoCategory, index) => (
          <Droppable key={todoCategory.id} droppableId={`${index}`}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="todo-card p-4 rounded-lg shadow-md flex flex-col justify-between gap-2"
              >
                <TodoCard todoCategory={todoCategory} />

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>

      <div
        className="todo-card text-center justify-center cursor-pointer"
        onClick={() =>
          addNewCategory({
            label: `Category ${appData.categoryCounter + 1}`,
            todos: [],
            id: `${appData.categoryCounter}`
          })
        }
      >
        <PlusIcon height={60} color="white" />
      </div>
    </div>
  );
};

export default Home;
