"use client";
import { logout as logoutUserApi } from "@/apis/auth.api";
import { logout as logoutCustomerApi } from "@/apis/customer.api";
import { sendMailAdmin } from "@/apis/send-mail";
import { clearCookieBrowser } from "@/app/actions/clear-cookie";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { ISendMail } from "@/interfaces/common.interface";
import useAuthStore from "@/stores/useAuthStore";
import useCustomerStore from "@/stores/useCustomerStore";
import { generatorResourceMail } from "@/utils/generatorResourceMail";
import { showMessage, showMessageByString } from "@/utils/show-message.util";
import { RollbackOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { Constants, Enums } from "liemdev-profile-lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

export function LogoutLayout({ type }: { type: "user" | "customer" }) {
  const router = useRouter();
  const { currentCustomer, logoutCustomer } = useCustomerStore();
  const { currentUser, logoutUser } = useAuthStore();
  const [feedbackActionForm] = Form.useForm<ISendMail>();
  const [second, setSecond] = useState<number>(5);
  const [isPending, startTransition] = useTransition();
  const [isShowForm, setIsShowForm] = useState<boolean>(true);

  //
  const handleLogout = useCallback(async () => {
    if (type === "customer") {
      // logout server
      await logoutCustomerApi();

      // clean cookie browser
      await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_CUSTOMER);
      await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_CUSTOMER_RF);

      // clean storage
      logoutCustomer();

      //
      router.replace("/storage");
    }

    if (type === "user") {
      // logout server
      await logoutUserApi();

      // clean cookie browser
      await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_USER);
      await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_USER_RF);

      // clean storage
      logoutUser();

      //
      router.replace("/login");
    }
  }, [logoutCustomer, logoutUser, router, type]);

  //
  // -1 stop second - feedback
  //  0 logout
  useEffect(() => {
    if (second < 0) return;

    if (second === 0) {
      handleLogout();
      return;
    }

    const idInterval = setInterval(() => {
      setSecond((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(idInterval);
  }, [handleLogout, second, type]);

  //
  function handleFeedback() {
    setSecond(-1);
    setIsShowForm(!isShowForm);
  }

  //
  function onSubmitFeedback() {
    console.log("Send mail to admin");

    startTransition(async () => {
      try {
        //
        if (!currentCustomer?.email) {
          showMessageByString("Please login again !", "error");
          return;
        }

        //
        const formData = await feedbackActionForm.validateFields();
        const email =
          type === "customer" ? currentCustomer.email : currentUser?.email;
        formData.type =
          type === "customer"
            ? Enums.ETypeMail.FORM_LOGOUT_CUSTOMER
            : Enums.ETypeMail.FORM_LOGOUT_USER;
        formData.source = generatorResourceMail(
          email || "",
          formData.source || ""
        );
        formData.subject = "This is mail form Feedback logout";
        const res = await sendMailAdmin(formData);

        //
        if (res.statusCode !== 200) {
          showMessage(res);
          return;
        }
        showMessage(res);
        feedbackActionForm.resetFields();
      } catch (error) {
        console.log("Error::", error);
        showMessageByString("This is form feedback logout", "error");
      }
    });
  }

  return (
    <main className="flex h-screen">
      <div className="w-[1200px] m-auto">
        <Button
          size="large"
          type="primary"
          shape="circle"
          icon={<RollbackOutlined />}
          onClick={() => router.back()}
        />
        <Row gutter={[48, 48]} className="justify-center">
          <Col
            hidden={isShowForm}
            span={12}
            className="transition-all duration-700"
          >
            <Form
              form={feedbackActionForm}
              name="feedback-action"
              initialValues={{ remember: true }}
              onFinish={onSubmitFeedback}
              onFinishFailed={() => {}}
              layout="vertical"
              autoComplete="off"
            >
              <Title className="text-center">Feedback</Title>
              <Form.Item<ISendMail>
                label="Content"
                name="source"
                rules={[{ required: true, message: "Please input content!" }]}
              >
                <TextArea rows={10} />
              </Form.Item>
              <Form.Item>
                <ButtonPrimary loading={isPending}>Send</ButtonPrimary>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} className="text-center">
            <Image
              src="/check-out.png"
              alt="Logout"
              width={300}
              height={300}
              className="m-auto mb-8"
            />
            <Title level={2}>You are logging out...</Title>
            <p className="text-gray-400">
              The application will automatically launch after{" "}
              <strong>{second < 0 ? 0 : second}</strong> seconds.
            </p>
            <div className="flex items-center gap-2 justify-center mt-8">
              <Button color="primary" variant="filled" onClick={handleFeedback}>
                Feedback
              </Button>
              <ButtonPrimary danger onClick={handleLogout}>
                Logout now
              </ButtonPrimary>
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}
