import { useContext, useState } from "react";
import { ITodo, ITodoCategory } from "../utils/types";
import { MinusIcon } from "@heroicons/react/24/solid";
import { TodoContext } from "../context/TodoProvider";

interface TodoProps {
  todoCategory: ITodoCategory;
  todo: ITodo;
}

const Todo = ({ todo, todoCategory }: TodoProps) => {
  const { label, isCompleted } = todo;
  const { completeTodo, editTodo, deleteTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  const handleEditTodo = () => {
    editTodo(
      {
        ...todo,
        label: editedLabel
      },
      todoCategory
    );
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between gap-1">
      <div>
        <input
          name="is-completed"
          className="w-3 h-3"
          type="checkbox"
          checked={isCompleted}
          onChange={() => completeTodo(todo, todoCategory)}
        />
      </div>
      <div className="flex justify-between gap-2 text-gray-900 dark:text-white max-w-full">
        <input
          name="todo-label"
          onFocus={() => setIsEditing(true)}
          className={`${isEditing ? "" : "cursor-pointer"} ${
            !isCompleted ? "" : "text-gray-500 dark:text-gray-600 line-through"
          } bg-transparent text-sm overflow-hidden outline-none`}
          value={editedLabel}
          onChange={(e) => setEditedLabel(e.target.value)}
          onBlur={handleEditTodo}
        />
        <div className="cursor-pointer mr-2">
          <MinusIcon
            height={16}
            color="red"
            onClick={() => deleteTodo(todo, todoCategory)}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
