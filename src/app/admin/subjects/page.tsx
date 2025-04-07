import { findAll } from "@/apis/subject.api";
import { IImageStorage } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import ImageStorageLayout from "@/layouts/private/images-storage/ImageStorage";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function SubjectAdminPage({
  searchParams,
}: IPropPage<IImageStorage>) {
  const { limit, page } = handleSetDefaultQueries(searchParams);
  const resImgStorages = await findAll({ limit, page });

  return (
    <ImageStorageLayout
      items={resImgStorages?.data?.items || []}
      totalItems={resImgStorages?.data?.totalItems || 0}
    />
  );
}
