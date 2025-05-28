"use client";
import { create, deleteMulti, update } from "@/apis/note";
import { INote } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { showMessage } from "@/utils/show-message.util";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
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
  Tag,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Enums } from "liemdev-profile-lib";
import { useEffect, useState, useTransition } from "react";
const { Text } = Typography;

export function NoteAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
  date,
}: IPropBaseAction<INote> & { date: Date }) {
  const [noteActionForm] = Form.useForm<Partial<INote>>();
  const [isPending, startTransition] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();
  const [idEdit, setIdEdit] = useState<string | null>(null);

  //
  useEffect(() => {
    if (dataEdit?.id) {
      noteActionForm.setFieldsValue({
        title: dataEdit?.title,
        desc: dataEdit?.desc,
        date: dataEdit?.date,
        shape: dataEdit?.shape,
        status: dataEdit?.status,
        color: dataEdit?.color,
        pin: dataEdit?.pin,
      });
      setIdEdit(dataEdit?.id);
    }
  }, [dataEdit, idEdit, noteActionForm]);

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formData = await noteActionForm.validateFields();
        formData.date = date;

        let res: TResponse<INote>;
        if (idEdit) {
          res = await update(idEdit, formData);
        } else {
          res = await create(formData);
        }

        //
        showMessage(res);
        if (res.statusCode !== 200) {
          return;
        }
        handleCancel();
        noteActionForm.resetFields();
      } catch (error) {
        console.log(error);
      }
    });
  }

  //
  function handleDelete() {
    startTransitionDelete(async () => {
      try {
        if (idEdit) {
          const res = await deleteMulti([idEdit]);

          //
          showMessage(res);
          if (res.statusCode !== 200) {
            return;
          }

          handleCancel();
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIdEdit(null);
      setIsOpen(false);
      noteActionForm.resetFields();
      if (onClose) {
        onClose();
      }
    }
  }

  return (
    <Modal
      open={isOpen}
      onOk={onSubmitForm}
      onCancel={handleCancel}
      centered
      footer={[
        <Button
          key="delete"
          danger
          onClick={handleDelete}
          icon={<DeleteOutlined />}
          loading={isPendingDelete}
          type="text"
        >
          Delete
        </Button>,
        <Button
          key="cancel"
          danger
          onClick={handleCancel}
          icon={<CloseOutlined />}
        >
          Cancel
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={onSubmitForm}
          loading={isPending}
          icon={<CheckOutlined />}
        >
          OK
        </Button>,
      ]}
      width={700}
    >
      <Form
        form={noteActionForm}
        name="user-action"
        initialValues={{
          name: "",
          desc: "",
          color: "#04befe",
          shape: Enums.EShapeNote.DOT,
          status: Enums.EStatus.PROCESSING,
          pin: false,
        }}
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
                { max: 80, message: "Maximum 80 character" },
              ]}
            >
              <Input size="large" placeholder="Enter title" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<INote> label="Status" name="status">
              <Select
                size="large"
                placeholder="Select status"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={Object.values(Enums.EStatus)?.map((sta) => ({
                  label: <Tag color={sta.toLocaleLowerCase()}>{sta}</Tag>,
                  value: sta,
                }))}
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
          <Card size="small" title="Select color">
            <Row justify="space-between" align="middle">
              <Col>
                <Text>Select color for your note</Text>
              </Col>
              <Col>
                <Form.Item<INote> name="color">
                  <ColorPicker
                    size="large"
                    showText
                    allowClear
                    onChange={(color) => {
                      noteActionForm.setFieldValue(
                        "color",
                        color.toHexString()
                      );
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card size="small" title="Select shape">
            <Row justify="space-between" align="middle">
              <Col>
                <Text>Make your notes stand out</Text>
              </Col>
              <Col>
                <Form.Item<INote> name="shape">
                  <Radio.Group size="large" buttonStyle="solid">
                    <Radio.Button value={Enums.EShapeNote.DOT}>
                      {Enums.EShapeNote.DOT}
                    </Radio.Button>
                    <Radio.Button value={Enums.EShapeNote.BLOCK}>
                      {Enums.EShapeNote.BLOCK}
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card size="small" title="Pin" className="mb-12">
            <Row justify="space-between" align="middle">
              <Col>
                <Text>
                  Pin your notes and get email notifications.{" "}
                  <Tag color="success">recommended</Tag>
                </Text>
              </Col>
              <Col>
                <Form.Item<INote> name="pin" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Form>
    </Modal>
  );
}
