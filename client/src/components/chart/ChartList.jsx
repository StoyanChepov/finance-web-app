import Chart from "./Chart";

export default function ChartList() {
  // const [expenses] = getAllCharts();
  const [charts] = [
    [
      {
        _id: 1,
        data: {
          labels: ["2020", "2021", "2022", "2023", "2024"],
          datasets: [
            {
              label: "Income",
              data: [20000, 30000, 25000, 40000, 60000],
              borderColor: "rgb(75, 192, 192)",
            },
          ],
        },
        options: {},
      },
      {
        _id: 2,
        data: {
          labels: ["2020", "2021", "2022", "2023", "2024"],
          datasets: [
            {
              label: "Income",
              data: [20000, 30000, 25000, 40000, 60000],
              borderColor: "rgb(75, 192, 192)",
            },
          ],
        },
        options: {},
      },
    ],
  ];
  console.log(charts);

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
