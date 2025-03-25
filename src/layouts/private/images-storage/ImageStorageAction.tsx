"use client";
import { create, update } from "@/apis/image-storage";
import { findAll } from "@/apis/keyword";
import { MyUpload } from "@/components/MyUpload";
import { showToast } from "@/helper/show-toast.helper";
import { IImageStorage, IKeyWord } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useEffect, useState, useTransition } from "react";
import { v4 as uuidV4 } from "uuid";

export default function ImageStorageAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<IImageStorage>) {
  const [imageStorageActionForm] = Form.useForm<Partial<IImageStorage>>();
  const [isPending, startTransition] = useTransition();
  const [keyWords, setKeyWords] = useState<IKeyWord[]>([]);

  //
  const fetchDataForForm = useCallback(async () => {
    const resKeyWords = await findAll({
      limit: "1e9",
      page: "1",
      fieldUnused: "imageStorage",
    });
    if (resKeyWords.statusCode === 200) {
      setKeyWords(resKeyWords.data.items);
    }
  }, []);

  //
  useEffect(() => {
    if (dataEdit?.id) {
      const keyWord = (dataEdit?.keyWord as IKeyWord) || {};
      imageStorageActionForm.setFieldsValue({
        label: dataEdit?.label,
        desc: dataEdit?.desc,
        keyWord: keyWord?.id,
      });
      setKeyWords((prev) => [...(prev || []), keyWord]);
    }
    fetchDataForForm();
    return () => {
      setKeyWords([]);
    };
  }, [dataEdit, fetchDataForForm, imageStorageActionForm]);

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formDataAntd = await imageStorageActionForm.validateFields();
        const formdata = new FormData();

        // Fields images other
        for (const [key, value] of Object.entries(formDataAntd)) {
          if (key !== "images") {
            formdata.append(key, value as any);
          }
        }

        // Fields images
        const images = formDataAntd.images as any;
        if (images?.length) {
          images.forEach((file: any) => formdata.append("images", file));
        }

        let res: TResponse<IImageStorage>;
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
        imageStorageActionForm.resetFields();
      } catch (error) {
        console.log("Error::", error);
      }
    });
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
            dataEdit?.id ? "Edit" : "Create"
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
          name="keyWord"
          rules={[{ required: true, message: "Please select key word!" }]}
        >
          <Select size="large" placeholder="Select key word">
            {keyWords?.map((item) => (
              <Select.Option key={uuidV4()} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<IImageStorage> label="Description" name="desc">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item<IImageStorage>
          label="Upload Image"
          name="images"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <MyUpload
            values={dataEdit?.images || []}
            onChangeUpload={(files) =>
              imageStorageActionForm.setFieldsValue({ images: files as any })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
