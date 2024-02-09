import { ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string;
  borderWidth: number;
}

interface PieChartProps {
  chartData: {
    labels: string[];
    datasets: Dataset[];
  };
  height: number;
  isBig?: boolean;
}

function PieChart({ chartData, height, isBig }: PieChartProps) {
  const options: ChartOptions<"pie"> = {
    cutout: isBig ? "50%" : "0%",
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const legendItems = chartData.labels.map((label, index) => {
    const backgroundColor = chartData.datasets[0].backgroundColor[index];
    return (
      <div key={index} className="flex">
        <div
          style={{ backgroundColor: backgroundColor }}
          className={`rounded-xl flex self-center w-2 h-2 mr-1 dark:text-white`}
        />
        <span className=" text-gray-900 dark:text-gray-50 text-xs">
          {label}
        </span>
      </div>
    );
  });

  const percentages = chartData.datasets.map((dataSet) => {
    const sum = dataSet.data.reduce((acc, dataItem) => acc + dataItem, 0);

    const percentage = dataSet.data.map((dataItem) => {
      const percentageValue = (dataItem / sum) * 100;
      return percentageValue.toFixed(0);
    });

    return percentage;
  });

  const renderPercentages = () => {
    return (
      <>
        <div className="flex flex-col justify-center">{legendItems}</div>
        {percentages.map((percentage, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              {percentage.map((percent, index) => {
                return (
                  <span
                    key={index}
                    className="text-gray-600 dark:text-gray-500 text-xs"
                  >
                    {percent === "NaN" ? 0 : percent}%
                  </span>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div
      className={`flex gap-4 ${
        isBig ? "justify-center items-center py-2" : ""
      } w-56`}
    >
      <div className={`h-${height} w-${height} ${isBig ? "h-24 w-24" : ""}`}>
        <Pie data={chartData} options={options} />
      </div>
      {isBig && renderPercentages()}

      {!isBig && (
        <div className="flex flex-col justify-center text-gray-600 dark:text-gray-500 text-xs">
          {percentages[0][0] === "NaN" ? 0 : percentages[0][0]}%
        </div>
      )}
    </div>
  );
}
export default PieChart;
