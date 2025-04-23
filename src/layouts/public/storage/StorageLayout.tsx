"use client";
import { sendMailAdmin } from "@/apis/send-mail";
import HighlighText from "@/components/elements/HighlighText";
import { MyAvatar } from "@/components/MyAvatar";
import { showToast } from "@/helper/show-toast.helper";
import { ISendMail } from "@/interfaces/model.interface";
import { TResponse } from "@/interfaces/response.interface";
import { generatorResourceMail } from "@/utils/generatorResourceMail";
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
      <Row className="min-h-content-storage items-center">
        <Col span={10} className="flex flex-col gap-6">
          <h1 className="text-6xl font-bold text-foreground">If you are</h1>
          <h1 className="text-6xl font-bold text-foreground">interested in</h1>
          <h1 className="text-6xl font-bold text-foreground">
            this <HighlighText text="Storage" />,
          </h1>
          <h1 className="text-6xl font-bold text-foreground">
            please join us.
          </h1>
          <p className="text-lg text-gray-500">
            Has this amazing Storage caught your eye yet? Join us now to unlock
            a world of exclusive features, smarter solutions, and so much more!
            👀
          </p>
          <div>
            <Avatar.Group>
              <MyAvatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="liem"
                fallbackText={"liem"}
              />
              <MyAvatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="liem"
                fallbackText={"liem"}
              />
              <MyAvatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="liem"
                fallbackText={"liem"}
              />
              <MyAvatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="liem"
                fallbackText={"liem"}
              />
              <MyAvatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="liem"
                fallbackText={"liem"}
              />
              <MyAvatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="liem"
                fallbackText={"liem"}
              />
              <MyAvatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="liem"
                fallbackText={"liem"}
              />
              <MyAvatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="liem"
                fallbackText={"liem"}
              />
            </Avatar.Group>
          </div>
        </Col>
        <Col span={14} className="flex justify-center">
          <Image width={512} height={512} src={intro.src} alt="intro" />
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
