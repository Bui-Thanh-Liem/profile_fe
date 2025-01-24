"use client";
import {
  Button,
  Checkbox,
  Form,
  GetProps,
  Input,
  Modal,
  notification,
  Statistic,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { Countdown } = Statistic;

type FieldTypeLogin = {
  username?: string;
  password?: string;
  remember?: string;
};

type FieldTypeRegister = {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
};

type FieldTypeOTP = {
  otp?: string;
};

type OTPProps = GetProps<typeof Input.OTP>;

export default function ModalRequireLogin() {
  const [isMounted, setIsMounted] = useState(false);

  //
  const router = useRouter();

  //
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isOTP, setIsOTP] = useState<boolean>(false);
  const deadlineMinute = 2;
  const [deadline, setDeadline] = useState(Date.now());

  //
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [otpForm] = Form.useForm();

  //
  useEffect(() => {
    setIsMounted(true);
    setIsLogin(true); // Mở modal sau khi client render
  }, []);

  //
  function handleClickLogin() {
    setIsLogin(true);
    setIsRegister(false);
  }
  //
  function handleClickRegister() {
    setIsLogin(false);
    setIsRegister(true);
  }

  //
  function handleCancel() {
    router.back();
    setIsLogin(false);
    setIsRegister(false);
    setIsOTP(false);
  }

  //
  function handleClickBackOtp() {
    setIsOTP(false);
    setIsRegister(true);
  }

  //
  const openNotification = () => {
    notification.info({
      message: "OTP sent to your email",
      description: (
        <p>
          We have sent a one-time password (OTP) to your registered email.{" "}
          <span className="text-primary cursor-pointer">click here</span>
        </p>
      ),
      onClick: () => {
        window.open("https://mail.google.com/mail", "_blank");
      },
    });
  };

  //
  // const onChange: OTPProps["onChange"] = (text) => {
  //   console.log("onChange:", text);
  // };
  // const onInput: OTPProps["onInput"] = (value) => {
  //   console.log("onInput:", value);
  // };
  // const sharedProps: OTPProps = {
  //   onChange, // value string
  //   onInput, // value array
  // };

  //
  async function handleLogin() {
    try {
      const dataForm = await loginForm.validateFields();
      console.log("Form values login:", dataForm);
      setIsLogin(false);
      loginForm.resetFields();
    } catch (error) {
      console.log("Error::", error);
    }
  }

  //
  async function handleRegister() {
    try {
      const formData = await registerForm.validateFields();
      console.log("Form values register:", formData);
      setIsRegister(false);
      registerForm.resetFields();
      openNotification();
      setDeadline(Date.now() + deadlineMinute * 60 * 1000);
      setIsOTP(true);
    } catch (error) {
      console.log("Error::", error);
    }
  }

  //
  const onFinish = () => {
    console.log("Countdown finished!");
  };

  //
  async function handleOTP() {
    try {
      const formData = await otpForm.validateFields();
      console.log("Form values OTP:", formData);
      setIsOTP(false);
    } catch (error) {
      console.log("Error::", error);
    }
  }

  //
  if (!isMounted) return null; // Tránh render khi chưa mounted

  return (
    <>
      {/*  */}
      <Modal
        open={isLogin}
        title="Please login to continue"
        onOk={handleLogin}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="custom" type="link" onClick={handleClickRegister}>
            You can register here
          </Button>,
          <Button key="cancel" danger onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleLogin}>
            OK
          </Button>,
        ]}
      >
        <Form
          form={loginForm}
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleRegister}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldTypeLogin>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" className="w-full" />
          </Form.Item>
          <Form.Item<FieldTypeRegister>
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
        </Form>
      </Modal>
      {/*  */}

      <Modal
        open={isRegister}
        title="Register"
        onOk={handleRegister}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="custom" type="link" onClick={handleClickLogin}>
            Login
          </Button>,
          <Button key="cancel" danger onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleRegister}>
            OK
          </Button>,
        ]}
      >
        <Form
          form={registerForm}
          name="register"
          initialValues={{ remember: true }}
          onFinish={handleRegister}
          onFinishFailed={() => {}}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item<FieldTypeRegister>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FieldTypeRegister>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is note a valid email!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FieldTypeRegister>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item<FieldTypeRegister>
            label="Password confirm"
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: "Please input your password confirm!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("Passwords do not match!"));
                  }
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
        </Form>
      </Modal>

      {/*  */}
      <Modal
        open={isOTP}
        title="OTP"
        onOk={handleOTP}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="custom" type="link" onClick={handleClickBackOtp}>
            Back
          </Button>,
          <Button key="cancel" danger onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOTP}>
            OK
          </Button>,
        ]}
      >
        <Form
          form={otpForm}
          name="otp"
          initialValues={{ remember: true }}
          onFinish={handleOTP}
          onFinishFailed={() => {}}
          layout="vertical"
          autoComplete="off"
          className="text-center"
        >
          <Form.Item<FieldTypeOTP>
            name="otp"
            rules={[{ required: true, message: "Please input your otp!" }]}
          >
            {/* <Input.OTP {...sharedProps} /> */}
            <Input.OTP />
            <Countdown
              className="mt-4"
              title={`Otp will be sent again in ${deadlineMinute} minutes.`}
              value={deadline}
              format="mm:ss"
              onFinish={onFinish}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
