"use client";
import { CardKnowledge } from "@/components/cards/CardKnowledge";
import { usePushUrl } from "@/hooks/usePushUrl";
import { IKnowledge } from "@/interfaces/model.interface";
import { IPropComponentLayout } from "@/interfaces/propsComponent.interface";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import { PlusOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";

export function KnowledgeLayout({
  items,
  totalItems,
}: IPropComponentLayout<IKnowledge>) {
  const { pushUrl } = usePushUrl();
  const searchParams = useSearchParams();

  //
  function mergeCouples(items: IKnowledge[]): IKnowledge[][] {
    const results = [];

    for (let i = 0; i < items.length; i += 2) {
      const chunk = items.slice(i, i + 2);
      results.push(chunk);
    }

    return results;
  }

  //
  function onMoreItems() {
    const _limit = searchParams.get("limit") || 0;
    pushUrl({ limit: String(Number(_limit) + 20) });
  }

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
                    <CardKnowledge item={col} />
                  </Col>
                ))}
              </Row>
            </Col>
          ))}
          {!(totalItems <= items.length) && (
            <Col className="self-center">
              <Button
                type="text"
                onClick={onMoreItems}
                icon={<PlusOutlined />}
                iconPosition="end"
              >
                Load more
              </Button>
            </Col>
          )}
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
