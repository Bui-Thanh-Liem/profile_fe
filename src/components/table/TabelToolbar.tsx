import { PlusOutlined } from "@ant-design/icons";
import ButtonPrimary from "../ButtonPrimary";
import { Input, Select } from "antd";
const { Search } = Input;

export default function TableToolbar() {
  return (
    <div className="flex justify-between items-center">
      <ButtonPrimary>
        <PlusOutlined />
      </ButtonPrimary>
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
          onSearch={() => {}}
          style={{ width: 304 }}
        />
      </div>
    </div>
  );
}
