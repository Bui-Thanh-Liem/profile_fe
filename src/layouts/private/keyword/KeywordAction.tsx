"use client";
import { create, update } from "@/apis/keyword";
import { showToast } from "@/utils/show-toast.util";
import { IKeyWord } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { Button, ColorPicker, Form, Input, Modal } from "antd";
import { useEffect, useTransition } from "react";

export function KeywordAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<IKeyWord>) {
  const idEdit = dataEdit?.id;
  const [keywordActionForm] = Form.useForm<Partial<IKeyWord>>();
  const [isPending, startTransition] = useTransition();

  //
  useEffect(() => {
    if (idEdit) {
      keywordActionForm.setFieldsValue({
        name: dataEdit?.name,
        color: dataEdit.color,
      });
    }
  }, [dataEdit, idEdit, keywordActionForm]);

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formData = await keywordActionForm.validateFields();
        let res: TResponse<IKeyWord>;
        if (idEdit) {
          res = await update(idEdit, formData);
        } else {
          res = await create(formData);
        }
        console.log("res keyword:::", res);

        //
        if (res.statusCode !== 200) {
          showToast(res);
          return;
        }
        showToast(res);
        handleCancel();
        keywordActionForm.resetFields();
      } catch (error) {
        console.log("Error::", error);
      }
    });
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIsOpen(false);
      keywordActionForm.resetFields();
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
          <p className="my-4">{`${idEdit ? "Edit" : "Create"} keyword`}</p>
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
      width={400}
    >
      <Form
        form={keywordActionForm}
        name="user-action"
        onFinish={onSubmitForm}
        onFinishFailed={() => {}}
        layout="vertical"
        initialValues={{ name: "", color: "#1677ff" }}
        autoComplete="off"
      >
        <Form.Item<IKeyWord>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input size="large" maxLength={16} placeholder="Enter name keyword" />
        </Form.Item>
        <Form.Item<IKeyWord> label="Color" name="color">
          <ColorPicker
            showText
            allowClear
            onChange={(color) => {
              keywordActionForm.setFieldValue("color", color.toHexString());
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
