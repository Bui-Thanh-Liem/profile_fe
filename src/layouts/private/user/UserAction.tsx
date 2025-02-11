"use client";
import { EBoolean, EGender } from "@/enums/model.enum";
import { IRole, IRoleGroup, IUser } from "@/interfaces/model.interface";
import { IPropUserAction } from "@/interfaces/propsLayoutAction";
import { mock_roles } from "@/mocks/role";
import { mock_roleGroups } from "@/mocks/roleGroup";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

interface IFormAction extends IUser {
  passwordConfirm?: string;
}

export default function UserAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
}: IPropUserAction<IUser>) {
  const isEdit = Boolean(dataEdit?.id);
  const [userActionForm] = Form.useForm();
  const subAdminValue = Form.useWatch("subAdmin", userActionForm);
  const [roles, setRoles] = useState<Array<IRole>>([]);
  const [roleGroups, setRoleGroups] = useState<Array<IRoleGroup>>([]);

  //
  useEffect(() => {
    if (isEdit) {
      console.log("data edit :::", dataEdit);
    }

    if (subAdminValue) {
      userActionForm.setFieldsValue({ roleGroups: [], role: [] });
    }

    fetchDataForForm();
  }, [dataEdit, isEdit, subAdminValue, userActionForm]);

  //
  async function fetchDataForForm() {
    setRoles(mock_roles);
    setRoleGroups(mock_roleGroups);
  }

  //
  async function onSubmitForm() {
    try {
      const formData = await userActionForm.validateFields();
      console.log("Form values user action:", formData);
      if (setIsOpen) {
        setIsOpen(false);
      }
      userActionForm.resetFields();
    } catch (error) {
      console.log("Error::", error);
    }
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIsOpen(false);
      userActionForm.resetFields();
    }
  }

  return (
    <Modal
      open={isOpen}
      title={
        <div className="text-center">
          <p className="my-4">{`${isEdit ? "Edit" : "Create"} user`}</p>
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
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IFormAction>
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select size="large" placeholder="Select gender">
                <Select.Option key={uuidV4()} value={EGender.MALE}>
                  {EGender.MALE}
                </Select.Option>
                <Select.Option key={uuidV4()} value={EGender.FEMALE}>
                  {EGender.FEMALE}
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
                { type: "email", message: "The input is note a valid email!" },
              ]}
            >
              <Input size="large" />
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
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={3}>
            <Form.Item<IFormAction>
              label="SubAdmin"
              name="subAdmin"
              // rules={[{ required: true, message: "Please select subAdmin!" }]}
            >
              <Select
                size="large"
                // placeholder="Select subAdmin"
                defaultValue={false}
              >
                <Select.Option key={uuidV4()} value={false}>
                  {EBoolean.NO}
                </Select.Option>
                <Select.Option key={uuidV4()} value={true}>
                  {EBoolean.YES}
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
              name="role"
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
        {!isEdit && (
          <>
            <Form.Item<IFormAction>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
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
              <Input.Password size="large" />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}
