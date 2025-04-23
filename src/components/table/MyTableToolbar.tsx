"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { usePushUrl } from "@/hooks/usePushUrl";
import { IPropsMyTableToolbar } from "@/interfaces/propsComponent.interface";
import { Button, Card, Input, Select } from "antd";
import { useEffect, useState } from "react";
import ButtonPrimary from "../elements/ButtonPrimary";
import { PlusOutlined } from "@ant-design/icons";
const { Search } = Input;

export default function MyTableToolbar({
  checkedIds,
  onClickAddItem,
  onClickDeleteItems,
  totalItems,
}: IPropsMyTableToolbar) {
  const { pushUrl } = usePushUrl();
  const [searchValue, setSearchValue] = useState<string>();
  const searchValueDebounce = useDebounce(searchValue, 1200);

  //
  useEffect(() => {
    if (searchValueDebounce) {
      pushUrl({ search: searchValueDebounce });
    } else {
      pushUrl({});
    }
  }, [searchValueDebounce, pushUrl]);

  return (
    <Card className="mb-4">
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
          <Select
            showSearch
            placeholder="Select a status"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "success", label: "Success" },
              { value: "pending", label: "Pending" },
              { value: "waiting", label: "Waiting" },
              { value: "error", label: "Error" },
            ]}
            className="min-w-40"
          />

          <Select
            showSearch
            placeholder="Select a priority"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "3", label: "High" },
              { value: "2", label: "Medium" },
              { value: "1", label: "Low" },
            ]}
            className="min-w-40"
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
