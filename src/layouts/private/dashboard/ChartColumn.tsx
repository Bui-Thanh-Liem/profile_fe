"use client";
import React from "react";
import { Column } from "@ant-design/charts";

const data = [
  { type: "Jan", value: 30 },
  { type: "Feb", value: 50 },
  { type: "Mar", value: 70 },
  { type: "Apr", value: 40 },
  { type: "May", value: 60 },
  { type: "Jun", value: 80 },
  { type: "Jul", value: 90 },
  { type: "Aug", value: 75 },
  { type: "Sep", value: 65 },
  { type: "Oct", value: 85 },
  { type: "Nov", value: 55 },
  { type: "Dec", value: 95 },
];

const ChartColumn: React.FC = () => {
  const config = {
    data,
    xField: "type",
    yField: "value",
    // label: { position: "middle" },
    columnWidthRatio: 0.8,
    style: {
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };

  return <Column {...config} />;
};

export default ChartColumn;
