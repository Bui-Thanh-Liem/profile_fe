import { MyDrawer } from "@/components/MyDrawer";
import { CommentOutlined } from "@ant-design/icons";
import { Badge, FloatButton } from "antd";
import { useRef } from "react";

export function Message() {
  const iconMessageRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Badge count={2}>
        <FloatButton
          icon={<CommentOutlined />}
          onClick={() => iconMessageRef.current?.click()}
        />
      </Badge>

      {/*  */}
      <MyDrawer
        handleElement={<button ref={iconMessageRef} className="hidden" />}
        title="Message"
        header={<CommentOutlined style={{ fontSize: 32 }} />}
        content={<div>Message content</div>}
      />
    </>
  );
}
