"use client";
import { create, update } from "@/apis/image-storage";
import { findAll } from "@/apis/keyword";
import { MyUpload } from "@/components/MyUpload";
import { showToast } from "@/helper/show-toast.helper";
import { IImageStorage, IKeyWord } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidV4 } from "uuid";

export default function ImageStorageAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<IImageStorage>) {
  const idEdit = dataEdit?.id;
  const [imageStorageActionForm] = Form.useForm<Partial<IImageStorage>>();
  const [isPending, startTransition] = useTransition();
  const [keyWords, setKeyWords] = useState<IKeyWord[]>();

  //
  useEffect(() => {
    if (idEdit) {
      //
      const keyWordIds = (dataEdit.keyWords as IKeyWord[])?.map(
        (key) => key.id
      );

      //
      imageStorageActionForm.setFieldsValue({
        label: dataEdit?.label,
        keyWords: keyWordIds,
      });
    }
    fetchDataForForm();
  }, [dataEdit, idEdit, imageStorageActionForm]);

  //
  async function fetchDataForForm() {
    const [resKeyWords] = await Promise.all([
      findAll({ limit: "1e9", page: "1" }),
    ]);
    if (resKeyWords.statusCode === 200) {
      setKeyWords(resKeyWords.data.items);
    }
  }

  //
  function onSubmitForm() {
    try {
      startTransition(async () => {
        const formData = await imageStorageActionForm.validateFields();
        let res: TResponse<IImageStorage>;
        if (idEdit) {
          res = await update(idEdit, formData);
        } else {
          res = await create(formData);
        }

        //
        if (res.statusCode !== 200) {
          showToast(res);
          return;
        }
        showToast(res);
        handleCancel();
        imageStorageActionForm.resetFields();
      });
    } catch (error) {
      console.log("Error::", error);
    }
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIsOpen(false);
      imageStorageActionForm.resetFields();
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
          <p className="my-4">{`${
            idEdit ? "Edit" : "Create"
          } image storage`}</p>
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
        form={imageStorageActionForm}
        name="user-action"
        initialValues={{ remember: true }}
        onFinish={onSubmitForm}
        onFinishFailed={() => {}}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item<IImageStorage>
          label="Label"
          name="label"
          rules={[{ required: true, message: "Please input label!" }]}
        >
          <Input size="large" placeholder="Enter label" />
        </Form.Item>

        <Form.Item<IImageStorage>
          label="Key word"
          name="keyWords"
          rules={[{ required: true, message: "Please select key word!" }]}
        >
          <Select
            maxCount={3}
            size="large"
            mode="multiple"
            placeholder="Select key word"
          >
            {keyWords?.map((item) => (
              <Select.Option key={uuidV4()} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<IImageStorage>
          label="Upload Image"
          name="images"
          rules={[{ required: true, message: "Please upload an image!" }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
        >
          <MyUpload />
        </Form.Item>
      </Form>
    </Modal>
  );
}
