import { PlusIcon } from "@heroicons/react/24/solid";
import { ISubCategory } from "../utils/types";
import Category from "./Category";
import Todo from "./Todo";
import { Draggable } from "react-beautiful-dnd";
import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../context/TodoProvider";
import { UIContext } from "../context/UIProvider";

interface TodoCardProps {
  todoSubCategory: ISubCategory;
  isDraggingOver: boolean;
}

function TodoCard({ todoSubCategory, isDraggingOver }: TodoCardProps) {
  const [newTodoName, setNewTodoName] = useState<string>("");
  const [isNewTodoClicked, setIsNewTodoClicked] = useState<boolean>(false);
  const { addNewTodo } = useContext(TodoContext);
  const { isDarkMode } = useContext(UIContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNewTodoClicked) {
      inputRef!.current!.focus();
    }
  }, [isNewTodoClicked]);

  const handleTodoCreate = () => {
    const trimmedTodoName = newTodoName.trim();
    if (trimmedTodoName !== "" && todoSubCategory) {
      addNewTodo({
        name: trimmedTodoName,
        subCategory: todoSubCategory
      });
    }
    setIsNewTodoClicked(false);
    setNewTodoName("");
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef?.current?.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsNewTodoClicked(false);
      setNewTodoName("");
    }
  };

  return (
    <>
      <div className="mt-1 flex flex-col gap-1 justify-between">
        <Category todoSubCategory={todoSubCategory} />

        <div>
          {todoSubCategory?.todos?.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo?.id || ""} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className={`mt-1 flex flex-col gap-1 py-1.5 rounded-md hover:bg-${
                    todoSubCategory.color
                  }-200 dark:hover:bg-${todoSubCategory.color}-700 ${
                    snapshot.isDragging
                      ? `bg-${todoSubCategory.color}-300 dark:bg-${todoSubCategory.color}-800`
                      : ""
                  }`}
                >
                  <Todo
                    key={todo.id}
                    todo={todo}
                    todoSubCategory={todoSubCategory}
                    provided={provided}
                  />
                </div>
              )}
            </Draggable>
          ))}
        </div>
        {isNewTodoClicked && (
          <div className="text-gray-900 dark:text-white max-w-full pt-2">
            <input
              ref={inputRef}
              name="todo-label"
              placeholder="Todo..."
              className={`cursor-pointer ml-6 text-gray-900 dark:text-white bg-transparent text-sm overflow-hidden outline-none`}
              value={newTodoName}
              onChange={(e) => setNewTodoName(e.target.value)}
              onBlur={handleTodoCreate}
              onKeyDown={handleEnterKey}
            />
          </div>
        )}
      </div>
      {!isDraggingOver && (
        <div
          className="cursor-pointer self-center"
          onClick={() => setIsNewTodoClicked(true)}
        >
          <PlusIcon height={22} color={isDarkMode ? "white" : "black"} />
        </div>
      )}
    </>
  );
}

export default TodoCard;
