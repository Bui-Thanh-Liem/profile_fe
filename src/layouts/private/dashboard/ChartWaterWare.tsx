"use client";
import { Liquid } from "@ant-design/plots";

const ChartWaterWare = () => {
  const config = {
    percent: 0.7,
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };
  return <Liquid {...config} />;
};

export default ChartWaterWare;
