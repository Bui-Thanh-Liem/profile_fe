import { IPropMyDrawer } from "@/interfaces/propsComponent.interface";
import { Drawer, Space } from "antd";
import { useState } from "react";
import { createPortal } from "react-dom";

export function MyDrawer({
  handleElement,
  title,
  header,
  content,
  placement,
  ...rest
}: IPropMyDrawer) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {createPortal(
        <span onClick={showDrawer}>{handleElement}</span>,
        document.body
      )}

      <Drawer
        title={title}
        placement={placement}
        width={500}
        onClose={onClose}
        closable={false}
        open={open}
        extra={<Space>{header}</Space>}
        {...rest}
      >
        {content}
      </Drawer>
    </>
  );
}
