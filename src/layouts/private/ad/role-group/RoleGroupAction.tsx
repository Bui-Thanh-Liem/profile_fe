"use client";
import { create, update } from "@/apis/role-group";
import { CONSTANT_ROUTE } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { IRole, IRoleGroup } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { showToast } from "@/utils/show-toast.util";
import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { InterfaceCommon } from "liemdev-profile-lib";
import { useEffect, useTransition } from "react";
import { v4 as uuidV4 } from "uuid";

export default function RoleGroupAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<IRoleGroup>) {
  const idEdit = dataEdit?.id;
  const [roleGroupActionForm] = Form.useForm<Partial<IRoleGroup>>();
  const [isPending, startTransition] = useTransition();

  //
  const { data: roles, loading } = useFetch<InterfaceCommon.IGetMulti<IRole>>(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.ROLE}`
  );
  console.log("roles::", roles);

  //
  useEffect(() => {
    if (idEdit) {
      const roles = (dataEdit?.roles || []) as IRole[];
      roleGroupActionForm.setFieldsValue({
        name: dataEdit?.name,
        desc: dataEdit.desc,
        roles: roles?.map((role) => role.id),
      });
    }
  }, [dataEdit, idEdit, roleGroupActionForm]);

  //
  function onSubmitForm() {
    startTransition(async () => {
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
    });
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
        <Form.Item<IRoleGroup>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input size="large" placeholder="Enter name" />
        </Form.Item>
        <Form.Item<IRoleGroup>
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} placeholder="Enter description" />
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
            loading={loading}
          >
            {roles?.items?.map((role) => (
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
