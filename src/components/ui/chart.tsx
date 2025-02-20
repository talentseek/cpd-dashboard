"use client"

import { Bar, Line, Pie } from "react-chartjs-2"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
PointElement,
LineElement,
ArcElement,
Title,
Tooltip,
Legend,
ChartData,
ChartOptions
} from "chart.js"

type ChartDataset = {
label: string
data: number[]
backgroundColor: string | string[]
borderColor: string | string[]
borderWidth?: number
fill?: boolean
}

interface BarChartProps {
data?: ChartData<'bar', number[], string>
options?: ChartOptions<'bar'>
}

interface LineChartProps {
data?: ChartData<'line', number[], string>
options?: ChartOptions<'line'>
}

interface PieChartProps {
data?: ChartData<'pie', number[], string>
options?: ChartOptions<'pie'>
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const baseOptions = {
responsive: true,
plugins: {
    legend: {
    position: "top" as const,
    labels: {
        color: "white",
    },
    },
    title: {
    display: false,
    },
},
} as const

const defaultBarOptions: ChartOptions<'bar'> = {
...baseOptions,
scales: {
    x: {
    type: 'category' as const,
    ticks: {
        color: "white",
    },
    grid: {
        color: "rgba(255, 255, 255, 0.2)",
    },
    },
    y: {
    type: 'linear' as const,
    ticks: {
        color: "white",
    },
    grid: {
        color: "rgba(255, 255, 255, 0.2)",
    },
    },
},
}

const defaultLineOptions: ChartOptions<'line'> = {
...baseOptions,
scales: {
    x: {
    type: 'category' as const,
    ticks: {
        color: "white",
    },
    grid: {
        color: "rgba(255, 255, 255, 0.2)",
    },
    },
    y: {
    type: 'linear' as const,
    ticks: {
        color: "white",
    },
    grid: {
        color: "rgba(255, 255, 255, 0.2)",
    },
    },
},
}

const defaultPieOptions: ChartOptions<'pie'> = {
...baseOptions,
}

const defaultLabels = ["January", "February", "March", "April", "May", "June", "July"]

const defaultData = {
  labels: defaultLabels,
  datasets: [
    {
      label: "Dataset 1",
      data: defaultLabels.map(() => Math.random() * 1000),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
      fill: false,
    },
    {
      label: "Dataset 2",
      data: defaultLabels.map(() => Math.random() * 1000),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderColor: "rgba(53, 162, 235, 1)",
      fill: false,
    },
  ],
}

export function BarChart({
data = defaultData,
options = defaultBarOptions,
}: BarChartProps) {
return <Bar options={options} data={data} />
}

export function LineChart({
data = defaultData,
options = defaultLineOptions,
}: LineChartProps) {
return <Line options={options} data={data} />
}

export function PieChart({
data,
options = defaultPieOptions,
}: PieChartProps) {
  const pieData =
    data || {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }
  return <Pie data={pieData} options={options} />
}