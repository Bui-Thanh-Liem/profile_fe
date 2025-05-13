import { CardSubjectItem } from "@/components/cards/CardSubjectItem";
import { PaginationStorage } from "@/layouts/public/storage/general/PaginationStorage";
import { ISubjectItem } from "@/interfaces/model.interface";
import { IPropComponentLayout } from "@/interfaces/propsComponent.interface";
import { Col, Row } from "antd";
import Image from "next/image";

// Bao gom subject-item, subject-group
export function SubjectLayout({
  items,
  totalItems,
}: IPropComponentLayout<ISubjectItem>) {
  return (
    <>
      <Row className="w-full relative min-h-content-storage" gutter={[24, 24]}>
        {items?.map((item, idx) => (
          <Col key={item.id} span={8} className={idx % 3 === 2 ? "pr-0" : ""}>
            <CardSubjectItem item={item} />
          </Col>
        ))}

        {!items.length && (
          <Col span={24} className="flex h-content-storage justify-center">
            <Image
              width={200}
              height={200}
              src="/empty.png"
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
