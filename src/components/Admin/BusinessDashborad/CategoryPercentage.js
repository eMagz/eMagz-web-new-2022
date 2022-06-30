import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    Stocks: 4000,
    Sold: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    Stocks: 3000,
    Sold: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    Stocks: 2000,
    Sold: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    Stocks: 2780,
    Sold: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    Stocks: 1890,
    Sold: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    Stocks: 2390,
    Sold: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    Stocks: 3490,
    Sold: 4300,
    amt: 2100,
  },
];

export default function App() {
  return (
    <BarChart
      width={650}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Sold" stackId="a" fill="#8884d8" />
      <Bar dataKey="Stocks" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
}
