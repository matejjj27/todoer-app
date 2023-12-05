import { useContext, useState } from "react";
import { ITodoCategory } from "../utils/types";
import { TodoContext } from "../context/TodoProvider";
import { UIContext } from "../context/UIProvider";

interface CategoryProps {
  todoCategory: ITodoCategory;
}

const Category = ({ todoCategory }: CategoryProps) => {
  const { label } = todoCategory;
  useContext(UIContext);
  const { deleteCategory, editCategory } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  const handleEditCategory = () => {
    editCategory({
      ...todoCategory,
      label: editedLabel
    });
    setIsEditing(false);
  };

  return (
    <div
      className="flex justify-between gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        name="category-label"
        onFocus={() => setIsEditing(true)}
        className={`${
          isEditing ? "" : "cursor-pointer"
        } flex-grow text-2xl font-bold bg-transparent text-gray-900 dark:text-white overflow-hidden whitespace-nowrap max-w-full border-none outline-none`}
        value={editedLabel}
        onChange={(e) => setEditedLabel(e.target.value)}
        onBlur={handleEditCategory}
      />
      <div className="cursor-pointer self-center text-gray-900 dark:text-white">
        {isHovered && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 22 22"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => deleteCategory(todoCategory)}
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

export default Category;
