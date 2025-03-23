"use client";
import { create, update } from "@/apis/role.api";
import { showToast } from "@/helper/show-toast.helper";
import { IRoleDataResource } from "@/interfaces/common.interface";
import { IRole } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Enums } from "liemdev-profile-lib";
import { useEffect, useTransition } from "react";
import RoleItemResource from "./RoleItemResource";

export default function RoleAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<IRole>) {
  const idEdit = dataEdit?.id;
  const [roleActionForm] = Form.useForm<Partial<IRole>>();
  const resources = Object.values(Enums.ERoleResources);
  const [isPending, startTransition] = useTransition();

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
  function handleChangeResource(newRoleDataResource: IRoleDataResource) {
    let oldRoleDataResource: Array<IRoleDataResource> =
      roleActionForm.getFieldValue("dataSources") || [];

    oldRoleDataResource = oldRoleDataResource?.filter(
      (resource) => resource.resource !== newRoleDataResource.resource
    );

    const result = [...oldRoleDataResource, newRoleDataResource];

    roleActionForm.setFieldValue(
      "dataSources",
      result.filter((item) => item.actions.length)
    );
  }

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formData = await roleActionForm.validateFields();
        console.log("formData:::", formData);

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

  console.log("re-render role action");

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

        {/*  */}
        <Form.Item<IRole>
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        {/*  */}
        <Form.Item<IRole>
          label="Resource"
          name="dataSources"
          rules={[{ required: true, message: "Please input resource!" }]}
        >
          <span>
            {resources.map((resource) => (
              <RoleItemResource
                key={resource}
                value={(dataEdit?.dataSources as IRoleDataResource[])?.find(
                  (item) => item.resource === resource
                )}
                resource={resource}
                onChangeResource={handleChangeResource}
              />
            ))}
          </span>
        </Form.Item>
      </Form>
    </Modal>
  );
}
