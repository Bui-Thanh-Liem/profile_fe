"use client";
import { IRoleDataResource } from "@/interfaces/common.interface";
import { generatorColor } from "@/utils/generatorColorRole";
import { Select, SelectProps, Switch, Tag } from "antd";
import { Enums } from "liemdev-profile-lib";
import { useEffect, useState } from "react";

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

export function RoleItemResource({
  resource,
  value,
  onChangeResource,
}: {
  resource: Enums.EResources;
  value?: IRoleDataResource;
  onChangeResource: (resource: IRoleDataResource) => void;
}) {
  const [valueSwitch, setValueSwitch] = useState<boolean>(false);
  const [valueAction, setValueAction] = useState<Array<Enums.EActions> | null>(
    null
  );

  //
  useEffect(() => {
    setValueAction(value?.actions || []);
    setValueSwitch(value?.resource === resource);
  }, [resource, value]);

  //
  useEffect(() => {
    onChangeResource({
      resource: resource,
      actions: valueAction || [],
    });
  }, [onChangeResource, resource, valueAction]);

  //
  const optionRoles: SelectProps["options"] = [
    { value: Enums.EActions.VIEW, label: Enums.EActions.VIEW },
    { value: Enums.EActions.CREATE, label: Enums.EActions.CREATE },
    { value: Enums.EActions.UPDATE, label: Enums.EActions.UPDATE },
    { value: Enums.EActions.DELETE, label: Enums.EActions.DELETE },
    { value: Enums.EActions.MANAGE, label: Enums.EActions.MANAGE },
  ];

  //
  function onChangeSwitch(val: boolean) {
    setValueSwitch(val);
    if (val) {
      const actions = Object.values(Enums.EActions);
      setValueAction(actions);
    } else {
      setValueAction(null);
    }
  }

  //
  function onChangeAction(value: Array<Enums.EActions>) {
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
      <div className="w-[400px]">
        <Select
          mode="multiple"
          tagRender={tagRender}
          value={valueAction}
          options={optionRoles}
          className="w-full"
          disabled={!valueSwitch}
          onChange={onChangeAction}
        />
      </div>
    </div>
  );
}
