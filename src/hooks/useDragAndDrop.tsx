import { DraggableLocation, DropResult } from "react-beautiful-dnd";
import { ITodo, ICategory } from "../utils/types";

const useDragAndDrop = () => {
  const onDragEnd = (
    result: DropResult,
    editCategory: (newCategory: ICategory) => void,
    moveTodo: (
      newCategory: ICategory,
      movedTodoID: string,
      destinationSubCategoryId: string
    ) => void,
    currentCategory?: ICategory
  ) => {
    const { source, destination, draggableId } = result;
    const subCategories = currentCategory?.subCategories || [];

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sourceIndex = +source.droppableId;
    const destinationIndex = +destination.droppableId;

    if (sourceIndex === destinationIndex) {
      // Reorder todos within the same category
      const updatedTodos = reorderTodos(
        subCategories[sourceIndex]?.todos,
        source.index,
        destination.index
      );

      const newSubCategories = [...subCategories];
      newSubCategories[sourceIndex] = {
        ...subCategories[sourceIndex],
        todos: updatedTodos
      };

      if (currentCategory)
        editCategory({ ...currentCategory, subCategories: newSubCategories });
    } else {
      // Move todo to another category
      const result = move(
        subCategories[sourceIndex]?.todos,
        subCategories[destinationIndex]?.todos,
        source,
        destination
      );

      const newSubCategories = [...subCategories];
      newSubCategories[sourceIndex] = {
        ...subCategories[sourceIndex],
        todos: result[source.droppableId]
      };
      newSubCategories[destinationIndex] = {
        ...subCategories[destinationIndex],
        todos: result[destination.droppableId]
      };

      if (currentCategory)
        moveTodo(
          {
            ...currentCategory,
            subCategories: newSubCategories
          },
          draggableId,
          subCategories[destinationIndex]?.id || ""
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
    const destinationClone = Array.from(destination || []);

    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destinationClone.splice(droppableDestination.index, 0, {
      ...removed,
      position: droppableDestination.index
    });

    const updatedDestinationClone = destinationClone.map((todo, index) => ({
      ...todo,
      position: index
    }));

    return {
      [droppableSource.droppableId]: sourceClone,
      [droppableDestination.droppableId]: updatedDestinationClone
    };
  };

  const reorderTodos = (
    list: ITodo[],
    startIndex: number,
    endIndex: number
  ) => {
    if (!list) {
      return [];
    }
    const updatedTodos = list;
    const [removed] = list.splice(startIndex, 1);
    updatedTodos.splice(endIndex, 0, removed);

    const todosWithUpdatedPosition = updatedTodos.map((todo, index) => {
      return {
        ...todo,
        position: index
      };
    });

    return todosWithUpdatedPosition;
  };

  return { onDragEnd, move, reorderTodos };
};

export default useDragAndDrop;
