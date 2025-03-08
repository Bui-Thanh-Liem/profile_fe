"use client";
import { Checkbox, Form, Input } from "antd";
import Image from "next/image";

//
import { login } from "@/apis/auth.api";
import Captcha from "@/components/Captcha";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import Logo from "@/components/Logo";
import { showToast } from "@/helper/show-toast.helper";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import developerGIF from "../../../public/web-developer.gif";
import useAuthStore from "../../stores/useAuthStore";

type FieldTypeLogin = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export default function Login() {
  const [loginForm] = Form.useForm();
  const { loginUser } = useAuthStore();
  const router = useRouter();
  const [isCheckCaptcha, setIsCheckCaptcha] = useState(false);
  const [isPending, startTransition] = useTransition();

  //
  async function handleLogin() {
    const dataForm = await loginForm.validateFields();
    startTransition(async () => {
      console.log("login nek");
      const res = await login({
        email: dataForm.email,
        password: dataForm.password,
      });

      if (res.statusCode !== 200) {
        showToast(res);
        return;
      }

      loginUser(res.data.user);
      showToast(res);
      loginForm.resetFields();
      router.replace("/admin", { scroll: true });
    });
  }

  return (
    <div className="h-screen flex">
      <div className="m-auto p-8 grid grid-cols-2 border border-primary shadow-lg shadow-primary rounded-tl-3xl rounded-br-3xl overflow-hidden">
        <Image src={developerGIF} alt="developer" width={500} height={500} />
        <Form
          form={loginForm}
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
          className="pr-14"
        >
          <div className="text-center mb-8">
            <Logo />
          </div>
          <Form.Item<FieldTypeLogin>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input size="large" className="w-full" />
          </Form.Item>
          <Form.Item<FieldTypeLogin>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item<FieldTypeLogin>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Captcha handleCheck={setIsCheckCaptcha} />
          <div className="mt-6 flex justify-end">
            <ButtonPrimary
              disabled={!isCheckCaptcha}
              onClick={handleLogin}
              loading={isPending}
            >
              Submit
            </ButtonPrimary>
          </div>
        </Form>
      </div>
    </div>
  );
}
