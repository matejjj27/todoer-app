import { PlusIcon } from "@heroicons/react/24/solid";
import { ITodoCategory } from "../utils/types";
import Category from "./Category";
import Todo from "./Todo";
import { Draggable } from "react-beautiful-dnd";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { UIContext } from "../context/UIContext";

interface TodoCardProps {
  todoCategory: ITodoCategory;
}

function TodoCard({ todoCategory }: TodoCardProps) {
  const { addNewTodo } = useContext(TodoContext);
  const { isDarkMode } = useContext(UIContext);

  return (
    <div className="flex flex-col">
      <Category todoCategory={todoCategory} />

      <div className="mt-1 flex flex-col gap-1 justify-between">
        <div>
          {todoCategory?.todos?.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`mt-1 flex flex-col gap-1 py-3 rounded-md ${
                    snapshot.isDragging ? "border-gray-400 dark:border-gray-900 border-2" : ""
                  }`}
                >
                  <Todo key={todo.id} todo={todo} todoCategory={todoCategory} />
                </div>
              )}
            </Draggable>
          ))}
        </div>

        <div
          className="cursor-pointer self-center"
          onClick={() => addNewTodo(todoCategory)}
        >
          <PlusIcon
            height={22}
            color={isDarkMode ? "white" : "black"}
            className="cursor-pointer self-center"
          />
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
