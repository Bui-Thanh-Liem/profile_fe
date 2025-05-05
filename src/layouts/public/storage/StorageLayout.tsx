"use client";
import { sendMailAdmin } from "@/apis/send-mail";
import { MyCarousel } from "@/components/carousel/MyCarousel";
import HighlighText from "@/components/elements/HighlighText";
import Logo from "@/components/Logo";
import { MyAvatar } from "@/components/MyAvatar";
import { showToast } from "@/helper/show-toast.helper";
import { ISendMail } from "@/interfaces/model.interface";
import { generatorResourceMail } from "@/utils/generatorResourceMail";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Modal, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Enums } from "liemdev-profile-lib";
import Image from "next/image";
import { useState, useTransition } from "react";
import intro from "../../../../public/launching.png";
import note from "../../../../public/note.png";
import development from "../../../../public/development.png";

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
      <MyCarousel>
        {/*  */}
        <Row>
          <Col span={12} offset={6} className="flex flex-col gap-6">
            <Image
              width={400}
              height={400}
              src={intro.src}
              alt="intro"
              className="m-auto"
            />
            <h1 className="text-2xl font-bold text-foreground text-center">
              If you are interested in this <HighlighText text="Storage" />,
              please join us.
            </h1>
            <p className="text-lg text-gray-500 text-center">
              Has this amazing Storage caught your eye yet? Join us now to
              unlock a world of exclusive features, smarter solutions, and so
              much more!
            </p>
            <div className="text-center">
              <Avatar.Group>
                <MyAvatar
                  // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="liem"
                  fallbackText={"liem"}
                />
                <MyAvatar
                  // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="liem"
                  fallbackText={"liem"}
                />
                <MyAvatar
                  // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="liem"
                  fallbackText={"liem"}
                />
              </Avatar.Group>
              <Button
                size="large"
                shape="circle"
                className="-ml-2"
                icon={<PlusOutlined />}
                onClick={() => setIsOpen(true)}
              />
            </div>
          </Col>
        </Row>

        {/*  */}
        <Row>
          <Col span={12} offset={6} className="flex flex-col gap-6">
            <Image
              width={200}
              height={200}
              src={note.src}
              alt="intro"
              className="m-auto mb-20"
            />
            <h1 className="text-2xl font-bold text-foreground text-center">
              Want full control of <HighlighText text="your Storage" />? Join us
              now.
            </h1>
            <p className="text-lg text-gray-500 text-center">
              Unlock editing access, manage your own resources, and enjoy a
              seamless, smarter experience designed to give you total creative
              freedom.
            </p>
          </Col>
        </Row>

        {/*  */}
        <Row>
          <Col span={12} offset={6} className="flex flex-col gap-6">
            <Image
              width={200}
              height={200}
              src={development.src}
              alt="intro"
              className="m-auto mb-20"
            />
            <h1 className="text-2xl font-bold text-foreground text-center">
              This Storage is better with <HighlighText text="You" /> — become a
              member today.
            </h1>
            <p className="text-lg text-gray-500 text-center">
              Get exclusive editing rights, organize and update resources your
              way, and make the most of every feature we have to offer.
            </p>
          </Col>
        </Row>
      </MyCarousel>

      {/*  */}
      <Modal
        open={isOpen}
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
        width={500}
      >
        <div className="pt-4">
          <div className="text-center mb-6">
            <Logo size="small" />
          </div>
          <Form
            form={actionForm}
            name="user-action"
            initialValues={{ remember: true }}
            onFinish={onSubmitForm}
            onFinishFailed={() => {}}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item<TForm>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input size="large" maxLength={16} placeholder="name" />
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
                <Select.Option value="image-storage">
                  Image storage
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item<TForm> label="Description" name="desc">
              <TextArea rows={2} placeholder="description" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
