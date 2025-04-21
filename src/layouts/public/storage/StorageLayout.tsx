"use client";
import { sendMailAdmin } from "@/apis/send-mail";
import HighlighText from "@/components/elements/HighlighText";
import { showToast } from "@/helper/show-toast.helper";
import { ISendMail } from "@/interfaces/model.interface";
import { TResponse } from "@/interfaces/response.interface";
import { generatorResourceMail } from "@/utils/generatorResourceMail";
import {
  AntDesignOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Modal, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Enums } from "liemdev-profile-lib";
import Image from "next/image";
import { useState, useTransition } from "react";
import intro from "../../../../public/launching.png";

type TForm = {
  name: string;
  email: string;
  type: Enums.ETypeSubject;
  desc?: string;
};

export const StorageLayout = () => {
  //
  const [actionForm] = Form.useForm<Partial<TForm>>();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formData = await actionForm.validateFields();
        const payloadSendMail: ISendMail = {
          type: Enums.ETypeMail.FORM_INTRO_STORAGE,
          subject: "This is mail form intro storage",
          source: generatorResourceMail(
            `${formData.email}`,
            `${formData.name} - ${formData.desc} - ${formData.type}`
          ),
        };
        const res = await sendMailAdmin(payloadSendMail);
        //
        if (res.statusCode !== 200) {
          showToast(res);
          return;
        }
        showToast(res);
        actionForm.resetFields();
      } catch (error) {
        showToast({
          statusCode: 500,
          message: "error in sending mail",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as TResponse<any>);
        console.log("Error::", error);
      }
    });
  }

  //
  function handleCancel() {
    setIsOpen(false);
    actionForm.resetFields();
  }

  return (
    <>
      <Row>
        <Col span={12} className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold text-foreground">Interested in</h1>
          <h1 className="text-5xl font-bold text-foreground">
            this <HighlighText text="Storage" /> ? Shoot me an
          </h1>
          <h1 className="text-5xl font-bold text-foreground">
            email to join and
          </h1>
          <h1 className="text-5xl font-bold text-foreground">contribute!</h1>
          <div>
            <Avatar.Group
              size="large"
              max={{
                count: 2,
                style: {
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  cursor: "pointer",
                },
                popover: { trigger: "click" },
              }}
            >
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
            <Avatar
              style={{
                backgroundColor: "#d9d9d9",
                cursor: "pointer",
              }}
              icon={<PlusOutlined />}
              onClick={() => {
                console.log("Thêm người dùng");
              }}
            />
          </div>
        </Col>
        <Col span={12}>
          <Image width={400} height={400} src={intro.src} alt="intro" />
        </Col>
      </Row>

      {/*  */}
      <Modal
        open={isOpen}
        title={"liemdev"}
        onOk={onSubmitForm}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="cancel" danger onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={onSubmitForm}
            loading={isPending}
          >
            OK
          </Button>,
        ]}
        width={600}
      >
        <Form
          form={actionForm}
          name="user-action"
          initialValues={{ remember: true }}
          onFinish={onSubmitForm}
          onFinishFailed={() => {}}
          layout="vertical"
          autoComplete="off"
          className="mt-8 p-8 rounded-lg shadow-lg"
        >
          <Form.Item<TForm>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input size="large" maxLength={16} />
          </Form.Item>
          <Form.Item<TForm>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "The input is note a valid email!",
              },
            ]}
          >
            <Input size="large" placeholder="email" />
          </Form.Item>
          <Form.Item<TForm>
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select type!" }]}
          >
            <Select mode="multiple" size="large" placeholder="Select type">
              <Select.Option value="all">All</Select.Option>
              {Object.values(Enums.ETypeSubject)?.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
              <Select.Option value="image-storage">Image storage</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<TForm> label="Description" name="desc">
            <TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
