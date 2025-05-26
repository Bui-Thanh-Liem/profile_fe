"use client";
import { resetPassword } from "@/apis/auth.api";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import Logo from "@/components/Logo";
import { FieldTypeResetPassword } from "@/types";
import { showMessage } from "@/utils/show-message.util";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ResetPassword({ token }: { token: string }) {
  const router = useRouter();
  const [resetPasswordForm] = Form.useForm();
  const [isPending, startTransition] = useTransition();

  //
  async function handleResetPassword() {
    const dataForm = await resetPasswordForm.validateFields();

    startTransition(async () => {
      //
      const res = await resetPassword({
        password: dataForm?.password,
        token,
      });

      showMessage(res);
      if (res.statusCode !== 200) return;

      resetPasswordForm.resetFields();
      router.replace("/login", { scroll: true });
    });
  }

  return (
    <div className="h-screen flex">
      <div className="m-auto p-8 grid grid-cols-2 items-center border border-primary shadow-lg shadow-primary rounded-tl-3xl rounded-br-3xl overflow-hidden">
        <Image
          src="/reset-password.png"
          alt="developer"
          width={500}
          height={500}
        />
        <Form
          form={resetPasswordForm}
          name="forgotPassword-user"
          initialValues={{ remember: true }}
          onFinish={handleResetPassword}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
          className="pr-14"
        >
          <div className="text-center mb-16">
            <Logo />
          </div>

          <Form.Item<FieldTypeResetPassword>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" placeholder="password" />
          </Form.Item>

          <Form.Item<FieldTypeResetPassword>
            label="Password confirm"
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: "Please input your password confirm !",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      new Error("Passwords do not match !")
                    );
                  }
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="passwordConfirm" />
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
