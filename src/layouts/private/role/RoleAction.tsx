"use client";
import { create, update } from "@/apis/role.api";
import { useToast } from "@/hooks/useToast";
import { IRoleDataResource } from "@/interfaces/common.interface";
import { IRole } from "@/interfaces/model.interface";
import { IPropRoleAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Enums } from "liemdev-profile-lib";
import { useEffect } from "react";
import { v4 } from "uuid";
import RoleItemResource from "./RoleItemResource";

export default function RoleAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropRoleAction<IRole>) {
  const idEdit = dataEdit?.id;
  const dataSources = dataEdit?.dataSources as IRoleDataResource[];
  const [roleActionForm] = Form.useForm<Partial<IRole>>();
  const resources = Object.values(Enums.ERoleResources);
  const { showToast, contextHolder } = useToast();

  //
  useEffect(() => {
    if (idEdit) {
      roleActionForm.setFieldsValue({
        name: dataEdit?.name,
        desc: dataEdit.desc,
      });
    }
  }, [dataEdit, idEdit, roleActionForm]);

  //
  function handleChangeResource(roleDataResource: IRoleDataResource) {
    //
    let oldResource: Array<IRoleDataResource> =
      roleActionForm.getFieldValue("dataSources") || [];

    oldResource = oldResource?.filter(
      (resource) => resource.resource !== roleDataResource.resource
    );

    const result = [...oldResource, roleDataResource];
    roleActionForm.setFieldValue(
      "dataSources",
      result.filter((item) => item.actions.length)
    );
  }

  //
  async function onSubmitForm() {
    try {
      const formData = await roleActionForm.validateFields();
      let res: TResponse<IRole>;
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
        <Button key="ok" type="primary" onClick={onSubmitForm}>
          OK
        </Button>,
      ]}
      width={600}
    >
      {contextHolder}
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
          name="dataSources"
          rules={[{ required: true, message: "Please input resource!" }]}
        >
          {resources.map((resource) => (
            <RoleItemResource
              key={v4()}
              value={dataSources?.find((item) => item.resource === resource)}
              resource={resource}
              onChangeResource={handleChangeResource}
            />
          ))}
        </Form.Item>
      </Form>
    </Modal>
  );
}
