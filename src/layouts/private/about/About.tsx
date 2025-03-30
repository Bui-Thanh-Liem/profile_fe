"use client";
import { update } from "@/apis/about.api";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { MyUpload } from "@/components/MyUpload";
import { showToast } from "@/helper/show-toast.helper";
import { IAbout } from "@/interfaces/model.interface";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import { useEffect, useTransition } from "react";
const { TextArea } = Input;

export function AboutAdminLayout({ item }: { item: IAbout }) {
  const [aboutActionForm] = Form.useForm<Partial<IAbout>>();
  const [isPending, startTransition] = useTransition();

  //
  useEffect(() => {
    if (item) {
      aboutActionForm.setFieldsValue({
        text: item?.text || [],
        email: item?.email,
        address: item?.address,
        phone: item?.phone,
      });
    }
  }, []);

  function resetForm() {
    aboutActionForm.setFieldsValue({
      text: item?.text || [],
      email: item?.email,
      address: item?.address,
      phone: item?.phone,
      image: item?.image,
    });
  }

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formDataAntd = await aboutActionForm.validateFields();

        //
        const formdata = new FormData();
        for (const [key, value] of Object.entries(formDataAntd)) {
          if (key === "image" && typeof value === "object") {
            formdata.append(key, (value as any)[0]);
          } else if (key === "text" && typeof value === "object") {
            (value as string[]).forEach((str: string) =>
              formdata.append("text", str)
            );
          } else {
            formdata.append(key, value as any);
          }
        }

        //
        const res = await update(formdata);
        if (res.statusCode !== 200) {
          showToast(res);
          return;
        }
        showToast(res);
      } catch (error) {
        console.log("Error::", error);
      }
    });
  }

  return (
    <Row gutter={[16, 24]}>
      <Col span={18} offset={3}>
        <Form
          form={aboutActionForm}
          name="user-action"
          initialValues={{ remember: true }}
          onFinish={onSubmitForm}
          onFinishFailed={() => {}}
          layout="vertical"
          autoComplete="off"
        >
          <Form.List name="text">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="flex w-full">
                    <Form.Item
                      {...restField}
                      key={key}
                      name={name}
                      rules={[{ required: true, message: "Enter email!" }]}
                      className="w-full"
                      label="Text"
                    >
                      <TextArea
                        className="w-full"
                        rows={3}
                        size="large"
                        placeholder="Enter text"
                        disabled={isPending}
                      />
                    </Form.Item>
                    <Button shape="circle" danger>
                      <MinusOutlined onClick={() => remove(name)} />
                    </Button>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add("")}
                  block
                  icon={<PlusOutlined />}
                  disabled={fields.length >= 3}
                >
                  add new line
                </Button>
              </>
            )}
          </Form.List>

          <Form.Item<IAbout>
            label="Address"
            name="address"
            className="mt-4"
            rules={[{ required: true, message: "Enter address!" }]}
          >
            <Input
              size="large"
              placeholder="Enter address"
              disabled={isPending}
            />
          </Form.Item>

          <div className="flex gap-4">
            <div className="w-1/2">
              <Form.Item<IAbout>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Enter email!" },
                  {
                    type: "email",
                    message: "The input is note a valid email!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter email"
                  disabled={isPending}
                />
              </Form.Item>
              <Form.Item<IAbout>
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Enter phone!" }]}
              >
                <Input
                  size="large"
                  placeholder="Enter phone"
                  disabled={isPending}
                />
              </Form.Item>
            </div>
            <Form.Item<IAbout>
              label="Upload Image"
              name="image"
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <MyUpload
                values={item?.image ? [item.image] : []}
                onChangeUpload={(files) =>
                  aboutActionForm.setFieldsValue({ image: files as any })
                }
                length={1}
                aspect={3 / 4}
              />
            </Form.Item>
          </div>

          <ButtonPrimary htmlType="submit">Submit</ButtonPrimary>
          <Button className="ml-2" onClick={resetForm}>
            Reset
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
