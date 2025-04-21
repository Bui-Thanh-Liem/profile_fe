import { findAll } from "@/apis/image-storage";
import PaginationStorage from "@/components/MyPagination";
import { IImageStorage } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import ImageStorageLayout from "@/layouts/public/storage/ImageStorageLayout";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function ImageStoragePage({
  searchParams,
}: IPropPage<IImageStorage>) {
  const queryDefault = handleSetDefaultQueries(searchParams);
  const res = await findAll(queryDefault);
  const { items, totalItems } = res.data;

  return (
    <main className="flex">
      <div className="m-auto w-[1200px]">
        <ImageStorageLayout items={items} totalItems={totalItems} />
      </div>
    </main>
  );
}
