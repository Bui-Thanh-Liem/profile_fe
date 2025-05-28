"use client";
import { like } from "@/apis/knowledge.api";
import { ICustomer, IKeyWord, IKnowledge } from "@/interfaces/model.interface";
import useCustomerStore from "@/stores/useCustomerStore";
import { setPrefixFile } from "@/utils/setPrefixFile";
import {
  CodepenOutlined,
  FrownOutlined,
  LikeFilled,
  LikeOutlined,
  MehOutlined,
  MessageOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Badge, Card, Rate, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { ModalCodeView } from "../modals/ModalCodeView";
import { MyTooltip } from "../MyTooltip";

function LikeItem({
  customer,
  knowledge,
}: {
  customer: Partial<ICustomer>;
  knowledge: IKnowledge;
}) {
  if (!customer) return <LikeOutlined />;
  const { id } = customer;
  const isLiked = (knowledge?.likes as ICustomer[])?.some(
    (like) => like.id === id
  );

  //
  async function onLike() {
    await like(knowledge.id);
  }

  return (
    <div
      className={`flex items-center justify-center gap-2 mt-1 ${
        isLiked && "text-blue-700"
      }`}
      onClick={onLike}
    >
      {isLiked ? <LikeFilled /> : <LikeOutlined />}
      <span>{knowledge?.likeCount}</span>
    </div>
  );
}

//
export function CardKnowledge({ item }: { item: IKnowledge }) {
  const { name, desc, image, keywords, code } = item;
  const { currentCustomer } = useCustomerStore();

  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  return (
    <Badge.Ribbon text={name || "-"} placement="start" color="#4b5563">
      <Card
        hoverable
        cover={
          <div className="w-36 h-36 relative mt-10">
            <Image
              fill
              alt={name}
              src={setPrefixFile(image)}
              className="object-contain"
              unoptimized
            />
          </div>
        }
        className="shadow-md rounded-xl cursor-default"
        actions={[
          <ModalCodeView code={code} name={name} key="code-view">
            <CodepenOutlined
              style={{ fontSize: "24px" }}
              className="hover:scale-125 hover:rotate-180 transition-transform duration-200"
            />
          </ModalCodeView>,
          <LikeItem
            key="like"
            customer={currentCustomer as Partial<ICustomer>}
            knowledge={item}
          />,
          <MessageOutlined key="comment" disabled />,
        ]}
      >
        <Meta
          title={null}
          description={
            <>
              <Rate
                disabled
                character={({ index = 0 }) => customIcons[index + 1]}
                style={{ fontSize: 18, color: "#04befe" }}
                defaultValue={3}
              />
              <MyTooltip title={desc} placement="left">
                <p className="line-clamp-1">{desc}</p>
              </MyTooltip>
            </>
          }
        />
        {keywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-y-2">
            {(keywords as IKeyWord[])?.map((keyword) => (
              <Tag key={keyword.name} color={keyword.color}>
                {keyword.name}
              </Tag>
            ))}
          </div>
        )}
      </Card>
    </Badge.Ribbon>
  );
}
