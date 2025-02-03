"use client";
import React from "react";
import { Line } from "@ant-design/charts";

const data = [
  { type: "Jan", value: 30 },
  { type: "Feb", value: 40 },
  { type: "Mar", value: 50 },
  { type: "Apr", value: 20 },
];

const ChartLine: React.FC = () => {
  const config = {
    data,
    xField: "type",
    yField: "value",
    // label: { position: "middle" },
    columnWidthRatio: 0.8,
  };

  return <Line {...config} />;
};

export default ChartLine;
