import { findAll } from "@/apis/image-storage";
import { IImageStorage } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import ImageStorageLayout from "@/layouts/private/images-storage/ImageStorage";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function ImageStoragePage({
  searchParams,
}: IPropPage<IImageStorage>) {
  const resImgStorages = await findAll(handleSetDefaultQueries(searchParams));

  return (
    <ImageStorageLayout
      items={resImgStorages?.data?.items || []}
      totalItems={resImgStorages?.data?.totalItems || 0}
    />
  );
}
