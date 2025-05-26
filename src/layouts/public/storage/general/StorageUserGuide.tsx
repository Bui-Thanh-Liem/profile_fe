/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { verifyLoginGoogle } from "@/apis/customer.api";
import { clearCookieBrowser } from "@/app/actions/clear-cookie";
import useCustomerStore from "@/stores/useCustomerStore";
import { showMessage } from "@/utils/show-message.util";
import { Alert, Button, Tabs, Typography } from "antd";
import { Constants } from "liemdev-profile-lib";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const { Title } = Typography;

// Import Modal từ antd động, với ssr = false
const DynamicModal = dynamic(() => import("antd").then((mod) => mod.Modal), {
  ssr: false,
});

function Guide() {
  const instructItems = [
    {
      label: "Choose category",
      key: 1,
      children: (
        <Image
          src="/instruct_1.png"
          alt="tour-1"
          width={600}
          height={400}
          quality={100}
        />
      ),
    },
    {
      label: "Filter items by keyword",
      key: 2,
      children: (
        <Image
          src="/instruct_2.png"
          alt="tour-2"
          width={600}
          height={400}
          quality={100}
        />
      ),
    },
    {
      label: "Search items by name",
      key: 3,
      children: (
        <Image
          src="/instruct_3.png"
          alt="tour-3"
          width={600}
          height={400}
          quality={100}
        />
      ),
    },
    {
      label: "Hover to show description",
      key: 4,
      children: (
        <Image
          src="/instruct_4.png"
          alt="tour-4"
          width={600}
          height={400}
          quality={100}
        />
      ),
    },
    {
      label: "Click the sandbox icon to display the code",
      key: 5,
      children: (
        <Image
          src="/instruct_5.png"
          alt="tour-5"
          width={600}
          height={400}
          quality={100}
        />
      ),
    },
  ];

  return (
    <div className="min-h-[500px]">
      <Title level={4}>Storage user guide</Title>
      <div className="text-left my-10">
        <Alert
          message="Warning"
          description="Please read the instructions to be able to use all the features."
          type="warning"
          showIcon
          closable
        />
      </div>
      <Tabs tabPosition="left" items={instructItems as any} />
    </div>
  );
}

export function StorageUserGuide() {
  const router = useRouter();
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

    if (res.statusCode === 200) {
      loginCustomer(res.data);
      router.replace("/storage");
      setOpen(false);
    } else {
      await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_CUSTOMER);
      await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_CUSTOMER_RF);
      showMessage(res);
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
        width={800}
        focusTriggerAfterClose={false}
        wrapProps={{ tabIndex: -1 }}
        closable={false}
      >
        <div className="text-center">
          <Guide />
          {isSuccessLogin && (
            <Button type="primary" onClick={onOkNotification}>
              Ok, I get it
            </Button>
          )}
        </div>
      </DynamicModal>
    </div>
  );
}
