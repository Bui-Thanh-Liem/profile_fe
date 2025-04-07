"use client";
import { findAll as findAllGroup } from "@/apis/subject-group.api";
import { findAll as findAllItem } from "@/apis/subject-item.api";
import { create, update } from "@/apis/subject.api";
import { MyUpload } from "@/components/MyUpload";
import { showToast } from "@/helper/show-toast.helper";
import {
  ISubject,
  ISubjectGroup,
  ISubjectItem,
} from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useEffect, useState, useTransition } from "react";
import { v4 as uuidV4 } from "uuid";

export default function SubjectAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<ISubject>) {
  const [imageStorageActionForm] = Form.useForm<Partial<ISubject>>();
  const [isPending, startTransition] = useTransition();
  const [groups, setGroups] = useState<ISubjectGroup[]>([]);
  const [items, setItems] = useState<ISubjectItem[]>([]);

  //
  const fetchDataForForm = useCallback(async () => {
    //
    const [resGroup, resItem] = await Promise.all([
      findAllGroup({
        limit: "1e9",
        page: "1",
      }),
      findAllItem({
        limit: "1e9",
        page: "1",
      }),
    ]);

    //
    if (resGroup.statusCode === 200) {
      setGroups(resGroup.data.items);
    }

    //
    if (resItem.statusCode === 200) {
      setItems(resItem.data.items);
    }
  }, []);

  //
  useEffect(() => {
    if (dataEdit?.id) {
      //
      const groupEdits = (dataEdit?.subjectGroup as ISubjectGroup[]) || [];
      const itemEdits = (dataEdit?.subjectItem as ISubjectItem[]) || [];

      //
      imageStorageActionForm.setFieldsValue({
        name: dataEdit?.name,
        type: dataEdit?.type,
        subjectGroup: groupEdits?.map((val) => val.id),
        subjectItem: itemEdits?.map((val) => val.id),
      });
      setGroups((prev) => [...(prev || []), ...groupEdits]);
      setItems((prev) => [...(prev || []), ...itemEdits]);
    }
    fetchDataForForm();
    return () => {
      setGroups([]);
      setItems([]);
    };
  }, [dataEdit, fetchDataForForm, imageStorageActionForm]);

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formDataAntd = await imageStorageActionForm.validateFields();
        const formdata = new FormData();

        // Fields images other
        for (const [key, value] of Object.entries(formDataAntd)) {
          if (key === "image" && typeof value === "object") {
            formdata.append(key, (value as any)[0]);
          } else {
            formdata.append(key, value as any);
          }
        }

        let res: TResponse<ISubject>;
        if (dataEdit?.id) {
          res = await update(dataEdit?.id, formdata);
        } else {
          res = await create(formdata);
        }

        //
        if (res.statusCode !== 200) {
          showToast(res);
          return;
        }
        showToast(res);
        handleCancel();
        imageStorageActionForm.resetFields();
      } catch (error) {
        console.log("Error::", error);
      }
    });
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIsOpen(false);
      imageStorageActionForm.resetFields();
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
          <p className="my-4">{`${
            dataEdit?.id ? "Edit" : "Create"
          } image storage`}</p>
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
        form={imageStorageActionForm}
        name="user-action"
        initialValues={{ remember: true }}
        onFinish={onSubmitForm}
        onFinishFailed={() => {}}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item<ISubject>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input size="large" placeholder="Enter name" />
        </Form.Item>

        <Form.Item<ISubject>
          label="Subject group"
          name="subjectGroup"
          rules={[{ required: true, message: "Please select subject group!" }]}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Select subject group"
          >
            {groups?.map((item) => (
              <Select.Option key={uuidV4()} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<ISubject>
          label="Subject item"
          name="subjectItem"
          rules={[{ required: true, message: "Please select subject item!" }]}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Select subject item"
          >
            {items?.map((item) => (
              <Select.Option key={uuidV4()} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<ISubject>
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select subject item!" }]}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Select subject item"
          >
            {items?.map((item) => (
              <Select.Option key={uuidV4()} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<ISubject>
          label="Upload Image"
          name="images"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <MyUpload
            values={dataEdit?.images || []}
            onChangeUpload={(files) =>
              imageStorageActionForm.setFieldsValue({ images: files as any })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
