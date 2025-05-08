"use client";

import useCustomerStore from "@/stores/useCustomerStore";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Button } from "antd";

// Import Modal từ antd động, với ssr = false
const DynamicModal = dynamic(() => import("antd").then((mod) => mod.Modal), {
  ssr: false,
});

export function NotificationForCustomerLayout() {
  const { isLoggedCustomer } = useCustomerStore();
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const loginType = searchParams.get("loginType");
  console.log("loginType:::", loginType);
  console.log("loginType:::", loginType === "google");

  //
  useEffect(() => {
    setMounted(true);
  }, [open]);

  //
  const handleClose = () => {
    setOpen(false);
  };

  // Chỉ render khi đã mount ở client
  if (!mounted) return null;

  //
  function onOkNotification() {
    
    
    setOpen(false);
  }

  return (
    <div>
      <DynamicModal
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
        centered
        maskClosable={false}
        footer={null}
        width={1000}
        focusTriggerAfterClose={false}
        wrapProps={{ tabIndex: -1 }}
        closable={false}
      >
        <div className="text-center">
          <p>Notification</p>
          {loginType && loginType === "google" && (
            <Button type="primary" onClick={onOkNotification}>
              OK
            </Button>
          )}
        </div>
      </DynamicModal>
    </div>
  );
}
