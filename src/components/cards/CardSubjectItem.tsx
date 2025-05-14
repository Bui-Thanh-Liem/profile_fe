"use client";
import { IKeyWord, ISubjectItem } from "@/interfaces/model.interface";
import { setPrefixFile } from "@/utils/setPrefixFile";
import {
  CodepenOutlined,
  FrownOutlined,
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

//
export function CardSubjectItem({ item }: { item: ISubjectItem }) {
  const { name, desc, image, keywords, code } = item;

  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  return (
    <Badge.Ribbon text={name || "Error"} placement="start" color="#4b5563">
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
          <ModalCodeView value={code} key="code-view">
            <CodepenOutlined
              style={{ fontSize: "24px" }}
              className="hover:scale-125 hover:rotate-180 transition-transform duration-200"
            />
          </ModalCodeView>,
          <LikeOutlined key="like" disabled />,
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
