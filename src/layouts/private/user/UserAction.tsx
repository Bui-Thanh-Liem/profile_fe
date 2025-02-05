"use client";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";

type FieldTypeUserAction = {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
};

export default function UserAction() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userActionForm] = Form.useForm();

  //
  async function onSubmitForm() {
    try {
      const formData = await userActionForm.validateFields();
      console.log("Form values user action:", formData);
      setIsOpen(false);
      userActionForm.resetFields();
    } catch (error) {
      console.log("Error::", error);
    }
  }

  //
  function handleCancel() {
    setIsOpen(false);
  }

  return (
    <Modal
      open={isOpen}
      title={
        <div className="text-center pt-8">
          <p className="mt-4">Register</p>
        </div>
      }
      onOk={onSubmitForm}
      onCancel={handleCancel}
      centered
      footer={[
        <Button key="cancel" danger onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={onSubmitForm}>
          OK
        </Button>,
      ]}
    >
      <Form
        form={userActionForm}
        name="user-action"
        initialValues={{ remember: true }}
        onFinish={onSubmitForm}
        onFinishFailed={() => {}}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item<FieldTypeUserAction>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item<FieldTypeUserAction>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is note a valid email!" },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item<FieldTypeUserAction>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item<FieldTypeUserAction>
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
  );
}
