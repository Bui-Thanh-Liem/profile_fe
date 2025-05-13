import { IKeyWord, ISubjectItem } from "@/interfaces/model.interface";
import { setPrefixFile } from "@/utils/setPrefixFile";
import { Card, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";

export function CardSubjectItem({ item }: { item: ISubjectItem }) {
  const { name, desc, image, keywords } = item;

  return (
    <Card
      hoverable
      cover={
        <div className="w-40 h-40 relative mt-10">
          <Image
            fill
            alt={name}
            src={setPrefixFile(image)}
            className="cursor-pointer object-contain"
            unoptimized
          />
        </div>
      }
      className="shadow-md shadow-primary rounded-3xl"
    >
      <Meta title={name} description={<p className="line-clamp-3">{desc}</p>} />
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
  );
}
