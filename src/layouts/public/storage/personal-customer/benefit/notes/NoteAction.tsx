"use client";
import { create, update } from "@/apis/role.api";
import { INote } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { customerMessageErrorAntd } from "@/utils/customerMessageErrorAntd";
import { showMessage } from "@/utils/show-message.util";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { useEffect, useTransition } from "react";

export function NoteAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<INote>) {
  const idEdit = dataEdit?.id;
  const [roleActionForm] = Form.useForm<Partial<INote>>();
  const [isPending, startTransition] = useTransition();

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
      try {
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
      } catch (error) {
        const messages = customerMessageErrorAntd<INote>(
          error as ValidateErrorEntity,
          ["dataSources"]
        );
        console.log("messages:::", messages);

        for (const mess of messages) {
          showMessage({
            statusCode: 422,
            message: mess,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as TResponse<any>);
        }
      }
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
        <Form.Item<INote>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input size="large" placeholder="Enter name" />
        </Form.Item>

        {/*  */}
        <Form.Item<INote>
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} placeholder="Enter description" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
