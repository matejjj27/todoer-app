import { useContext, useState } from "react";
import { ITodo, ITodoCategory } from "../utils/types";
import { TodoContext } from "../context/TodoProvider";

interface TodoProps {
  todoCategory: ITodoCategory;
  todo: ITodo;
}

const Todo = ({ todo, todoCategory }: TodoProps) => {
  const { label, isCompleted } = todo;
  const { completeTodo, editTodo, deleteTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  const handleEditTodo = () => {
    if (editedLabel === "") {
      deleteTodo(todo, todoCategory);
    } else {
      editTodo(
        {
          ...todo,
          label: editedLabel
        },
        todoCategory
      );
      setIsEditing(false);
    }
  };

  return (
    <div
      className="flex justify-between gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-1">
        <div>
          <input
            name="is-completed"
            className="w-3 h-3"
            type="checkbox"
            checked={isCompleted}
            onChange={() => completeTodo(todo, todoCategory)}
          />
        </div>
        <div className="text-gray-900 dark:text-white max-w-full">
          <input
            name="todo-label"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 -1 26 26"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
            onClick={() => deleteTodo(todo, todoCategory)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Todo;
