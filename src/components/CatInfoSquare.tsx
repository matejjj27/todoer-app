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
    <div className="flex flex-col gap-1 rounded-xl bg-gray-200 dark:bg-gray-750 p-2 w-32">
      <div className="mb-2 ml-0.5">
        <div
          style={{ border: `1px solid ${category.color}` }}
          className={`chart-border`}
        />
        <PieChart chartData={chartData} height={6} />
      </div>

      <h1 className="text-gray-900 dark:text-gray-100 text-sm">
        {category?.name}
      </h1>
    </div>
  );
};

export default CatInfoSquare;
