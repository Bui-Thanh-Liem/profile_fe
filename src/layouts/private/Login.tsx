"use client";
import { Checkbox, Form, Input } from "antd";
import Image from "next/image";

//
import ButtonPrimary from "@/components/ButtonPrimary";
import Captcha from "@/components/Captcha";
import Logo from "@/components/Logo";
import { useState } from "react";
import developerGIF from "../../../public/web-developer.gif";
import useUserStore from "../../../stores/useUser";

type FieldTypeLogin = {
  username_email?: string;
  password?: string;
  remember?: boolean;
};

export default function Login() {
  const [loginForm] = Form.useForm();
  const { loginUser } = useUserStore();
  const [isCheckCaptcha, setIsCheckCaptcha] = useState(false);

  //
  async function handleLogin() {
    try {
      const dataForm = await loginForm.validateFields();
      console.log("Form values login:", dataForm);
      loginUser(dataForm);
      loginForm.resetFields();
    } catch (error) {
      console.log("Error::", error);
    }
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
            label="Username or Email"
            name="username_email"
            rules={[
              {
                required: true,
                message: "Please input your username or email!",
              },
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
          <div className="mt-4 flex justify-end">
            <ButtonPrimary disabled={!isCheckCaptcha} onClick={handleLogin}>
              Submit
            </ButtonPrimary>
          </div>
        </Form>
      </div>
    </div>
  );
}
