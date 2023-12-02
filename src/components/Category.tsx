import { useContext, useState } from "react";
import { ITodoCategory } from "../utils/types";
import { MinusIcon } from "@heroicons/react/24/solid";
import { TodoContext } from "../context/TodoContext";

interface CategoryProps {
  todoCategory: ITodoCategory;
}

const Category = ({ todoCategory }: CategoryProps) => {
  const { label } = todoCategory;
  const { deleteCategory, editCategory } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  const handleEditCategory = () => {
    editCategory({
      ...todoCategory,
      label: editedLabel
    });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between gap-2">
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
      <div className="cursor-pointer self-center">
        <MinusIcon
          height={25}
          color="red"
          onClick={() => deleteCategory(todoCategory)}
        />
      </div>
    </div>
  );
};

export default Category;
