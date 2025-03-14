"use client";
import { create, update } from "@/apis/image-storage";
import { showToast } from "@/helper/show-toast.helper";
import { IImage, IImageStorage } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
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
  const [keys, setKeys] = useState<Pick<IImageStorage, "keyWord">[]>();

  //
  useEffect(() => {
    if (idEdit) {
      imageStorageActionForm.setFieldsValue({
        label: dataEdit?.label,
        keyWord: dataEdit.keyWord,
      });
    }
    fetchDataForForm();
  }, [dataEdit, idEdit, imageStorageActionForm]);

  //
  async function fetchDataForForm() {
    const [resRole] = await Promise.all([
      findAllKey({ limit: "1e9", page: "1" }),
    ]);
    if (resRole.statusCode === 200) {
      setKeys(resRole.data.items);
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
          <p className="my-4">{`${idEdit ? "Edit" : "Create"} role group`}</p>
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
          <Input size="large" />
        </Form.Item>

        <Form.Item<IImageStorage>
          label="Key word"
          name="keyWord"
          rules={[{ required: true, message: "Please select key word!" }]}
        >
          <Select maxCount={3} size="large" placeholder="Select key word">
            {keys?.map((item) => (
              <Select.Option key={uuidV4()} value={item.key}>
                {item.key}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<IImage>
          label="Upload Image"
          name="image"
          rules={[{ required: true, message: "Please upload an image!" }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
        >
          <Upload
            beforeUpload={() => false} // Không upload ngay lập tức
            listType="picture-card"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
