import { IPropCardPercentAdmin } from "@/interfaces/propsComponent.interface";
import { Card } from "antd";
import ChartWaterWare from "../ChartWaterWare";

export function CardPercentAdmin({
  title,
  value,
  percent,
  // link,
}: IPropCardPercentAdmin) {
  return (
    <Card>
      <div>
        <p>{title}</p>
        <p>{value}</p>
      </div>
      <ChartWaterWare percent={percent} />
    </Card>
  );
}
