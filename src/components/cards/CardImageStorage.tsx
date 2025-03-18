import { deleteMulti } from "@/apis/role-group";
import { showToast } from "@/helper/show-toast.helper";
import { IPropCardImageStorage } from "@/interfaces/propsComponent.interface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Checkbox, Dropdown, MenuProps, Space } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { MyImage } from "../MyImage";

export function CardImageStorage({
  imageStorage,
  onClickEdit,
  onChangeChecked,
}: IPropCardImageStorage) {
  const [checked, setChecked] = useState<boolean>(false);
  const { id, label, desc } = imageStorage;

  //
  async function onDelete() {
    const res = await deleteMulti([id]);
    if (res.statusCode !== 200) {
      showToast(res);
      return;
    }
    showToast(res);
  }

  //
  const items: MenuProps["items"] = [
    {
      key: "Edit",
      label: "Edit",
      icon: <EditOutlined />,
      extra: "⌘E",
      onClick: () => onClickEdit(imageStorage),
    },
    {
      type: "divider",
    },
    {
      danger: true,
      key: "Delete",
      label: "Delete",
      icon: <DeleteOutlined color="red" />,
      extra: "⌘D",
      onClick: onDelete,
    },
  ];

  const imageList = [
    "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  ];

  //
  return (
    <>
      <Card
        hoverable
        style={{ width: 300 }}
        extra={
          <Dropdown menu={{ items }} arrow={true}>
            <Space className="text-blue-500">More</Space>
          </Dropdown>
        }
        cover={<MyImage alt={label} images={imageList} />}
      >
        <Meta title={label} description={desc} />
        <div className="text-end">
          <Checkbox
            value={checked}
            checked={checked}
            onChange={(event) => {
              const isChecked = event.target.checked;
              setChecked(isChecked);
              onChangeChecked(isChecked, imageStorage.id);
            }}
          />
        </div>
      </Card>
    </>
  );
}
