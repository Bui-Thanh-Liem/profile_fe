"use client";
import { findAll } from "@/apis/keyword";
import { create, update } from "@/apis/subject-item.api";
import { MyUpload } from "@/components/MyUpload";
import { IKeyWord, ISubjectItem } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { showToast } from "@/utils/show-toast.util";
import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Enums } from "liemdev-profile-lib";
import { useCallback, useEffect, useState, useTransition } from "react";
import { v4 as uuidV4 } from "uuid";

export default function SubjectItemActionAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<ISubjectItem>) {
  const [subjectItemActionForm] = Form.useForm<Partial<ISubjectItem>>();
  const [isPending, startTransition] = useTransition();
  const [keywords, setKeywords] = useState<IKeyWord[]>([]);
  const [file, setFile] = useState<File | null>(null);

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
      subjectItemActionForm.setFieldsValue({
        name: dataEdit?.name,
        desc: dataEdit?.desc,
        code: dataEdit?.code,
        type: dataEdit?.type,
        keywords: keywordEdits?.map((key) => key.id),
      });
      setFile(dataEdit.image as unknown as File);
      setKeywords((prev) => [...(prev || []), ...keywordEdits]);
    }
    fetchDataForForm();
    return () => {
      setKeywords([]);
    };
  }, [dataEdit, fetchDataForForm, subjectItemActionForm]);

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formDataAntd = await subjectItemActionForm.validateFields();

        //
        const formdata = new FormData();
        for (const [key, value] of Object.entries(formDataAntd)) {
          if (key !== "image") {
            formdata.append(key, value as string);
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formdata.append(key, file as any);
          }
        }

        let res: TResponse<ISubjectItem>;
        if (dataEdit?.id) {
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
      subjectItemActionForm.resetFields();
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
          <p className="my-4">{`${dataEdit?.id ? "Edit" : "Create"} subject item
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
        form={subjectItemActionForm}
        name="user-action"
        initialValues={{ remember: true }}
        onFinish={onSubmitForm}
        onFinishFailed={() => {}}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item<ISubjectItem>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name !" }]}
        >
          <Input size="large" placeholder="Enter name" />
        </Form.Item>

        <Form.Item<ISubjectItem>
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select type !" }]}
        >
          <Select size="large" placeholder="Select type" maxCount={2}>
            {Object.values(Enums.ETypeSubject)?.map((item) => (
              <Select.Option key={uuidV4()} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<ISubjectItem>
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

        <Form.Item<ISubjectItem> label="Code" name="code">
          <TextArea rows={4} placeholder="Enter code" />
        </Form.Item>

        <Form.Item<ISubjectItem> label="Description" name="desc">
          <TextArea rows={2} placeholder="Enter description" />
        </Form.Item>

        <Form.Item<ISubjectItem>
          label="Upload Image"
          name="image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <MyUpload
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            values={file ? [file as any] : []}
            onChangeUpload={([file]) => {
              setFile(file);
              subjectItemActionForm.setFieldValue("image", file);
            }}
            length={1}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
