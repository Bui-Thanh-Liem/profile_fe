"use client";
import { Area } from "@ant-design/plots";

const ChartArea = () => {
  const config = {
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/stocks.json",
      transform: [{ type: "filter", callback: (d: { symbol: string; }) => d.symbol === "GOOG" }],
    },
    xField: (d: { date: string | number | Date; }) => new Date(d.date),
    yField: "price",
    style: {
      fill: "linear-gradient(-90deg, white 0%, darkgreen 100%)",
    },
    axis: {
      y: { labelFormatter: "~s" },
    },
    line: {
      style: {
        stroke: "darkgreen",
        strokeWidth: 2,
      },
    },
  };
  return <Area {...config} />;
};

export default ChartArea;
