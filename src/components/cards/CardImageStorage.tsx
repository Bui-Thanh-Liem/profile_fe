import { IImageStorage, IKeyWord } from "@/interfaces/model.interface";
import { Card, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { ImageCarousel } from "../ImageCarousel";
import { setPrefixFile } from "@/utils/setPrefixFile";
export function CardImageStorage({ item }: { item: IImageStorage }) {
  const { label, desc, images, keywords } = item;

  return (
    <Card
      hoverable
      cover={
        <ImageCarousel
          alt={label}
          images={images?.map((img) => setPrefixFile(img))}
        />
      }
      className="shadow-md shadow-primary rounded-md"
    >
      <Meta
        title={label}
        description={<p className="line-clamp-3">{desc}</p>}
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
  );
}
