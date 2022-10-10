import type { ChartDataset, ChartOptions } from "chart.js"
import * as ChartJs from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"

ChartJs.Chart.register(
  // Doughnut
  ChartJs.ArcElement,
  // Line
  ChartJs.CategoryScale,
  ChartJs.LinearScale,
  ChartJs.PointElement,
  ChartJs.LineElement,
  ChartJs.LineController,
  // Bar
  ChartJs.BarElement
)

const BAR_OPTION: ChartOptions<"bar"> = {
  scales: {
    x: {},
    y: {
      max: 100,
      min: 0,
      ticks: {
        stepSize: 20,
      },
      display: false,
    },
  },
}

export default function Page() {
  return (
    <div>
      <div style={{ width: "216px", height: "216px" }}>
        <Doughnut
          data={{
            labels: [],
            datasets: [
              {
                data: [45, 25, 10, 8, 5, 3, 2],
                backgroundColor: ["#ff6385", "#ff9f40", "#ffcd56", "#4bc0c0", "#36a2eb", "#9966ff", "#c9cbcf"],
              },
            ],
          }}
        />
      </div>
      <div style={{ width: "400px", height: "216px" }}>
        <Bar
          data={{
            labels: ["3月", "4月", "5月", "6月", "7月", "8月", "9月"],
            datasets: [
              // NOTE: comboの時の型が合わない
              // https://www.chartjs.org/docs/latest/samples/other-charts/combo-bar-line.html
              {
                type: "line",
                data: [75, 55, 75, 81, 70, 55, 60],
                fill: false,
                borderColor: "#ffcd56",
                backgroundColor: "#ffcd56",
                tension: 0.1,
              } as ChartDataset<"line"> as any,
              {
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: "#4bc0c0",
                backgroundColor: "#4bc0c0",
              },
            ],
          }}
          options={BAR_OPTION}
        />
      </div>
    </div>
  )
}
