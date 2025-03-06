import { useDebounce } from "@/hooks/useDebounce";
import { usePushUrl } from "@/hooks/usePushUrl";
import { IPropsMyTableToolbar } from "@/interfaces/propsComponent.interface";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import ButtonPrimary from "../elements/ButtonPrimary";
const { Search } = Input;

export default function MyTableToolbar({
  checkedIds,
  onClickAddItem,
  onClickDeleteItems,
}: IPropsMyTableToolbar) {
  const pushUrl = usePushUrl();
  const [searchValue, setSearchValue] = useState<string>();
  const searchValueDebounce = useDebounce(searchValue, 1200);

  //
  useEffect(() => {
    pushUrl({ search: searchValueDebounce });
  }, [searchValueDebounce, pushUrl]);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <ButtonPrimary onClick={onClickAddItem}>
          <PlusOutlined />
        </ButtonPrimary>
        {checkedIds.length > 0 && (
          <Button type="primary" danger onClick={onClickDeleteItems}>
            Delete checked
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
  );
}
