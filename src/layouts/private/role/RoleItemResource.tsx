"use client";
import { EAction } from "@/enums/action.enum";
import { EResource } from "@/enums/resource.enum";
import { IRoleDataSource } from "@/interfaces/model.interface";
import { Select, SelectProps, Switch, Tag } from "antd";
import { useEffect, useState } from "react";

export const generatorColor: Record<string, string> = {
  [EAction.GET]: "green",
  [EAction.POST]: "blue",
  [EAction.PATCH]: "orange",
  [EAction.DELETE]: "red",
};

type TagRender = SelectProps["tagRender"];
const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={generatorColor[value]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

export default function RoleItemResource({
  resource,
  value,
  onChangeResource,
}: {
  resource: EResource;
  value?: IRoleDataSource;
  onChangeResource: (resource: IRoleDataSource) => void;
}) {
  const [valueSwitch, setValueSwitch] = useState<boolean>(false);
  const [valueAction, setValueAction] = useState<Array<EAction> | null>(null);

  //
  useEffect(() => {
    if (value?.actions.length) {
      setValueAction(value.actions as Array<EAction>);
    }
    setValueSwitch(value?.resource === resource);
  }, []);

  //
  useEffect(() => {
    if (valueAction?.length) {
      onChangeResource({
        resource: resource,
        actions: valueAction || [],
      });
    }
  }, [onChangeResource, resource, valueAction]);

  //
  const actionRoles: SelectProps["options"] = [
    { value: EAction.GET, label: "View" },
    { value: EAction.POST, label: "Create" },
    { value: EAction.PATCH, label: "Update" },
    { value: EAction.DELETE, label: "Delete" },
  ];

  //
  function onChangeSwitch(value: boolean) {
    setValueSwitch(value);
    if (value) {
      const actions = Object.values(EAction).filter(
        (action) => action !== EAction.PUT
      );
      setValueAction(actions);
    } else {
      setValueAction(null);
    }
  }

  //
  function onChangeAction(value: Array<EAction>) {
    setValueAction(value);
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Switch onChange={onChangeSwitch} value={valueSwitch} id={resource} />
        <label htmlFor={resource} className="cursor-pointer">
          {resource}
        </label>
      </div>
      <div className="w-[300px]">
        <Select
          mode="multiple"
          tagRender={tagRender}
          value={valueAction}
          options={actionRoles}
          className="w-full"
          disabled={!valueSwitch}
          onChange={onChangeAction}
        />
      </div>
    </div>
  );
}
