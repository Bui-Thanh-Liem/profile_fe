"use client";
import { deleteMulti } from "@/apis/image-storage";
import MyTable from "@/components/table/MyTable";
import { IImageStorage } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import ImageStorageAction from "./ImageStorageAction";
import { imageStorageActionColumns } from "./imageStorageColumn";

export default function ImageStorageLayout({
  items,
  totalItems,
}: IPropLayout<IImageStorage>) {
  return (
    <MyTable
      dataSource={items}
      totalDataSource={totalItems}
      columns={imageStorageActionColumns}
      actionDataSource={<ImageStorageAction />}
      deleteApi={deleteMulti}
    />
  );
}
