"use client";
import { IRoleDataResource } from "@/interfaces/common.interface";
import { Select, SelectProps, Switch, Tag } from "antd";
import { Enums } from "liemdev-profile-lib";
import { useEffect, useState } from "react";

export const generatorColor: Record<string, string> = {
  [Enums.ERoleActions.VIEW]: "green",
  [Enums.ERoleActions.CREATE]: "blue",
  [Enums.ERoleActions.UPDATE]: "orange",
  [Enums.ERoleActions.DELETE]: "red",
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
  resource: Enums.ERoleResources;
  value?: IRoleDataResource;
  onChangeResource: (resource: IRoleDataResource) => void;
}) {
  const [valueSwitch, setValueSwitch] = useState<boolean>(false);
  const [valueAction, setValueAction] =
    useState<Array<Enums.ERoleActions> | null>(null);

  //
  useEffect(() => {
    if (value && value?.actions.length) {
      setValueAction(value.actions);
    }
    setValueSwitch(value?.resource === resource);
  }, []);

  //
  useEffect(() => {
    onChangeResource({
      resource: resource,
      actions: valueAction || [],
    });
  }, [onChangeResource, resource, valueAction]);

  //
  const actionRoles: SelectProps["options"] = [
    { value: Enums.ERoleActions.VIEW, label: Enums.ERoleActions.VIEW },
    { value: Enums.ERoleActions.CREATE, label: Enums.ERoleActions.CREATE },
    { value: Enums.ERoleActions.UPDATE, label: Enums.ERoleActions.UPDATE },
    { value: Enums.ERoleActions.DELETE, label: Enums.ERoleActions.DELETE },
  ];

  //
  function onChangeSwitch(val: boolean) {
    setValueSwitch(val);
    if (val) {
      const actions = Object.values(Enums.ERoleActions);
      setValueAction(actions);
    } else {
      setValueAction(null);
    }
  }

  //
  function onChangeAction(value: Array<Enums.ERoleActions>) {
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
