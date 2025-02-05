import { IPropMyTag } from "@/interfaces/propsComponent.interface";
import { Tag } from "antd";

export default function MyTag({ tagName }: IPropMyTag) {
  const dataTags: Record<string, string> = {
    YES: "green",
    NO: "red",
  };

  return (
    <Tag color={dataTags[tagName]} key={tagName}>
      {tagName.toUpperCase()}
    </Tag>
  );
}
