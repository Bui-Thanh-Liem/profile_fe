import { Card } from "antd";
import ChartWaterWare from "../ChartWaterWare";
import { IPropCardPercentAdmin } from "@/interfaces/propsComponent.interface";

export function CardPercentAdmin({
  title,
  value,
  percent,
  link,
}: IPropCardPercentAdmin) {
  console.log("link CardPercentAdmin:::", link);

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
