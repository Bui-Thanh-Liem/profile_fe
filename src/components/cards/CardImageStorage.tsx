import { IImageStorage, IKeyWord, IUser } from "@/interfaces/model.interface";
import { IPropCardItemAdmin } from "@/interfaces/propsComponent.interface";
import { Card, Space, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { ImageCarousel } from "../ImageCarousel";
import { ItemAction } from "../ActionCard";
import { MyAvatar } from "../MyAvatar";
import { Author } from "../Author";

//
export function CardImageStorage({
  item,
  actives,
  onClickEdit,
  onClickDelete,
  onClickActive,
  type,
}: IPropCardItemAdmin<IImageStorage> & { type: "customer" | "admin" }) {
  const {
    id,
    label,
    desc,
    images,
    keywords,
    createdBy,
    createdAt,
    updatedAt,
    updatedBy,
  } = item;
  const { avatar, fullName } = createdBy as IUser;
  const isActive = actives?.includes(id);

  //
  return (
    <Card
      hoverable
      extra={
        type === "admin" && (
          <Space className="flex items-center">
            <Tag
              bordered={false}
              color={isActive ? "error" : ""}
              onClick={onClickActive}
            >
              Checked
            </Tag>
            <ItemAction
              onEdit={() => {
                if (onClickEdit) onClickEdit(item);
              }}
              onDelete={() => {
                if (onClickDelete) onClickDelete([id]);
              }}
            />
          </Space>
        )
      }
      cover={<ImageCarousel alt={label} images={images} />}
      actions={
        type === "admin"
          ? [
              <Author
                key={"created"}
                user={createdBy as IUser}
                date={createdAt}
                detail={false}
              />,
              <Author
                key={"created"}
                user={updatedBy as IUser}
                date={updatedAt}
                detail={false}
              />,
            ]
          : undefined
      }
      className="shadow-md shadow-primary rounded-md"
    >
      <Meta
        avatar={
          <MyAvatar
            className="cursor-pointer"
            src={avatar || ""}
            alt={fullName || ""}
            fallbackText={fullName || ""}
          />
        }
        title={label}
        description={desc}
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
      <div>
        <p>{}</p>
      </div>
    </Card>
  );
}
