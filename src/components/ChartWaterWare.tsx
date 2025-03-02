"use client";
import { Liquid } from "@ant-design/plots";

const ChartWaterWare = ({ percent }: { percent: number }) => {
  const config = {
    percent: percent,
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };
  return <Liquid {...config} />;
};

export default ChartWaterWare;
