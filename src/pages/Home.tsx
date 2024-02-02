import { ComponentWithSideNav } from "../utils/types.ts";
import withNavigation from "../HOCs/withNavigation.tsx";
import CatBubble from "../components/CatBubble.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../context/TodoProvider.tsx";
import PieChart from "../components/charts/PieChart.tsx";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import CatInfoSquare from "../components/CatInfoSquare.tsx";

Chart.register(CategoryScale);

const Home = ({ isSideNavOpened }: ComponentWithSideNav) => {
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [isNewCategoryClicked, setIsNewCategoryClicked] =
    useState<boolean>(false);
  const { categories, addNewCategory } = useContext(TodoContext);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Todos",
        data: categories.map((data) => {
          let sum = 0;
          data.subCategories.map((sub) => (sum += sub.todos.length));
          return sum;
        }),
        backgroundColor: categories.map((data) => data.color),
        borderColor: "white",
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    setChartData({
      labels: categories?.map((data) => data.name),
      datasets: [
        {
          label: "Todos",
          data: categories.map((data) => {
            let sum = 0;
            data.subCategories.map((sub) => (sum += sub.todos.length));
            return sum;
          }),
          backgroundColor: categories.map((category) => category.color),
          borderColor: "black",
          borderWidth: 1
        }
      ]
    });
  }, [categories]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNewCategoryClicked) {
      inputRef!.current!.focus();
    }
  }, [isNewCategoryClicked]);

  const handleCategoryCreate = () => {
    const trimmedCategoryName = newCategoryName.trim();
    if (trimmedCategoryName !== "") {
      addNewCategory({
        name: trimmedCategoryName,
        subCategories: []
      });
    }
    setIsNewCategoryClicked(false);
    setNewCategoryName("");
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef?.current?.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsNewCategoryClicked(false);
      setNewCategoryName("");
    }
  };

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-850 py-7 p- ${
        isSideNavOpened ? "pl-64" : "pl-0"
      } max-sm:pl-0`}
    >
      <h1
        className={`dark:text-white text-3xl pl-3 pt-0 ${
          !isSideNavOpened ? "ml-16" : ""
        }`}
      >
        Home
      </h1>
      <div className="flex gap-10 ml-1 my-10 justify-center">
        <div className="flex flex-col gap-3">
          {categories.map((category) => {
            return <CatBubble category={category} />;
          })}

          {isNewCategoryClicked ? (
            <div className="rounded-xl flex bg-gray-200 dark:bg-gray-750 p-2 h-14 w-56">
              <div className="rounded-xl flex bg-gray-500 py-2 w-1 ml-0.5 mr-0 dark:text-white" />
              <div className="text-gray-900 dark:text-white">
                <input
                  ref={inputRef}
                  name="category-label"
                  placeholder="Category..."
                  className={`cursor-pointer ml-3 w-44 text-gray-900 dark:text-white bg-transparent overflow-hidden outline-none`}
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onBlur={handleCategoryCreate}
                  onKeyDown={handleEnterKey}
                />
              </div>
            </div>
          ) : (
            <div
              className="cursor-pointer rounded-xl justify-center flex bg-blue-800 p-2 w-56"
              onClick={() => setIsNewCategoryClicked(true)}
            >
              <h1 className="text-white text-xs">+ NEW CATEGORY</h1>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex  flex-wrap gap-4 w-60">
            {categories.map((category) => {
              return <CatInfoSquare category={category} />;
            })}
          </div>
          <div className="rounded-xl bg-gray-200 dark:bg-gray-750 p-2 w-60">
            <PieChart chartData={chartData} height={14} isBig />
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeWithNavigation = withNavigation(Home);
export default HomeWithNavigation;
