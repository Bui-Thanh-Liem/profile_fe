import { CardImageStorage } from "@/components/cards/CardImageStorage";
import { IImageStorage } from "@/interfaces/model.interface";
import { IPropComponentLayout } from "@/interfaces/propsComponent.interface";
import { Col, Row } from "antd";
import empty from "../../../../public/empty.png";
import Image from "next/image";

export default function ImageStorageLayout({
  items,
  totalItems,
}: IPropComponentLayout<IImageStorage>) {
  if (!items.length) {
    return (
      <div className="flex min-h-[60vh]">
        <Image
          width={200}
          height={200}
          src={empty.src}
          alt="empty"
          className="m-auto"
        />
      </div>
    );
  }

  return (
    <Row className="w-full" gutter={[24, 24]}>
      {items?.map((item, idx) => (
        <Col key={item.id} span={8} className={idx % 3 === 2 ? "pr-0" : ""}>
          <CardImageStorage item={item} type="customer" />
        </Col>
      ))}
    </Row>
  );
}
