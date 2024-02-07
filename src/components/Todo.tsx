import { useContext, useState } from "react";
import { ITodo, ISubCategory } from "../utils/types";
import { TodoContext } from "../context/TodoProvider";
import { DraggableProvided } from "react-beautiful-dnd";

interface TodoProps {
  todoSubCategory: ISubCategory;
  todo: ITodo;
  provided: DraggableProvided;
}

const Todo = ({ todo, todoSubCategory, provided }: TodoProps) => {
  const { name, isCompleted } = todo;
  const { editTodo, deleteTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editedLabel, setEditedLabel] = useState(name);

  const handleEditTodo = () => {
    if (editedLabel.trim() === "") {
      deleteTodo(todo?.id || "");
    } else {
      editTodo({
        ...todo,
        name: editedLabel,
        subCategory: todoSubCategory
      });
      setIsEditing(false);
    }
  };

  return (
    <div
      className="flex justify-between gap-2 pl-1 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...provided.dragHandleProps}
    >
      <div className="flex gap-1">
        <div className="container">
          <div className="round">
            <input
              id={`checkbox-${todo.id}`}
              name="is-completed"
              className="w-3 h-3 ml-1"
              type="checkbox"
              checked={isCompleted}
              onChange={() =>
                editTodo({ ...todo, isCompleted: !todo.isCompleted })
              }
            />
            <label
              htmlFor={`checkbox-${todo.id}`}
              className="border-2 rounded-full dark:border-white border-black"
            />
          </div>
        </div>
        <div className="text-gray-900 dark:text-white max-w-full">
          <input
            name="todo-label"
            placeholder="Todo..."
            onFocus={() => setIsEditing(true)}
            className={`${isEditing ? "" : "cursor-pointer"} ${
              !isCompleted
                ? ""
                : "text-gray-500 dark:text-gray-600 line-through"
            } bg-transparent text-sm overflow-hidden outline-none`}
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            onBlur={handleEditTodo}
          />
        </div>
      </div>
      <div className="cursor-pointer self-center text-gray-900 dark:text-white">
        {isHovered && (
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 -1 26 26"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              onClick={() => deleteTodo(todo?.id || "")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div {...provided.dragHandleProps}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
