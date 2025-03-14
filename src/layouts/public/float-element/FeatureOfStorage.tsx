import { BarsOutlined, CommentOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

export function FeatureOfStorage() {
  return (
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ insetInlineEnd: 94 }}
      icon={<BarsOutlined />}
    >
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
  );
}
