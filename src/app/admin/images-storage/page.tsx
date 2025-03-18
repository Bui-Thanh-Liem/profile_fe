import { findAll } from "@/apis/image-storage";
import { IPropPage } from "@/interfaces/propsPage.interface";
import ImageStorageLayout from "@/layouts/private/images-storage/ImageStorage";

export default async function ImageStoragePage({ searchParams }: IPropPage) {
  const { limit, page, search } = searchParams;
  const resImgStorages = await findAll({ limit, page, search });
  return (
    <ImageStorageLayout
      items={resImgStorages?.data?.items || []}
      totalItems={resImgStorages?.data?.totalItems || 0}
    />
  );
}
