import { Spin } from "antd";

export default function LoadingPage() {
  return (
    <div className="min-h-[660px] flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
}
