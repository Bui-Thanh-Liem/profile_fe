import { CardSubjectItem } from "@/components/cards/CardSubjectItem";
import { ISubjectItem } from "@/interfaces/model.interface";
import { IPropComponentLayout } from "@/interfaces/propsComponent.interface";
import { Col, Row } from "antd";
import Image from "next/image";

// Bao gom subject-item, subject-group
export function SubjectLayout({
  items,
  totalItems,
}: IPropComponentLayout<ISubjectItem>) {
  //
  function mergeCouples(items: ISubjectItem[]): ISubjectItem[][] {
    const results = [];

    for (let i = 0; i < items.length; i += 2) {
      const chunk = items.slice(i, i + 2);
      results.push(chunk);
    }

    return results;
  }

  console.log("totalItems:::", totalItems);

  return (
    <>
      {items.length > 0 ? (
        <Row
          className="min-h-content-storage flex-nowrap overflow-x-auto px-2"
          gutter={[24, 24]}
        >
          {mergeCouples(items)?.map((row, idx) => (
            <Col key={idx} span={6}>
              <Row gutter={[24, 24]} className="flex-col py-1">
                {row?.map((col) => (
                  <Col key={col.id} span={24}>
                    <CardSubjectItem item={col} />
                  </Col>
                ))}
              </Row>
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col span={8} offset={8} className="mt-40">
            <Image
              width={200}
              height={200}
              src="/empty.png"
              alt="empty"
              className="m-auto"
            />
          </Col>
        </Row>
      )}
    </>
  );
}
