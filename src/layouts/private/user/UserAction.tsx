"use client";
import { findAll } from "@/apis/role.api";
import { create, update } from "@/apis/user.api";
import { showToast } from "@/helper/show-toast.helper";
import { IRole, IRoleGroup, IUser } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { Enums } from "liemdev-profile-lib";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidV4 } from "uuid";

interface IFormAction extends IUser {
  passwordConfirm?: string;
}

export default function UserAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<IUser>) {
  const idEdit = dataEdit?.id;
  const [userActionForm] = Form.useForm<Partial<IUser>>();
  const subAdminValue = Form.useWatch("subAdmin", userActionForm);
  const [roles, setRoles] = useState<Array<IRole>>([]);
  const [roleGroups, setRoleGroups] = useState<Array<IRoleGroup>>([]);
  const [isPending, startTransition] = useTransition();

  //
  useEffect(() => {
    if (subAdminValue) {
      userActionForm.setFieldsValue({
        roleGroups: [],
        roles: [],
      });
    }

    if (idEdit) {
      const editRoles = dataEdit?.roles as IRole[];
      const editRoleGroups = dataEdit?.roleGroups as IRoleGroup[];

      userActionForm.setFieldsValue({
        fullName: dataEdit?.fullName,
        email: dataEdit?.email,
        phone: dataEdit?.phone,
        gender: dataEdit?.gender,
        roles: editRoles?.map((role) => role.id),
        roleGroups: editRoleGroups?.map((role) => role.id),
      });
    }

    fetchDataForForm();
  }, [dataEdit, idEdit, subAdminValue, userActionForm, onClose]);

  //
  async function fetchDataForForm() {
    const [resRole] = await Promise.all([findAll({ limit: "1e9", page: "1" })]);

    if (resRole.statusCode === 200) {
      setRoles(resRole.data.items);
    }

    setRoleGroups([]);
  }

  //
  function onSubmitForm() {
    try {
      startTransition(async () => {
        const formData = await userActionForm.validateFields();
        let res: TResponse<IUser>;
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
        userActionForm.resetFields();
        handleCancel();
      });
    } catch (error) {
      console.log("Error::", error);
    }
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIsOpen(false);
      userActionForm.resetFields();
      if (onClose) {
        onClose();
      }
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        title={
          <div className="text-center">
            <p className="my-4">{`${idEdit ? "Edit" : "Create"} user`}</p>
          </div>
        }
        // onOk={onSubmitForm}
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
        width={800}
      >
        <Form
          form={userActionForm}
          name="user-action"
          initialValues={{ remember: true }}
          onFinish={onSubmitForm}
          onFinishFailed={() => {}}
          layout="vertical"
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<IFormAction>
                label="Fullname"
                name="fullName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input size="large" placeholder="fullname" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<IFormAction>
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select size="large" placeholder="Select gender">
                  <Select.Option key={uuidV4()} value={Enums.EGender.MALE}>
                    {Enums.EGender.MALE}
                  </Select.Option>
                  <Select.Option key={uuidV4()} value={Enums.EGender.FEMALE}>
                    {Enums.EGender.FEMALE}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<IFormAction>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "The input is note a valid email!",
                  },
                ]}
              >
                <Input size="large" placeholder="email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<IFormAction>
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone!" },
                  {
                    pattern: /^\d{10,11}$/,
                    message: "The input is note a valid phone!",
                  },
                ]}
              >
                <Input size="large" placeholder="phone" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={3}>
              <Form.Item<IFormAction>
                label="SubAdmin"
                name="isSubAdmin"
                // rules={[{ required: true, message: "Please select subAdmin!" }]}
              >
                <Select
                  size="large"
                  // placeholder="Select subAdmin"
                  defaultValue={false}
                >
                  <Select.Option key={uuidV4()} value={false}>
                    NO
                  </Select.Option>
                  <Select.Option key={uuidV4()} value={true}>
                    YES
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item<IFormAction>
                label="Role groups"
                name="roleGroups"
                // rules={[
                //   { required: true, message: "Please select role groups!" },
                // ]}
              >
                <Select
                  mode="multiple"
                  maxCount={1}
                  size="large"
                  placeholder="Select role groups"
                  disabled={subAdminValue}
                >
                  {roleGroups?.map((role) => (
                    <Select.Option key={uuidV4()} value={role.id}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item<IFormAction>
                label="Roles"
                name="roles"
                // rules={[{ required: true, message: "Please select role!" }]}
              >
                <Select
                  mode="multiple"
                  maxCount={3}
                  size="large"
                  placeholder="Select roles"
                  disabled={subAdminValue}
                >
                  {roles?.map((role) => (
                    <Select.Option key={uuidV4()} value={role.id}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/*  */}
          {!idEdit && (
            <>
              <Form.Item<IFormAction>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password size="large" placeholder="password" />
              </Form.Item>
              <Form.Item<IFormAction>
                label="Password confirm"
                name="passwordConfirm"
                rules={[
                  {
                    required: true,
                    message: "Please input your password confirm!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      }
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder="passwordConfirm" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}
