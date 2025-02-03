"use client";
import { Bar } from "@ant-design/plots";

const data = [
  { year: "1951 year", value: 38 },
  { year: "1952 year", value: 52 },
  { year: "1956 year", value: 261 },
  { year: "1957 year", value: 45 },
  { year: "1958 year", value: 48 },
];

const ChartBar = () => {
  const config = {
    data,
    xField: "year",
    yField: "value",
    shapeField: "hollow",
    colorField: "year",
    legend: {
      color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    },
  };
  return <Bar {...config} />;
};

export default ChartBar;
