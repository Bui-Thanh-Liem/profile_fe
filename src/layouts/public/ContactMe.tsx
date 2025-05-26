"use client";
import { sendMailAdmin } from "@/apis/send-mail";
import { MyTooltip } from "@/components/MyTooltip";
import { generatorResourceMail } from "@/utils/generatorResourceMail";
import { showMessage } from "@/utils/show-message.util";
import { Button, Form, Input, Modal, notification } from "antd";
import { Enums } from "liemdev-profile-lib";
import Image from "next/image";
import { useState } from "react";
import Logo from "../../components/Logo";

export function ContactMe() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [contactForm] = Form.useForm();

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
      formData.type = Enums.ETypeMail.FORM_CONTACT_ME;
      formData.source = generatorResourceMail(formData.email, formData.content);
      formData.subject = "This is mail form Contact Me";
      const res = await sendMailAdmin(formData);

      if (res.statusCode === 200) {
        contactForm.resetFields();
        notification.info({
          message: "Sent email",
          description: `Hi ${nameVisitor}, I'm glad you're interested in my information. I will respond to you as soon as possible, thank you.`,
        });
        setOpenModal(false);
      } else {
        showMessage(res);
      }
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
      <MyTooltip title="Contact me!" placement="topRight" open>
        <Image
          src="/contactMe.png"
          alt="contact me"
          width={76}
          height={76}
          className="rounded-full fixed right-8 bottom-8 cursor-pointer"
          onClick={handleClick}
        />
      </MyTooltip>

      {/*  */}
      <Modal
        open={openModal}
        title={
          <div className="text-center mt-6">
            <Logo />
            <p className="mt-4">Contact me</p>
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
            <Input placeholder="Enter your email" autoComplete="username" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please input your content!" }]}
          >
            <Input.TextArea rows={6} placeholder="Enter content" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
