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
  return (
    <div className="w-1/2">
      <Liquid {...config} />
    </div>
  );
};

export default ChartWaterWare;
