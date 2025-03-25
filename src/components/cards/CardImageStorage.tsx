import { IImageStorage, IKeyWord } from "@/interfaces/model.interface";
import { IPropCardItem } from "@/interfaces/propsComponent.interface";
import { Badge, Card, Carousel, Modal, Space, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { useState } from "react";
import { ItemAction } from "../ItemAction";

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
        onClick={(e) => {
          setVisible(true);
          e.preventDefault();
          e.stopPropagation();
        }}
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
  item,
  actives,
  onClickEdit,
  onClickDelete,
  onClickActive,
}: IPropCardItem<IImageStorage>) {
  const { id, label, desc, images, keyWord } = item;
  const isActive = actives.includes(id);

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
          <Space className="flex items-center">
            <Tag
              bordered={false}
              color={isActive ? "error" : ""}
              onClick={onClickActive}
            >
              Checked
            </Tag>
            <ItemAction
              onEdit={() => onClickEdit(item)}
              onDelete={() => onClickDelete([id])}
            />
          </Space>
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
