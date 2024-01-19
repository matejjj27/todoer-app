import { PlusIcon } from "@heroicons/react/24/solid";
import { ITodoCategory } from "../utils/types";
import Category from "./Category";
import Todo from "./Todo";
import { Draggable } from "react-beautiful-dnd";
import { useContext } from "react";
import { TodoContext } from "../context/TodoProvider";
import { UIContext } from "../context/UIProvider";

interface TodoCardProps {
  todoCategory: ITodoCategory;
}

function TodoCard({ todoCategory }: TodoCardProps) {
  const { addNewTodo } = useContext(TodoContext);
  const { isDarkMode } = useContext(UIContext);

  return (
    <>
      <div className="mt-1 flex flex-col gap-1 justify-between">
        <Category todoCategory={todoCategory} />

        <div>
          {todoCategory?.todos?.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`mt-1 flex flex-col gap-1 py-2 rounded-md hover:bg-${
                    todoCategory.bgColor
                  }-200 dark:hover:bg-${todoCategory.bgColor}-700 ${
                    snapshot.isDragging
                      ? `bg-${todoCategory.bgColor}-200 dark:bg-${todoCategory.bgColor}-700`
                      : ""
                  }`}
                >
                  <Todo key={todo.id} todo={todo} todoCategory={todoCategory} />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      </div>
      <div
        className="cursor-pointer self-center"
        onClick={() => addNewTodo(todoCategory)}
      >
        <PlusIcon height={22} color={isDarkMode ? "white" : "black"} />
      </div>
    </>
  );
}

export default TodoCard;
