"use client";
import { logout } from "@/apis/auth.api";
import { sendMailAdmin } from "@/apis/send-mail";
import { clearCookieBrowser } from "@/app/actions/clear-cookie";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { showToast, showToastByString } from "@/helper/show-toast.helper";
import { ISendMail } from "@/interfaces/model.interface";
import useAuthStore from "@/stores/useAuthStore";
import { generatorResourceMail } from "@/utils/generatorResourceMail";
import { RollbackOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { Constants, Enums } from "liemdev-profile-lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import logoutImg from "../../../../public/check-out.png";

export function LogoutLayout() {
  const router = useRouter();
  const { currentUser } = useAuthStore();
  console.log("currentUser:::", currentUser);
  const [feedbackActionForm] = Form.useForm<ISendMail>();
  const [second, setSecond] = useState<number>(5);
  const [isPending, startTransition] = useTransition();
  const [isShowForm, setIsShowForm] = useState<boolean>(true);

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
  }, [second]);

  //
  function handleFeedback() {
    setSecond(-1);
    setIsShowForm(!isShowForm);
  }

  //
  async function handleLogout() {
    await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_USER);
    await logout();
    router.replace("login");
  }

  //
  function onSubmitFeedback() {
    console.log("Send mail to admin");

    startTransition(async () => {
      try {
        //
        if (!currentUser?.email) {
          showToastByString("Please login again !", "error");
          return;
        }

        //
        const formData = await feedbackActionForm.validateFields();
        formData.type = Enums.ETypeMail.FORM_LOGOUT;
        formData.source = generatorResourceMail(
          currentUser.email,
          formData.source || ""
        );
        formData.subject = "This is mail from form Feedback logout";
        const res = await sendMailAdmin(formData);

        //
        if (res.statusCode !== 200) {
          showToast(res);
          return;
        }
        showToast(res);
        feedbackActionForm.resetFields();
      } catch (error) {
        console.log("Error::", error);
        showToastByString("This is form feedback logout", "error");
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
              src={logoutImg.src}
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
