import { CardImageStorage } from "@/components/cards/CardImageStorage";
import PaginationStorage from "@/components/MyPagination";
import { IImageStorage } from "@/interfaces/model.interface";
import { IPropComponentLayout } from "@/interfaces/propsComponent.interface";
import { Col, Row } from "antd";
import Image from "next/image";
import empty from "../../../../public/empty.png";

export default function ImageStorageLayout({
  items,
  totalItems,
}: IPropComponentLayout<IImageStorage>) {
  return (
    <>
      <Row className="w-full relative min-h-content-storage" gutter={[24, 24]}>
        {items?.map((item, idx) => (
          <Col key={item.id} span={8} className={idx % 3 === 2 ? "pr-0" : ""}>
            <CardImageStorage item={item} type="customer" />
          </Col>
        ))}

        {!items.length && (
          <Col span={24} className="flex h-content-storage justify-center">
            <Image
              width={200}
              height={200}
              src={empty.src}
              alt="empty"
              className="m-auto"
            />
          </Col>
        )}
      </Row>
      <PaginationStorage open={Boolean(totalItems)} total={totalItems} />
    </>
  );
}
