import { ICategory } from "../utils/types";

interface CatBubbleProps {
  category: ICategory;
}

const CatBubble = ({ category }: CatBubbleProps) => {
  const { name, color } = category;
  const todos = 1;

  return (
    <div className="rounded-xl justify-between flex bg-gray-200 dark:bg-gray-750 p-2 w-56">
      <div className="flex">
        <div
          className={`rounded-xl flex bg-${color}-800 py-2 w-1 ml-0.5 mr-2 dark:text-white`}
        />
        <div className=" flex-col gap-5">
          <h1 className="text-gray-950 dark:text-white">{name}</h1>
          <h3 className="text-gray-600 dark:text-gray-500 text-xs">
            {todos} todos
          </h3>
        </div>
      </div>

      <div
        className="cursor-pointer self-center pb-0 mr-2"
        // onClick={() => setIsEditClicked(true)}
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
    </div>
  );
};

export default CatBubble;
