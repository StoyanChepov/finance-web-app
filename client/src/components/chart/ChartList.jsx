import Chart from "./Chart";
import { GetAggregatedExpenses } from "../../hooks/useExpenseHooks";

export default function ChartList() {
  const [chartDataGroupedByCategory] = GetAggregatedExpenses(1);
  const [chartDataGroupedByMonth] = GetAggregatedExpenses(2);

  const [charts] = [
    [
      {
        _id: 1,
        type: "bar",
        data: {
          labels: chartDataGroupedByCategory.map((data) => data.category),
          datasets: [
            {
              label: "Expense By Category",
              data: chartDataGroupedByCategory.map((data) => data.total),
              borderColor: "rgb(75, 192, 192)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Chart.js Line Chart By Category",
            },
          },
        },
      },
      {
        _id: 2,
        data: {
          labels: chartDataGroupedByMonth.map((data) => data.date),
          datasets: [
            {
              label: "Expense By Month",
              data: chartDataGroupedByMonth.map((data) => data.total),
              borderColor: "rgb(75, 192, 192)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Chart.js Line Chart",
            },
          },
        },
      },
    ],
  ];

  return (
    <div id="chart-list">
      <h1>Charts</h1>
      <div>
        {charts.map((chart) => (
          <Chart key={chart._id} {...chart} />
        ))}
      </div>
    </div>
  );
}
