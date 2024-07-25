import { useContext, useState } from "react";
import { ISubCategory } from "../utils/types";
import { TodoContext } from "../context/TodoProvider";
import { UIContext } from "../context/UIProvider";
import ConfirmationModal from "./ConfirmationModal";

interface CategoryProps {
  todoSubCategory: ISubCategory;
}

const Category = ({ todoSubCategory }: CategoryProps) => {
  const { name } = todoSubCategory;
  useContext(UIContext);
  const { deleteSubCategory, editSubCategory } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editedLabel, setEditedLabel] = useState(name);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditSubCategory = () => {
    if (editedLabel.trim() === "" && todoSubCategory.todos.length === 0) {
      deleteSubCategory(todoSubCategory?.id || "");
    } else {
      editSubCategory({
        ...todoSubCategory,
        name: editedLabel
      });
    }
    setIsEditing(false);
  };

  const confirmDelete = () => {
    deleteSubCategory(todoSubCategory?.id || "");
    setIsEditing(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      className="flex justify-between mr-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        name="category-label"
        placeholder="Enter name..."
        onFocus={() => setIsEditing(true)}
        className={`${
          isEditing ? "" : "cursor-pointer"
        } pr-2 flex-grow text-2xl bg-transparent text-gray-900 dark:text-white overflow-hidden whitespace-nowrap max-w-full border-none outline-none`}
        value={editedLabel}
        onChange={(e) => setEditedLabel(e.target.value)}
        onBlur={handleEditSubCategory}
      />
      <div className="cursor-pointer self-center text-gray-900 dark:text-white hover:bg-gray-100 hover:bg-opacity-20 rounded-lg p-0.5">
        {isHovered && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete this subcategory (${todoSubCategory.name})?`}
      />
    </div>
  );
};

export default Category;
