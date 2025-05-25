"use client";
import { sendMailAdmin } from "@/apis/send-mail";
import { MyCarousel } from "@/components/carousel/MyCarousel";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import Logo from "@/components/Logo";
import { ISendMail } from "@/interfaces/common.interface";
import { generatorResourceMail } from "@/utils/generatorResourceMail";
import { showToast } from "@/utils/show-toast.util";
import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Enums } from "liemdev-profile-lib";
import Image from "next/image";
import { useState, useTransition } from "react";

type TForm = {
  name: string;
  email: string;
  type: Enums.ETypeKnowledge;
  desc?: string;
};

export const StorageLayout = () => {
  //
  const [actionForm] = Form.useForm<Partial<TForm>>();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //
  function onSubmitForm() {
    startTransition(async () => {
      try {
        const formData = await actionForm.validateFields();
        const payloadSendMail: ISendMail = {
          type: Enums.ETypeMail.FORM_WISH_REGISTER_USER,
          subject: "This is mail form wish register user",
          source: generatorResourceMail(
            `${formData.email}`,
            `${formData.name} - ${formData.desc} - ${formData.type}`
          ),
        };
        const res = await sendMailAdmin(payloadSendMail);
        //
        if (res.statusCode !== 200) {
          showToast(res);
          return;
        }
        showToast(res);
        actionForm.resetFields();
      } catch (error) {
        console.log("Error::", error);
      }
    });
  }

  //
  function handleCancel() {
    setIsOpen(false);
    actionForm.resetFields();
  }

  const categories = [
    "All features",
    "Dashboard",
    "Keywords",
    "Knowledge",
    "Codes",
  ];
  const [activeFilter, setActiveFilter] = useState(categories[0]);
  const portfolioItems = [
    {
      id: 1,
      title: "Keyword management",
      category: "Keywords",
      image: "/keyword.png",
    },
    {
      id: 2,
      title: "Knowledge management",
      category: "Knowledge",
      image: "/knowledge.png",
    },
    {
      id: 3,
      title: "Dashboard management",
      category: "Dashboard",
      image: "/dashboard.png",
    },
    {
      id: 4,
      title: "Dashboard management",
      category: "Dashboard",
      image: "/dashboard2.png",
    },
    {
      id: 5,
      title: "Action knowledge",
      category: "Knowledge",
      image: "/action-knowledge.png",
    },
    {
      id: 6,
      title: "Add new features",
      category: "Codes",
      image: "/code.png",
    },
  ];
  const filteredPortfolio =
    activeFilter === categories[0]
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <MyCarousel>
        {/*  */}
        <section className="py-10 pt-0">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our rich collection of unique features, while
                empowering you to create and manage personalized repositories
                that truly reflect your individual style and vision.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {categories?.map((cate) => (
                  <button
                    key={cate}
                    onClick={() => setActiveFilter(cate)}
                    className={`px-6 py-2 rounded-button transition duration-300 whitespace-nowrap cursor-pointer ${
                      activeFilter === cate
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cate}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer h-64"
                >
                  <Image
                    fill
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">
                      {item.title}
                    </h3>
                    <p className="text-blue-200 capitalize">
                      {item.category.replace("-", " ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <ButtonPrimary size="large" onClick={() => setIsOpen(true)}>
                <span className="inline-block w-44">Join now</span>
              </ButtonPrimary>
            </div>
          </div>
        </section>
      </MyCarousel>

      {/*  */}
      <Modal
        open={isOpen}
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
        width={500}
      >
        <div className="pt-4">
          <div className="text-center mb-6">
            <Logo />
          </div>
          <Form
            form={actionForm}
            name="user-action"
            initialValues={{ remember: true }}
            onFinish={onSubmitForm}
            onFinishFailed={() => {}}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item<TForm>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input size="large" maxLength={16} placeholder="name" />
            </Form.Item>
            <Form.Item<TForm>
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

            {/*  */}
            <Form.Item<TForm>
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please select type!" }]}
            >
              <Select mode="multiple" size="large" placeholder="Select type">
                <Select.Option value="all">All</Select.Option>
                {Object.values(Enums.ETypeKnowledge)?.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<TForm> label="Description" name="desc">
              <TextArea rows={4} placeholder="description" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
