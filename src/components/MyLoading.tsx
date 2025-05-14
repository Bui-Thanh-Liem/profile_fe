import { Empty } from "antd";
import empty from "../../public/empty.png";

export function MyLoading() {
  return (
    <div className="h-full w-full flex">
      loading...
      <Empty
        image={empty.src}
        styles={{ image: { height: 120 } }}
        className="m-auto"
      />
    </div>
  );
}
