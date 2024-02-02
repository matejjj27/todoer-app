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
    cutout: isBig ? "55%" : "0%",
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
          className={`rounded-xl flex self-center bg-${backgroundColor}-800 w-2 h-2 mr-1 dark:text-white`}
        />
        <span className="text-white text-xs">{label}</span>
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
        {percentages.map((percentage) => {
          percentage.map((percent, index) => {
            <span key={index} className="text-gray-500 text-xs">
              {percent}%
            </span>;
          });
          return (
            <div className="flex flex-col items-center">
              {percentage.map((percent) => {
                return (
                  <span className="text-gray-500 text-xs">{percent}%</span>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className={`flex gap-3 ${isBig ? "justify-center py-2" : ""} w-52`}>
      <div className={`h-${height}`}>
        <Pie data={chartData} options={options} />
      </div>
      {isBig && renderPercentages()}

      {!isBig && (
        <div className="flex flex-col justify-center text-gray-500 text-sm">
          {percentages[0][0]}%
        </div>
      )}
    </div>
  );
}
export default PieChart;
