"use client";
import { create, update } from "@/apis/role-group";
import { findAll } from "@/apis/role.api";
import { useToast } from "@/hooks/useToast";
import { IRole, IRoleGroup } from "@/interfaces/model.interface";
import { IPropRoleAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

export default function RoleGroupAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropRoleAction<IRoleGroup>) {
  const idEdit = dataEdit?.id;
  const [roleGroupActionForm] = Form.useForm<Partial<IRoleGroup>>();
  const [roles, setRoles] = useState<IRole[]>();
  const { showToast, contextHolder } = useToast();

  //
  useEffect(() => {
    if (idEdit) {
      roleGroupActionForm.setFieldsValue({
        name: dataEdit?.name,
        desc: dataEdit.desc,
      });
    }

    fetchDataForForm();
  }, [dataEdit, idEdit, roleGroupActionForm]);

  //
  async function fetchDataForForm() {
    const [resRole] = await Promise.all([findAll({ limit: "1e9", page: "1" })]);
    if (resRole.statusCode === 200) {
      setRoles(resRole.data.items);
    }
  }

  //
  async function onSubmitForm() {
    try {
      const formData = await roleGroupActionForm.validateFields();
      let res: TResponse<IRoleGroup>;
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
      roleGroupActionForm.resetFields();
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
        <Button key="ok" type="primary" onClick={onSubmitForm}>
          OK
        </Button>,
      ]}
      width={600}
    >
      {contextHolder}
      <Form
        form={roleGroupActionForm}
        name="user-action"
        initialValues={{ remember: true }}
        onFinish={onSubmitForm}
        onFinishFailed={() => {}}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item<IRoleGroup>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item<IRoleGroup>
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item<IRoleGroup>
          label="Roles"
          name="roles"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select
            mode="multiple"
            maxCount={3}
            size="large"
            placeholder="Select roles"
          >
            {roles?.map((role) => (
              <Select.Option key={uuidV4()} value={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
