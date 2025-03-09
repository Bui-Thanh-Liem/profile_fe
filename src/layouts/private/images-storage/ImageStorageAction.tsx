"use client";
import { update, uploadSingle, findAllKey } from "@/apis/image";
import { showToast } from "@/helper/show-toast.helper";
import { IImage } from "@/interfaces/model.interface";
import { IPropRoleAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidV4 } from "uuid";

export default function ImageStorageAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropRoleAction<IImage>) {
  const idEdit = dataEdit?.id;
  const [roleGroupActionForm] = Form.useForm<Partial<IImage>>();
  const [isPending, startTransition] = useTransition();
  const [keys, setKeys] = useState<Pick<IImage, "key">[]>();

  //
  useEffect(() => {
    if (idEdit) {
      roleGroupActionForm.setFieldsValue({
        label: dataEdit?.label,
        key: dataEdit.key,
      });
    }
    fetchDataForForm();
  }, [dataEdit, idEdit, roleGroupActionForm]);

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
        const formData = await roleGroupActionForm.validateFields();
        let res: TResponse<IImage>;
        if (idEdit) {
          res = await update(idEdit, formData);
        } else {
          res = await uploadSingle(formData);
        }

        //
        if (res.statusCode !== 200) {
          showToast(res);
          return;
        }
        showToast(res);
        handleCancel();
        roleGroupActionForm.resetFields();
      });
    } catch (error) {
      console.log("Error::", error);
    }
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIsOpen(false);
      roleGroupActionForm.resetFields();
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
        form={roleGroupActionForm}
        name="user-action"
        initialValues={{ remember: true }}
        onFinish={onSubmitForm}
        onFinishFailed={() => {}}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item<IImage>
          label="Label"
          name="label"
          rules={[{ required: true, message: "Please input label!" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item<IImage>
          label="Key word"
          name="key"
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
