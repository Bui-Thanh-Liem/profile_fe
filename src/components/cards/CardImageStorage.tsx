import { deleteMulti } from "@/apis/image-storage";
import { showToast } from "@/helper/show-toast.helper";
import { IKeyWord } from "@/interfaces/model.interface";
import { IPropCardImageStorage } from "@/interfaces/propsComponent.interface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Badge,
  Card,
  Carousel,
  Checkbox,
  Dropdown,
  MenuProps,
  Modal,
  Space,
} from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { useState } from "react";

interface IPropMyImage {
  images: string[];
  alt: string;
}

//
const MyImageInCard = ({ images, alt }: IPropMyImage) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Image
        height={200}
        width={200}
        alt={alt}
        src={images[0]}
        onClick={() => setVisible(true)}
        className="cursor-pointer object-contain"
      />
      <Modal
        open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        width={800}
        centered
      >
        <Carousel infinite={false} arrows>
          {images.map((src, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <Image
                width={800}
                height={600}
                src={src}
                alt={`carousel-${index}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "500px",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </Carousel>
      </Modal>
    </>
  );
};

//
export function CardImageStorage({
  imageStorage,
  onClickEdit,
  onChangeChecked,
}: IPropCardImageStorage) {
  const [checked, setChecked] = useState<boolean>(false);
  const { id, label, desc, images, keyWord } = imageStorage;

  //
  async function onDelete() {
    const res = await deleteMulti([id]);
    if (res.statusCode !== 200) {
      showToast(res);
      return;
    }
    showToast(res);
  }

  //
  const items: MenuProps["items"] = [
    {
      key: "Edit",
      label: "Edit",
      icon: <EditOutlined />,
      extra: "⌘E",
      onClick: () => onClickEdit(imageStorage),
    },
    {
      type: "divider",
    },
    {
      danger: true,
      key: "Delete",
      label: "Delete",
      icon: <DeleteOutlined color="red" />,
      extra: "⌘D",
      onClick: onDelete,
    },
  ];

  //
  return (
    <Badge.Ribbon
      text={(keyWord as IKeyWord)?.name}
      color={(keyWord as IKeyWord)?.color}
      placement="start"
    >
      <Card
        hoverable
        style={{ width: 300 }}
        extra={
          <>
            <Checkbox
              value={checked}
              checked={checked}
              onChange={(event) => {
                const isChecked = event.target.checked;
                setChecked(isChecked);
                onChangeChecked(isChecked, imageStorage.id);
              }}
              className="mr-6"
            />
            <Dropdown menu={{ items }} arrow={true}>
              <Space className="text-blue-500">More</Space>
            </Dropdown>
          </>
        }
        cover={<MyImageInCard alt={label} images={images} />}
      >
        <Meta
          title={label}
          description={!!desc ? desc : ""}
          className="line-clamp-3"
        />
      </Card>
    </Badge.Ribbon>
  );
}
