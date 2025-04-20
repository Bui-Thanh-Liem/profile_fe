"use client";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Enums } from "liemdev-profile-lib";
import Image from "next/image";
import { useEffect, useTransition } from "react";
import intro from "../../../../public/launching.png";
import { sendMailAdmin } from "@/apis/send-mail";
import { ISendMail } from "@/interfaces/model.interface";
import { generatorResourceMail } from "@/utils/generatorResourceMail";
import { showToast } from "@/helper/show-toast.helper";
import { TResponse } from "@/interfaces/response.interface";

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

  //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        } as TResponse<any>);
        console.log("Error::", error);
      }
    });
  }

  return (
    <Row className="pt-20">
      <Col span={12}>
        <Image width={512} height={512} src={intro.src} alt="intro" />
      </Col>
      <Col span={12} className="-mt-10">
        <p className="text-xl font-bold">
          &ldquo;Hello programmers! If you want to share your knowledge and
          build a valuable knowledge base together, don&apos;t hesitate to email
          me — I&apos;m always ready to listen and accompany you!&ldquo;
        </p>
        <Form
          form={actionForm}
          name="user-action"
          initialValues={{ remember: true }}
          onFinish={onSubmitForm}
          onFinishFailed={() => {}}
          layout="vertical"
          autoComplete="off"
          className="mt-8 p-8 bg-gray-second-app rounded-lg shadow-lg"
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
          <div className="text-center">
            <ButtonPrimary
              loading={isPending}
              size="large"
              className="w-56"
              onSubmit={onSubmitForm}
            >
              submit
            </ButtonPrimary>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
