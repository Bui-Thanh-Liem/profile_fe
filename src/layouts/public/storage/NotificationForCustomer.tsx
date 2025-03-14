"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";

export function NotificationForCustomerLayout() {
  const [open, setOpen] = useState(false);

  //
  useEffect(() => {
    showModal();
  }, []);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      maskClosable
      footer={[]}
      width={1000}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
