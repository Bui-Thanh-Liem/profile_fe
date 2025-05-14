"use client";
import { findAll } from "@/apis/keyword";
import { create, update } from "@/apis/knowledge.api";
import { MyUpload } from "@/components/MyUpload";
import { IKeyWord, IKnowledge } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { showToast } from "@/utils/show-toast.util";
import { ExpandAltOutlined, ExpandOutlined } from "@ant-design/icons";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { Button, Col, Form, Input, Modal, Row, Select, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Enums } from "liemdev-profile-lib";
import { useCallback, useEffect, useState, useTransition } from "react";
import { v4 as uuidV4 } from "uuid";

export function KnowledgeAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<IKnowledge>) {
  const [knowledgeActionForm] = Form.useForm<Partial<IKnowledge>>();
  const [isPending, startTransition] = useTransition();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [keywords, setKeywords] = useState<IKeyWord[]>([]);
  const [imageFile, setImageFile] = useState<File | string | null>(null);

  //
  const fetchDataForForm = useCallback(async () => {
    const resKeyWords = await findAll({
      limit: "1e9",
      page: "1",
    });
    if (resKeyWords.statusCode === 200) {
      setKeywords(resKeyWords.data.items);
    }
  }, []);

  //
  useEffect(() => {
    if (dataEdit?.id) {
      const keywordEdits = (dataEdit?.keywords as IKeyWord[]) || [];
      knowledgeActionForm.setFieldsValue({
        name: dataEdit?.name,
        desc: dataEdit?.desc,
        code: dataEdit?.code,
        type: dataEdit?.type,
        keywords: keywordEdits?.map((key) => key.id),
      });
      setImageFile(dataEdit.image);
      setKeywords((prev) => [...(prev || []), ...keywordEdits]);
    }
    fetchDataForForm();
    return () => {
      setKeywords([]);
    };
  }, [dataEdit, fetchDataForForm, knowledgeActionForm]);

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formDataAntd = await knowledgeActionForm.validateFields();

        //
        const formdata = new FormData();
        for (const [key, value] of Object.entries(formDataAntd)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formdata.append(key, value as any);
        }

        let res: TResponse<IKnowledge>;
        if (dataEdit?.id) {
          if (imageFile && typeof imageFile === "object") {
            formdata.set("image", imageFile);
          }
          res = await update(dataEdit?.id, formdata);
        } else {
          res = await create(formdata);
        }

        //
        if (res.statusCode !== 200) {
          showToast(res);
          return;
        }
        showToast(res);
        handleCancel();
      } catch (error) {
        console.log("Error::", error);
      }
    });
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIsOpen(false);
      knowledgeActionForm.resetFields();
      if (onClose) {
        onClose();
      }
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        title={
          <div className="text-center">
            <p className="my-4">{`${dataEdit?.id ? "Edit" : "Create"} knowledge
          `}</p>
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
        width={600}
      >
        <Form
          form={knowledgeActionForm}
          name="user-action"
          initialValues={{ remember: true }}
          onFinish={onSubmitForm}
          onFinishFailed={() => {}}
          layout="vertical"
          autoComplete="off"
        >
          <Row gutter={[12, 12]}>
            <Col span={18}>
              <Form.Item<IKnowledge>
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input name !" },
                  {
                    max: 36,
                    message:
                      "Max length 36 character (an easy-to-understand word or phrase)",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<IKnowledge>
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select type !" }]}
              >
                <Select size="large" placeholder="Select type">
                  {Object.values(Enums.ETypeKnowledge)?.map((item) => (
                    <Select.Option key={uuidV4()} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<IKnowledge>
            label="Key word"
            name="keywords"
            rules={[{ required: true, message: "Please select key word!" }]}
          >
            <Select
              size="large"
              mode="multiple"
              placeholder="Select key word"
              maxCount={2}
            >
              {keywords?.map((item) => (
                <Select.Option key={uuidV4()} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<IKnowledge> label="Description" name="desc">
            <TextArea rows={2} placeholder="Enter description" />
          </Form.Item>

          <div className="relative">
            <Tooltip
              title="Expand"
              placement="right"
              className="absolute right-4 bottom-4 z-50"
            >
              <Button
                icon={<ExpandAltOutlined />}
                onClick={() => setIsEditorOpen(true)}
                style={{ marginBottom: 10 }}
              />
            </Tooltip>
            <Form.Item<IKnowledge> label="Code" name="code">
              <CodeMirror
                height="200px"
                theme={"dark"}
                extensions={[javascript()]}
                onChange={(value) =>
                  knowledgeActionForm.setFieldsValue({ code: value })
                }
              />
            </Form.Item>
          </div>

          <Form.Item<IKnowledge>
            label="Upload Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <MyUpload
              values={dataEdit?.image ? [imageFile as string] : []}
              onChangeUpload={([file]) => {
                setImageFile(file);
                knowledgeActionForm.setFieldValue("image", file);
              }}
              length={1}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/*  */}
      <Modal
        title="Code editor"
        closable={true}
        open={isEditorOpen}
        centered
        footer={null}
        onCancel={() => setIsEditorOpen(false)}
        maskClosable={true}
        width={900}
        closeIcon={<ExpandOutlined />}
      >
        <CodeMirror
          value={knowledgeActionForm.getFieldValue("code")}
          theme={"dark"}
          extensions={[javascript()]}
          height="80vh"
          onChange={(value) =>
            knowledgeActionForm.setFieldsValue({ code: value })
          }
        />
      </Modal>
    </>
  );
}
