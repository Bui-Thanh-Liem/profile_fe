"use client";
import { EResource } from "@/enums/role/resource.enum";
import { IRole, IRoleDataSource } from "@/interfaces/model.interface";
import { IPropRoleAction } from "@/interfaces/propsLayoutAction";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { v4 } from "uuid";
import RoleItemResource from "./RoleItemResource";

export default function RoleAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
}: IPropRoleAction<IRole>) {
  const isEdit = Boolean(dataEdit?.id);
  const [roleActionForm] = Form.useForm();
  const resources = Object.values(EResource);

  //
  useEffect(() => {
    if (isEdit) {
      console.log("data edit :::", dataEdit);
    }
  }, [dataEdit, isEdit]);

  //
  function handleChangeResource(roleDataResource: IRoleDataSource) {
    let oldResource: Array<IRoleDataSource> =
      roleActionForm.getFieldValue("roleDataResource") || [];
    oldResource = oldResource?.filter(
      (resource) => resource.resource !== roleDataResource.resource
    );

    roleActionForm.setFieldValue("roleDataResource", [
      ...oldResource,
      roleDataResource,
    ]);
    console.log("roleDataResource:::", [...oldResource, roleDataResource]);
  }

  //
  async function onSubmitForm() {
    try {
      const formData = await roleActionForm.validateFields();
      console.log("Form values role action:", formData);
      if (setIsOpen) {
        setIsOpen(false);
      }
      roleActionForm.resetFields();
    } catch (error) {
      console.log("Error::", error);
    }
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIsOpen(false);
      roleActionForm.resetFields();
    }
  }

  return (
    <Modal
      open={isOpen}
      title={
        <div className="text-center">
          <p className="my-4">{`${isEdit ? "Edit" : "Create"} role`}</p>
        </div>
      }
      onOk={onSubmitForm}
      onCancel={handleCancel}
      centered
      footer={[
        <Button key="cancel" danger onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={onSubmitForm}>
          OK
        </Button>,
      ]}
      width={600}
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
        <Form.Item<IRole>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item<IRole>
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item<IRole>
          label="Resource"
          name="dataSource"
          rules={[{ required: true, message: "Please input resource!" }]}
        >
          {resources.map((resource) => (
            <RoleItemResource
              key={v4()}
              resource={resource}
              onChangeResource={handleChangeResource}
            />
          ))}
        </Form.Item>
      </Form>
    </Modal>
  );
}
