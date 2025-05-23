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
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ButtonPrimary from "../elements/ButtonPrimary";
const { Search } = Input;

function filterItem(pathname: string): {
  isBlock: boolean;
  isSubAdmin: boolean;
  isType: boolean;
  isKeyword: boolean;
  isOther?: boolean;
} {
  const _pathname = pathname.split("/").pop();

  // Initialize result with all flags false
  const result = {
    isBlock: false,
    isSubAdmin: false,
    isType: false,
    isKeyword: false,
    isOther: true,
  };

  // Define page configurations
  const pageConfigs = [
    { page: "customers", item: ["isBlock"] },
    { page: "users", item: ["isBlock", "isSubAdmin"] },
    { page: "knowledge", item: ["isType", "isKeyword"] },
  ];

  // Find matching page configuration
  const matchedConfig = pageConfigs.find((config) => config.page === _pathname);
  console.log("matchedConfig:::", matchedConfig);

  // If no page matches, return with other: true
  if (!matchedConfig) {
    return result;
  }

  // Set flags to true for matched items
  result.isOther = false;
  matchedConfig.item.forEach((item) => {
    if (item in result) {
      result[item as keyof typeof result] = true;
    }
  });

  return result;
}

export default function MyTableToolbar({
  checkedIds,
  onClickAddItem,
  onClickDeleteItems,
  totalItems,
}: IPropsMyTableToolbar) {
  const pathname = usePathname();
  const { pushUrl } = usePushUrl();
  const typeOptions = Object.values(Enums.ETypeKnowledge) || [];
  const { isOther, isBlock, isKeyword, isSubAdmin, isType } =
    filterItem(pathname);

  console.log({ isOther, isBlock, isKeyword, isSubAdmin, isType });

  //
  const [type, setType] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>();
  const searchValueDebounce = useDebounce(searchValue, 1200);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  //
  const [isBlockVal, setIsBlockVal] = useState<boolean | undefined>(undefined);
  const [isSubAdminVal, setIsSubAdminVal] = useState<boolean | undefined>(
    undefined
  );

  //
  const { data, loading } = useFetch<InterfaceCommon.IGetMulti<IKeyWord>>(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KEYWORD}`
  );

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
  function handleChangeSubAdmin(value: boolean) {
    console.log("value select sub admin::::", value);
    setIsSubAdminVal(value);
    pushUrl({
      filters: {
        isSubAdmin: value,
      },
    });
  }

  //
  function handleChangeBlock(value: boolean) {
    console.log("value select block::::", value);
    setIsBlockVal(value);
    pushUrl({
      filters: {
        block: value,
      },
    });
  }

  const onSearch = useCallback(
    (val: string | undefined) => {
      pushUrl({ search: val });
    },
    [pushUrl]
  );

  //
  function handleAll() {
    pushUrl();
    setSearchValue(undefined);
    setKeyword(undefined);
    setType(undefined);
    setIsBlockVal(undefined);
    setIsSubAdminVal(undefined);
  }

  //
  useEffect(() => {
    onSearch(searchValueDebounce);
  }, [searchValueDebounce, onSearch]);

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
              !(
                Boolean(searchValue) ||
                Boolean(keyword) ||
                Boolean(type) ||
                Boolean(isBlockVal) ||
                Boolean(isSubAdminVal)
              )
            }
          >
            All
          </ButtonPrimary>

          {!isOther && (
            <>
              {isType && (
                <Select
                  showSearch
                  placeholder="Select a type"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={typeOptions.map((t) => ({
                    label: t,
                    value: t,
                  }))}
                  className="min-w-40"
                  value={type}
                  onChange={handleChangeType}
                />
              )}

              {isKeyword && (
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
              )}

              {isSubAdmin && (
                <Select
                  showSearch
                  placeholder="Select a subAdmin"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      label: <Tag color="green">YES</Tag>,
                      value: true,
                    },
                    {
                      label: <Tag color="red">NO</Tag>,
                      value: false,
                    },
                  ]}
                  className="min-w-40"
                  value={isSubAdminVal}
                  onChange={handleChangeSubAdmin}
                />
              )}

              {isBlock && (
                <Select
                  loading={loading}
                  showSearch
                  placeholder="Select a status"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      label: <Tag color="green">ACTIVE</Tag>,
                      value: false,
                    },
                    {
                      label: <Tag color="red">BLOCK</Tag>,
                      value: true,
                    },
                  ]}
                  className="min-w-40"
                  value={isBlockVal}
                  onChange={handleChangeBlock}
                />
              )}
            </>
          )}

          <Search
            addonBefore="Name'"
            enterButton
            placeholder="input search text"
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={onSearch}
            style={{ width: 304 }}
          />
        </div>
      </div>
    </Card>
  );
}
