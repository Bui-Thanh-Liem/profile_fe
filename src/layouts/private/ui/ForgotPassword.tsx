"use client";
import { enterEmail } from "@/apis/auth.api";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import Logo from "@/components/Logo";
import useLocalStorage from "@/hooks/useLocalStorage";
import { FieldTypeForgotPasswordUser } from "@/types";
import { showToast } from "@/utils/show-toast.util";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ForgotPassword() {
  const [forgotPasswordForm] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [valueStorage, setStorage] = useLocalStorage("email-otp", "");
  const router = useRouter();

  async function handleForgotPassword() {
    const dataForm = await forgotPasswordForm.validateFields();

    startTransition(async () => {
      //
      const res = await enterEmail({
        email: dataForm.email,
      });

      showToast(res);
      if (res.statusCode !== 200) return;

      setStorage(dataForm.email);
      forgotPasswordForm.resetFields();
      router.replace(`/otp?token=${res.data?.token}`, { scroll: true });
    });
  }

  return (
    <div className="h-screen flex">
      <div className="m-auto p-8 grid grid-cols-2 items-center border border-primary shadow-lg shadow-primary rounded-tl-3xl rounded-br-3xl overflow-hidden">
        <Image
          src="/password-forgot.png"
          alt="developer"
          width={500}
          height={500}
        />
        <Form
          form={forgotPasswordForm}
          name="forgotPassword-user"
          initialValues={{ remember: true }}
          onFinish={handleForgotPassword}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
          className="pr-14"
        >
          <div className="text-center mb-16">
            <Logo />
          </div>
          <Form.Item<FieldTypeForgotPasswordUser>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email !" },
              { type: "email", message: "Invalid email format !" },
            ]}
          >
            <Input size="large" placeholder="Enter email" />
          </Form.Item>

          <div className="flex items-center justify-between">
            <Link href="/login">
              <Button type="text">back to login</Button>
            </Link>
            <Form.Item>
              <div className="mt-6 flex justify-end">
                <ButtonPrimary loading={isPending} size="large">
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
