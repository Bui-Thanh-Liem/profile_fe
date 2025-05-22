"use client";
import { Liquid } from "@ant-design/plots";

const ChartWaterWare = ({ percent }: { percent: number }) => {
  const config = {
    percent: percent,
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
      height: 34,
    },
  };
  return (
    <div>
      <Liquid {...config} height={200} width={200} />
    </div>
  );
};

export default ChartWaterWare;
