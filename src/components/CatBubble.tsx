import { useContext, useEffect, useRef, useState } from "react";
import { ICategory } from "../utils/types";
import { TodoContext } from "../context/TodoProvider";
import { UIContext } from "../context/UIProvider";

interface CatBubbleProps {
  category: ICategory;
}

const CatBubble = ({ category }: CatBubbleProps) => {
  const { name, color, subCategories } = category;
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState<string>(name);

  const { isDarkMode } = useContext(UIContext);
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
          className={`rounded-xl flex w-1.5 ml-0.5 mr-2 dark:text-white`}
        />
        <div className="flex flex-col gap-1 py-1">
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
            viewBox="0 0 25 25"
            fill="none"
            className="w-5 h-5"
          >
            <path
              d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5"
              stroke={isDarkMode ? "lightgray" : "black"}
              strokeWidth={1.3}
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CatBubble;
