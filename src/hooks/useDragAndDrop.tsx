import { DraggableLocation, DropResult } from "react-beautiful-dnd";
import { ITodo, ITodoCategory } from "../utils/types";

const useDragAndDrop = () => {
  const onDragEnd = (
    result: DropResult,
    todoCategories: ITodoCategory[],
    editCategories: (
      newCategories: ITodoCategory[],
      selectedCategory?: ITodoCategory
    ) => void,
    selectedCategory?: ITodoCategory
  ) => {
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

      editCategories(newCategories, selectedCategory);
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

      editCategories(
        newCategories.filter((item) => item.todos.length),
        selectedCategory
      );
    }
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

  return { onDragEnd, move, reorderTodos };
};

export default useDragAndDrop;
