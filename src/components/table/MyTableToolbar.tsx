"use client";
import { CONSTANT_ROUTE } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import useFetch from "@/hooks/useFetch";
import { usePushUrl } from "@/hooks/usePushUrl";
import { IKeyWord } from "@/interfaces/model.interface";
import { IPropsMyTableToolbar } from "@/interfaces/propsComponent.interface";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select, Tag } from "antd";
import { Enums, InterfaceCommon } from "liemdev-profile-lib";
import { useEffect, useState } from "react";
import ButtonPrimary from "../elements/ButtonPrimary";
const { Search } = Input;

export default function MyTableToolbar({
  checkedIds,
  onClickAddItem,
  onClickDeleteItems,
  totalItems,
}: IPropsMyTableToolbar) {
  const { pushUrl } = usePushUrl();
  const typeOptions = Object.values(Enums.ETypeKnowledge) || [];

  //
  const [type, setType] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>();
  const searchValueDebounce = useDebounce(searchValue, 1200);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  //
  const { data, loading } = useFetch<InterfaceCommon.IGetMulti<IKeyWord>>(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KEYWORD}`
  );

  //
  useEffect(() => {
    pushUrl({ search: searchValueDebounce });
  }, [searchValueDebounce, pushUrl]);

  //
  function handleChangeKeyword(value: string) {
    console.log("value select keyword::::", value);
    setKeyword(value);
    pushUrl({
      filters: {
        keywords: value,
      },
    });
  }

  //
  function handleChangeType(value: string) {
    console.log("value select type::::", value);
    setType(value);
    pushUrl({
      filters: {
        type: value,
      },
    });
  }

  //
  function handleAll() {
    pushUrl();
    setSearchValue(undefined);
    setKeyword(undefined);
    setType(undefined);
  }

  return (
    <Card className="mb-4 rounded-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <ButtonPrimary onClick={onClickAddItem}>
            <PlusOutlined />
          </ButtonPrimary>
          <Button variant="text" color="primary">
            {totalItems} items
          </Button>
          {checkedIds.length > 0 && (
            <Button
              color="danger"
              variant="filled"
              danger
              onClick={() => onClickDeleteItems(checkedIds)}
            >
              {`Delete checked (${
                checkedIds.length && checkedIds.length
              } items)`}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ButtonPrimary
            onClick={handleAll}
            disabled={
              !(Boolean(searchValue) || Boolean(keyword) || Boolean(type))
            }
          >
            All
          </ButtonPrimary>

          <Select
            showSearch
            placeholder="Select a type"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={typeOptions.map((t) => ({
              label: t,
              value: t,
            }))}
            className="min-w-40"
            value={type}
            onChange={handleChangeType}
          />

          <Select
            loading={loading}
            showSearch
            placeholder="Select a keyword"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={data?.items?.map((item) => ({
              label: <Tag color={item.color}>{item.name}</Tag>,
              value: item.id,
            }))}
            className="min-w-40"
            value={keyword}
            onChange={handleChangeKeyword}
          />

          <Search
            addonBefore="Name'"
            enterButton
            placeholder="input search text"
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 304 }}
          />
        </div>
      </div>
    </Card>
  );
}
