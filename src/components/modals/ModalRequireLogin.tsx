"use client";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputPassword from "../InputPassword";
import InputPrimary from "../InputPrimary";

interface IValueForm {
  email: string;
  password: string;
}

export default function ModalRequireLogin() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [valueForm, setValueForm] = useState<IValueForm>({
    email: "",
    password: "",
  });

  //
  useEffect(() => {
    setIsMounted(true);
    setOpen(true); // Mở modal sau khi client render
  }, []);

  //
  function handleOk() {
    console.log("call api login:::", valueForm);
    setOpen(false);
  }

  //
  function handleCancel() {
    router.back();
    setOpen(false);
  }

  //
  function handleRegister() {
    console.log("on register");
  }

  //
  if (!isMounted) return null; // Tránh render khi chưa mount

  return (
    <Modal
      open={open}
      title="Please login to continue"
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      footer={[
        <Button key="custom" type="link" onClick={handleRegister}>
          You can register here
        </Button>,
        <Button key="cancel" danger onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <form action="POST">
        <InputPrimary
          label="Email"
          className="mb-2"
          value={valueForm.email}
          onChangeInput={(e) =>
            setValueForm({ ...valueForm, email: e.target.value })
          }
        />
        <InputPassword
          value={valueForm.password}
          onChangePassword={(e) =>
            setValueForm({ ...valueForm, password: e.target.value })
          }
        />
      </form>
      <div>
        
      </div>
    </Modal>
  );
}
