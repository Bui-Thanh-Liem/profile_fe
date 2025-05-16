import { Empty } from "antd";
import empty from "../../public/empty.png";

export function MyEmpty() {
  return (
    <div className="min-h-96 w-full flex">
      <Empty
        image={empty.src}
        styles={{ image: { height: 120 } }}
        className="m-auto"
      />
    </div>
  );
}
