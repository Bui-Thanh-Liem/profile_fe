"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import useCustomerStore from "@/stores/useCustomerStore";

export function NotificationForCustomerLayout() {
  const { isLoggedCustomer } = useCustomerStore();
  const [open, setOpen] = useState(isLoggedCustomer);

  // Prevent auto-focus by blurring active element
  useEffect(() => {
    if (open) {
      // Blur any focused element to prevent scrolling
      if (document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!isLoggedCustomer) return null;

  return (
    <div>
      <Modal
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
        centered
        maskClosable
        footer={null}
        width={1000}
        focusTriggerAfterClose={false}
        wrapProps={{ tabIndex: -1 }} // Prevent modal content from being focusable
      >
        <div tabIndex={-1}>
          <p>Notification</p>
        </div>
      </Modal>
    </div>
  );
}
