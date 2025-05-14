import { Input } from "antd";
const { TextArea } = Input;

export function TextAreaItemTable({ str }: { str: string }) {
  if (!str) return <span>-</span>;
  return <TextArea rows={2} readOnly value={str} />;
}
