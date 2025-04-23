"use client";
import { MyTooltip } from "@/components/MyTooltip";
import { Button, Form, Input, Modal, notification } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import contactMe from "../../../public/contactMe.png";
import Logo from "../../components/Logo";

export function ContactMe() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [contactForm] = Form.useForm();

  useEffect(() => {
    const showTooltip = () => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    };
    showTooltip();
    const interval = setInterval(showTooltip, 15000);
    return () => clearInterval(interval);
  }, []);

  function handleClick() {
    setOpenModal(true);
  }

  const nameVisitor =
    contactForm.getFieldValue("email")?.split("@")[0] || "you";

  //
  async function handleOk() {
    setLoading(true);
    try {
      const formData = await contactForm.validateFields();
      console.log("formData:::", formData);
      contactForm.resetFields();
      notification.info({
        message: "Sent email",
        description: `Hi ${nameVisitor}, I'm glad you're interested in my information. I will respond to you as soon as possible, thank you.`,
      });
      setOpenModal(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
    setLoading(false);
  }

  function handleCancel() {
    setOpenModal(false);
  }

  return (
    <>
      <MyTooltip title="Contact me!" placement="topRight" open={open} fresh>
        <Image
          src={contactMe.src}
          alt="contact me"
          width={76}
          height={76}
          className="rounded-full fixed right-8 bottom-8 cursor-pointer"
          onClick={handleClick}
        />
      </MyTooltip>
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
            Close
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
        centered
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
              { type: "email", message: "The input is not a valid email!" },
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
