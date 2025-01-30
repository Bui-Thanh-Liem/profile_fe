"use client";
import Image from "next/image";

import contactMe from "../../public/icons/contactMe.png";
import { Button, Form, Input, Modal, notification, Tooltip } from "antd";
import { useEffect, useState } from "react";
import Logo from "./Logo";

type FieldTypeContact = {
  email?: string;
  content?: string;
};

export default function ContactMe() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [contactForm] = Form.useForm();

  //
  useEffect(() => {
    const showTooltip = () => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    };
    showTooltip();
    const interval = setInterval(showTooltip, 15000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  //
  function handleClick() {
    setOpenModal(true);
  }

  //
  const nameVisitor =
    contactForm.getFieldValue("email")?.split("@")[0] || "you";
  async function handleOk() {
    const formData = await contactForm.validateFields();
    console.log("formData:::", formData);
    contactForm.resetFields();
    notification.info({
      message: "Sent email",
      description: `Hi ${nameVisitor}, I'm glad you're interested in my information. I will respond to you as soon as possible, thank you.`,
    });
    setOpenModal(false);
  }

  //
  function handleCancel() {
    setOpenModal(false);
  }

  return (
    <>
      <Tooltip
        title="Contact me!"
        placement="topRight"
        open={open}
        color="#04befe"
      >
        <Image
          src={contactMe.src}
          alt="contact me"
          width={76}
          height={76}
          className="rounded-full fixed right-8 bottom-8 cursor-pointer"
          onClick={handleClick}
        />
      </Tooltip>
      <Modal
        open={openModal}
        title={
          <div className="text-center">
            <Logo />
            <p className="mt-4">Contact</p>
          </div>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} danger>
            close
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={contactForm}
          name="contact"
          onFinish={handleOk}
          autoComplete="off"
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="email"
            label="Your Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input not a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please input your content!" }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
