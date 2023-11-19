import withTopNavigation from "../HOCs/withTopNavigation";
import TodoCard from "../components/TodoCard";
import { TodoContext } from "../context/TodoContext.tsx";
import { useContext } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const { appData, addNewCategory } = useContext(TodoContext);
  const { categories: todoCategories } = appData;

  return (
    <div className="bg-gray-700 p-20 flex justify-center max-sm:p-10">
      <div className=" gap-4 p-4 flex justify-start border-2 border-gray-800 rounded-lg flex-wrap max-w-4xl">
        {todoCategories?.map((todoCategory) => (
          <TodoCard key={todoCategory.id} todoCategory={todoCategory} />
        ))}

        <div
          className="todo-card text-center justify-center cursor-pointer"
          onClick={() =>
            addNewCategory({
              label: `Category ${appData.categoryCounter + 1}`,
              todos: [],
              id: `${appData.categoryCounter}`
            })
          }
        >
          <PlusIcon height={60} color="white" />
        </div>
      </div>
    </div>
  );
};

const HomeWithTopNavigation = withTopNavigation(Home);
export default HomeWithTopNavigation;
