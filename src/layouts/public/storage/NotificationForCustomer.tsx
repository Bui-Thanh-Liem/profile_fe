"use client";
import useCustomerStore from "@/stores/useCustomerStore";
import { Modal } from "antd";
import { useEffect, useState } from "react";

export function NotificationForCustomerLayout() {
  const [open, setOpen] = useState(false);
  const { isLoggedCustomer } = useCustomerStore();

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

  // Chưa đăng nhập không hiện thông báo
  if (!isLoggedCustomer) return null;

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
      <p>Notification</p>
    </Modal>
  );
}
