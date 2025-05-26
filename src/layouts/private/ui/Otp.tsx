"use client";
import { configOtp, enterEmail } from "@/apis/auth.api";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import Logo from "@/components/Logo";
import useLocalStorage from "@/hooks/useLocalStorage";
import { FieldTypeOtp } from "@/types";
import { showMessage } from "@/utils/show-message.util";
import { Button, Form, Input, Statistic } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
const { Countdown } = Statistic;

export function Otp({ token }: { token: string }) {
  const deadlineMinute = 2;
  const router = useRouter();
  const [otpForm] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const [isPendingResend, startTransitionResend] = useTransition();
  const [deadline, setDeadline] = useState(
    Date.now() + deadlineMinute * 60 * 1000
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [valueStorage, set, remoteStorage] = useLocalStorage("email-otp", "");

  //
  function handleResend() {
    if (isPendingResend) return;

    //
    startTransitionResend(async () => {
      console.log("handleResend");

      const res = await enterEmail({
        email: valueStorage,
      });

      showMessage(res);
      if (res.statusCode !== 200) return;

      remoteStorage();
      setDeadline(Date.now() + deadlineMinute * 60 * 1000);
    });
  }

  //
  async function handleOtp() {
    const dataForm = await otpForm.validateFields();

    console.log("dataForm::", dataForm);

    startTransition(async () => {
      //
      const res = await configOtp({
        otp: dataForm.otp,
        token,
      });

      showMessage(res);
      if (res.statusCode !== 200) return;

      otpForm.resetFields();
      router.replace(`/reset-password?token=${res.data?.token}`, {
        scroll: true,
      });
    });
  }

  //
  return (
    <div className="h-screen flex">
      <div className="m-auto p-8 grid grid-cols-2 items-center border border-primary shadow-lg shadow-primary rounded-tl-3xl rounded-br-3xl overflow-hidden">
        <Image
          src="/one-time-password.png"
          alt="developer"
          width={500}
          height={500}
        />
        <Form
          form={otpForm}
          name="otp-user"
          initialValues={{ otp: "" }}
          onFinish={handleOtp}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
          className="pr-14 text-center"
        >
          <div className="mb-16">
            <Logo />
          </div>

          <Form.Item<FieldTypeOtp>
            name="otp"
            rules={[{ required: true, message: "Please input your otp !" }]}
          >
            {/* <Input.OTP {...sharedProps} /> */}
            <Input.OTP onChange={(otp) => otpForm.setFieldValue("otp", otp)} />
            <Countdown
              className="mt-4"
              title={
                <p>
                  Otp will be sent again in {deadlineMinute} minutes.{" "}
                  <span
                    aria-disabled
                    className="cursor-pointer text-blue-600 hover:underline text-base"
                    onClick={handleResend}
                  >
                    resend
                  </span>
                </p>
              }
              value={deadline}
              format="mm:ss"
              onFinish={handleResend}
            />
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
