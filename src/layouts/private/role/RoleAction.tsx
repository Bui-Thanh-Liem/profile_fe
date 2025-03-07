"use client";
import { Enums } from "liemdev-profile-lib";
import { IRole } from "@/interfaces/model.interface";
import { IPropRoleAction } from "@/interfaces/propsLayoutAction";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { v4 } from "uuid";
import RoleItemResource from "./RoleItemResource";
import { IRoleDataResource } from "@/interfaces/common.interface";
import { useToast } from "@/hooks/useToast";
import { TResponse } from "@/interfaces/response.interface";
import { create, update } from "@/apis/role.api";

export default function RoleAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
}: IPropRoleAction<IRole>) {
  const idEdit = dataEdit?.id;
  const [roleActionForm] = Form.useForm<Partial<IRole>>();
  const resources = Object.values(Enums.ERoleResources);
  const { showToast, contextHolder } = useToast();

  //
  useEffect(() => {
    if (idEdit) {
      console.log("data edit :::", dataEdit);
      roleActionForm.setFieldsValue({
        name: dataEdit?.name,
        desc: dataEdit.desc,
        dataSources: dataEdit.dataSources,
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

    roleActionForm.setFieldValue("dataSources", [
      ...oldResource,
      roleDataResource,
    ]);
    console.log("dataSources:::", [...oldResource, roleDataResource]);
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
              resource={resource}
              onChangeResource={handleChangeResource}
            />
          ))}
        </Form.Item>
      </Form>
    </Modal>
  );
}
