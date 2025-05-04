"use client";
import { usePushUrl } from "@/hooks/usePushUrl";
import { IImageStorage } from "@/interfaces/model.interface";
import { Pagination } from "antd";

export default function MyPagination({
  open = true,
  total,
}: {
  open?: boolean;
  total: number;
}) {
  const { pushUrl } = usePushUrl<Pick<IImageStorage, "keywords">>();

  if (!open) return null;

  //
  const onChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    pushUrl({ page: String(page), limit: String(pageSize) });
  };

  return (
    <div className="flex justify-center mt-8">
      <Pagination
        showSizeChanger
        onChange={onChange}
        defaultCurrent={1}
        defaultPageSize={20}
        total={total}
      />
    </div>
  );
}
