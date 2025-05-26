"use client";
import { Button, Checkbox, Form, Input } from "antd";
import Image from "next/image";

//
import { login } from "@/apis/auth.api";
import Captcha from "@/components/Captcha";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import Logo from "@/components/Logo";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { NotCompatibleLayout } from "@/layouts/public/storage/NotCompatible";
import { FieldTypeLoginUser } from "@/types";
import { showMessage } from "@/utils/show-message.util";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import useAuthStore from "../../../stores/useAuthStore";

export default function Login() {
  const [loginForm] = Form.useForm();
  const { loginUser } = useAuthStore();
  const router = useRouter();
  const [isCheckCaptcha, setIsCheckCaptcha] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { isMobileSmall, isMobileLarge, isDesktopSmall, isTablet } =
    useBreakpoints();

  //
  async function handleLogin() {
    const dataForm = await loginForm.validateFields();
    startTransition(async () => {
      //
      const res = await login({
        email: dataForm.email,
        password: dataForm.password,
      });

      if (res.statusCode !== 200) {
        showMessage(res);
        return;
      }

      loginUser(res.data.user || {});
      showMessage(res);
      loginForm.resetFields();
      router.replace("/admin", { scroll: true });
    });
  }

  //
  if (isMobileSmall || isMobileLarge || isTablet || isDesktopSmall)
    return <NotCompatibleLayout />;

  return (
    <div className="h-screen flex">
      <div className="m-auto p-8 grid grid-cols-2 border border-primary shadow-lg shadow-primary rounded-tl-3xl rounded-br-3xl overflow-hidden">
        <Image
          src="/web-developer.gif"
          alt="developer"
          width={500}
          height={500}
          priority={true}
        />
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
          <Form.Item<FieldTypeLoginUser>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter email"
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item<FieldTypeLoginUser>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              autoComplete="current-password"
              placeholder="Enter password"
            />
          </Form.Item>
          <Form.Item<FieldTypeLoginUser>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Captcha handleCheck={setIsCheckCaptcha} />
          <div className="flex justify-between items-center">
            <Link href="/forgot-password">
              <Button type="text">forgot password</Button>
            </Link>
            <Form.Item>
              <div className="mt-6 flex justify-end">
                <ButtonPrimary
                  disabled={!isCheckCaptcha}
                  loading={isPending}
                  size="large"
                >
                  Submit
                </ButtonPrimary>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
