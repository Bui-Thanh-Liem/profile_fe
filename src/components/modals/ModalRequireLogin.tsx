import { IPropModalRequireLogin } from "@/interfaces/propsComponent.interface";
import { Button, Modal } from "antd";

export default function ModalRequireLogin({
  open,
  title,
  handleOk,
  handleCancel,
}: IPropModalRequireLogin) {
  return (
    <Modal
      open={open}
      title={title || "Please login to continue"}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <Button>Custom Button</Button>
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
