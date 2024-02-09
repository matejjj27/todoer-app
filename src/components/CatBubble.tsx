import { useContext, useEffect, useRef, useState } from "react";
import { ICategory } from "../utils/types";
import { TodoContext } from "../context/TodoProvider";

interface CatBubbleProps {
  category: ICategory;
}

const CatBubble = ({ category }: CatBubbleProps) => {
  const { name, color, subCategories } = category;
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState<string>(name);

  const { editCategory } = useContext(TodoContext);

  const totalTodos = subCategories.reduce((acc, subCategory) => {
    return acc + subCategory.todos.length;
  }, 0);

  const categoryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditClicked) {
      categoryInputRef!.current!.focus();
    }
  }, [isEditClicked]);

  const handleEditCategory = () => {
    const trimmedNewCategoryName = newCategoryName.trim();
    if (trimmedNewCategoryName !== "" && category) {
      editCategory({
        ...category,
        name: trimmedNewCategoryName
      });
    } else {
      categoryInputRef!.current!.focus();
    }
    setIsEditClicked(false);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      categoryInputRef?.current?.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsEditClicked(false);
      setNewCategoryName("");
    }
  };

  return (
    <div className="rounded-xl justify-between flex bg-gray-200 dark:bg-gray-750 p-2 w-60">
      <div className="flex">
        <div
          style={{ backgroundColor: color }}
          className={`rounded-xl flex py-2 w-1 ml-0.5 mr-2 dark:text-white`}
        />
        <div className=" flex-col gap-5">
          {!isEditClicked ? (
            <h1 className="text-gray-950 dark:text-white">{name}</h1>
          ) : (
            <input
              ref={categoryInputRef}
              name="category-label"
              placeholder="Category..."
              className={`cursor-pointer bg-transparent text-gray-900 dark:text-white overflow-hidden whitespace-nowrap border-none outline-none w-40`}
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onBlur={handleEditCategory}
              onKeyDown={handleEnterKey}
            />
          )}

          <h3 className="text-gray-600 dark:text-gray-500 text-xs">
            {totalTodos} todos
          </h3>
        </div>
      </div>

      {!isEditClicked && (
        <div
          className="cursor-pointer self-center pb-0 mr-2"
          onClick={() => setIsEditClicked(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 23 23"
            strokeWidth={1.5}
            stroke={"gray"}
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CatBubble;
