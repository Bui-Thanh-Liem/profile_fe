"use client";
import { create, update } from "@/apis/note";
import { INote } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { showMessage } from "@/utils/show-message.util";
import {
  Button,
  Card,
  Col,
  ColorPicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Enums } from "liemdev-profile-lib";
import { useEffect, useTransition } from "react";
const { Text } = Typography;

export function NoteAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<INote>) {
  const idEdit = dataEdit?.id;
  const [roleActionForm] = Form.useForm<Partial<INote>>();
  const [isPending, startTransition] = useTransition();
  const status = Object.values(Enums.EStatus);

  //
  useEffect(() => {
    if (idEdit) {
      roleActionForm.setFieldsValue({
        title: dataEdit?.title,
        desc: dataEdit.desc,
        date: dataEdit.date,
        status: dataEdit.status,
      });
    }
  }, [dataEdit, idEdit, roleActionForm]);

  //
  function onSubmitForm() {
    startTransition(async () => {
      const formData = await roleActionForm.validateFields();
      console.log("formData:::", formData);

      let res: TResponse<INote>;
      if (idEdit) {
        res = await update(idEdit, formData);
      } else {
        res = await create(formData);
      }

      //
      if (res.statusCode !== 200) {
        showMessage(res);
        return;
      }
      showMessage(res);
      handleCancel();
      roleActionForm.resetFields();
    });
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIsOpen(false);
      roleActionForm.resetFields();
      if (onClose) {
        onClose();
      }
    }
  }

  return (
    <Modal
      open={isOpen}
      title={
        <div className="text-center">
          <p className="my-4">{`${idEdit ? "Edit" : "Create"} role`}</p>
        </div>
      }
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
      width={700}
    >
      <Form
        form={roleActionForm}
        name="user-action"
        initialValues={{ remember: true }}
        onFinish={onSubmitForm}
        onFinishFailed={() => {}}
        layout="vertical"
        autoComplete="off"
      >
        {/*  */}
        <Row gutter={[12, 0]}>
          <Col span={18}>
            <Form.Item<INote>
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please input title!" },
                { max: 60, message: "Maximum 60 character" },
              ]}
            >
              <Input size="large" placeholder="Enter title" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<INote>
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select status!" }]}
            >
              <Select
                size="large"
                placeholder="Select status"
                options={status?.map((sta) => ({ label: sta, value: sta }))}
              />
            </Form.Item>
          </Col>
        </Row>

        {/*  */}
        <Form.Item<INote>
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        {/*  */}
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card size="small">
            <Row justify="space-between" align="middle">
              <Col>
                <Text>Color</Text>
              </Col>
              <Col>
                <Form.Item<INote>
                  name="color"
                  rules={[{ required: true, message: "Please select color!" }]}
                >
                  <ColorPicker size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card size="small" title="Select shape">
            <Row justify="space-between" align="middle">
              <Col>
                <Text>Shape</Text>
              </Col>
              <Col>
                <Form.Item<INote>
                  name="shape"
                  rules={[{ required: true, message: "Please select shape!" }]}
                >
                  <Radio.Group defaultValue="dot" size="large">
                    <Radio.Button value="dot">Dot</Radio.Button>
                    <Radio.Button value="block">Block</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card size="small" title="Pin">
            <Row justify="space-between" align="middle">
              <Col>
                <Text>Pin</Text>
              </Col>
              <Col>
                <Form.Item<INote> name="pin">
                  <Switch defaultChecked />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Form>
    </Modal>
  );
}
