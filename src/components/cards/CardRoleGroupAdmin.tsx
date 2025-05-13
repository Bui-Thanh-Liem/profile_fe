import { IRoleDataResource } from "@/interfaces/common.interface";
import { IRole, IRoleGroup } from "@/interfaces/model.interface";
import { IPropCardItemAdmin } from "@/interfaces/propsComponent.interface";
import { generatorColor } from "@/utils/generatorColorRole";
import { Badge, Card, Space, Tag } from "antd";
import { v4 } from "uuid";
import { ActionCard } from "../ActionCard";

//
function RoleItem({ role }: { role: IRole }) {
  const dataSources = (role.dataSources || []) as IRoleDataResource[];

  return (
    <div className="mb-2">
      <Badge color="blue" text={role.name} className="line-clamp-1" />
      <div className="ml-3">
        {dataSources?.map((dataSource) => (
          <div key={v4()} className="mb-2 flex justify-between items-center">
            <p className="bg-gray-second-app w-full">{dataSource.resource}</p>
            <div className="flex items-center gap-2">
              {dataSource.actions?.map((action) => (
                <Tag color={generatorColor[action]} key={v4()}>
                  {action}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//
export function CardRoleGroupAdmin({
  actives,
  item,
  onClickActive,
  onClickDelete,
  onClickEdit,
}: IPropCardItemAdmin<IRoleGroup>) {
  const { id, name, roles } = item;
  const isActive = actives?.includes(id);

  //
  return (
    <>
      <Card
        hoverable
        title={name}
        extra={
          <Space className="flex items-center">
            <Tag
              bordered={false}
              color={isActive ? "error" : ""}
              onClick={onClickActive}
            >
              Checked
            </Tag>
            <ActionCard
              onDelete={() => {
                if (onClickDelete) onClickDelete([id]);
              }}
              onEdit={() => {
                if (onClickEdit) onClickEdit(item);
              }}
            />
          </Space>
        }
      >
        {(roles as IRole[])?.map((role) => (
          <RoleItem key={v4()} role={role} />
        ))}
      </Card>
    </>
  );
}
