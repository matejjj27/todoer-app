import { useContext, useEffect, useState } from "react";
import { ICategory } from "../utils/types";
import PieChart from "./charts/PieChart";
import { UIContext } from "../context/UIProvider";

interface CatInfoSquareProps {
  category: ICategory;
}

const CatInfoSquare = ({ category }: CatInfoSquareProps) => {
  const { isDarkMode } = useContext(UIContext);
  const todosBySubCat = category.subCategories.map((data) => {
    return data.todos.length;
  });

  const totalTodos = todosBySubCat.reduce((acc, current) => acc + current, 0);

  const completedTodos = category.subCategories
    .flatMap((data) => data.todos)
    .filter((todo) => todo.isCompleted);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Todos",
        data: [completedTodos.length, totalTodos - completedTodos.length],
        backgroundColor: ["#202A37", "rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    setChartData({
      labels: [],
      datasets: [
        {
          label: "Todos",
          data: [completedTodos.length, totalTodos - completedTodos.length],
          backgroundColor: [
            `${category.color}`,
            isDarkMode ? "#202A37" : "#ebedef"
          ],
          borderColor: "transparent",
          borderWidth: 1
        }
      ]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, isDarkMode]);

  return (
    <div className="flex flex-col rounded-xl bg-gray-200 dark:bg-gray-750 p-2 w-28">
      <div className="mb-2 ml-0.5">
        <div className={`chart-border border-${category.color}-700`} />
        <PieChart chartData={chartData} height={6} />
      </div>

      <h1 className="text-gray-900 dark:text-gray-100 text-sm">
        {category?.name}
      </h1>
      {/* <p className="text-gray-900 dark:text-white text-sm">
        {category.subCategories[0].name}
      </p> */}

      {/* <div
        className={`rounded-xl mt-2 bg-${category.color}-200 bg-opacity-20 justify-center flex py-0.5 px-0.5`}
      >
        <p className={`text-${category.color}-500 text-xs text-center`}>
          {category.subCategories[0].todos[0].name}
        </p>
      </div> */}
    </div>
  );
};

export default CatInfoSquare;
