import { deleteMulti } from "@/apis/role-group";
import { useToast } from "@/hooks/useToast";
import { IRoleDataResource } from "@/interfaces/common.interface";
import { IRole } from "@/interfaces/model.interface";
import { IPropCardRoleGroup } from "@/interfaces/propsComponent.interface";
import { generatorColor } from "@/utils/common.util";
import {
  DeleteOutlined,
  EditOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import { Card, Dropdown, MenuProps, Modal, Space, Tag } from "antd";
import { useState } from "react";
import { v4 } from "uuid";

function RoleItem({ role }: { role: IRole }) {
  const dataSources = (role.dataSources || []) as IRoleDataResource[];

  return (
    <div className="flex justify-between">
      <div>
        <p className="line-clamp-1">{role.name}</p>
        <p className="text-gray-app line-clamp-2">{role.desc}</p>
      </div>
      <div>
        {dataSources?.map((item) => (
          <div className="mb-2" key={v4()}>
            <p className="line-clamp-1">{item.resource}</p>
            {item.actions?.map((action) => (
              <Tag color={generatorColor[action]} key={v4()}>
                {action}
              </Tag>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardRoleGroup({ roleGroup }: IPropCardRoleGroup) {
  const { showToast, contextHolder } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //
  const roles = roleGroup?.roles as IRole[];

  //
  async function onClickEdit() {}

  //
  async function onDelete() {
    const res = await deleteMulti([roleGroup.id]);
    if (res.statusCode !== 200) {
      showToast(res);
      return;
    }
    showToast(res);
  }

  //
  function onClickDetails() {
    setIsOpen(true);
  }

  //
  const items: MenuProps["items"] = [
    {
      key: "Edit",
      label: "Edit",
      icon: <EditOutlined />,
      extra: "⌘E",
      onClick: onClickEdit,
    },
    {
      key: "Details",
      label: "Details",
      icon: <IssuesCloseOutlined />,
      extra: "⌘B",
      onClick: onClickDetails,
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

  //
  return (
    <>
      {contextHolder}
      <Card
        hoverable
        title={roleGroup.name}
        extra={
          <Dropdown menu={{ items }} arrow={true}>
            <Space className="text-blue-500">More</Space>
          </Dropdown>
        }
        style={{ width: 300 }}
      >
        {roles?.map((role) => (
          <p className="font-bold line-clamp-1" key={v4()}>
            {role.name}
          </p>
        ))}
      </Card>
      <Modal
        title={roleGroup.name}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={[]}
        className="max-w-[80vh]"
      >
        <p className="text-gray-app mb-3 line-clamp-1">{roleGroup.desc}</p>

        {roles?.map((role) => (
          <RoleItem key={v4()} role={role} />
        ))}
      </Modal>
    </>
  );
}
