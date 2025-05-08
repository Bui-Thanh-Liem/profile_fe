"use client";

import { verifyLoginGoogle } from "@/apis/customer";
import useCustomerStore from "@/stores/useCustomerStore";
import { Button } from "antd";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Import Modal từ antd động, với ssr = false
const DynamicModal = dynamic(() => import("antd").then((mod) => mod.Modal), {
  ssr: false,
});

export function NotificationForCustomerLayout() {
  const { loginCustomer } = useCustomerStore();
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const googleLogin = searchParams.get("google_login");
  const isSuccessLogin = googleLogin && googleLogin === "success";

  //
  useEffect(() => {
    setMounted(true);
  }, [open]);

  //
  const handleClose = () => {
    setOpen(false);
  };

  //
  async function onOkNotification() {
    const res = await verifyLoginGoogle();
    console.log("res customer :::", res);

    if (res.statusCode === 200) {
      loginCustomer(res.data);
      setOpen(false);
    }
  }

  if (!isSuccessLogin) {
    return null;
  }

  // Chỉ render khi đã mount ở client
  if (!mounted) return null;

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
          {isSuccessLogin && (
            <Button type="primary" onClick={onOkNotification}>
              OK
            </Button>
          )}
        </div>
      </DynamicModal>
    </div>
  );
}
