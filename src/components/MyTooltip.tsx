import { IPropMyTooltip } from "@/interfaces/propsComponent.interface";
import { Tooltip } from "antd";

export function MyTooltip({ children, placement, title }: IPropMyTooltip) {
  return (
    <Tooltip title={title} placement={placement} color="#04befe">
      {children}
    </Tooltip>
  );
}
