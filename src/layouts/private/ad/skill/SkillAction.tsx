"use client";
import { create, update } from "@/apis/skill";
import { MyUpload } from "@/components/MyUpload";
import { ISkill } from "@/interfaces/model.interface";
import { IPropBaseAction } from "@/interfaces/propsLayoutAction";
import { TResponse } from "@/interfaces/response.interface";
import { showMessage } from "@/utils/show-message.util";
import { Button, Form, Input, Modal, Slider } from "antd";
import { useEffect, useState, useTransition } from "react";

export default function SkillAction({
  dataEdit,
  isOpen = false,
  setIsOpen,
  onClose,
}: IPropBaseAction<ISkill>) {
  const [skillActionForm] = Form.useForm<Partial<ISkill>>();
  const [isPending, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | string | null>(null);

  //
  useEffect(() => {
    if (dataEdit?.id) {
      skillActionForm.setFieldsValue({
        name: dataEdit?.name,
        progress: dataEdit?.progress,
      });
      setImageFile(dataEdit.image);
    }
  }, [dataEdit, skillActionForm]);

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formDataAntd = await skillActionForm.validateFields();

        //
        const formdata = new FormData();
        for (const [key, value] of Object.entries(formDataAntd)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formdata.append(key, value as any);
        }

        let res: TResponse<ISkill>;
        if (dataEdit?.id) {
          if (imageFile && typeof imageFile === "object") {
            formdata.set("image", imageFile);
          }
          res = await update(dataEdit?.id, formdata);
        } else {
          res = await create(formdata);
        }

        //
        if (res.statusCode !== 200) {
          showMessage(res);
          return;
        }
        showMessage(res);
        handleCancel();
        skillActionForm.resetFields();
      } catch (error) {
        console.log("Error::", error);
      }
    });
  }

  //
  function handleCancel() {
    if (setIsOpen) {
      setIsOpen(false);
      skillActionForm.resetFields();
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
          <p className="my-4">{`${dataEdit?.id ? "Edit" : "Create"} skill`}</p>
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
      zIndex={99999}
    >
      <Form
        form={skillActionForm}
        name="user-action"
        initialValues={{ progress: 0 }}
        onFinish={onSubmitForm}
        onFinishFailed={() => {}}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item<ISkill>
          label="Label"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input size="large" placeholder="Enter label" maxLength={16} />
        </Form.Item>

        <Form.Item<ISkill>
          label="Upload Image"
          name="image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <MyUpload
            values={imageFile ? [imageFile as string] : []}
            onChangeUpload={([file]) => {
              setImageFile(file);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              skillActionForm.setFieldsValue({ image: file as any });
            }}
            length={1}
          />
        </Form.Item>
        <Form.Item<ISkill> label="Process" name="progress">
          <Slider
            min={0}
            max={100}
            step={1}
            onChange={(value) => {
              skillActionForm.setFieldsValue({ progress: value });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
