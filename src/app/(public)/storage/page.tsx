import { StorageLayout } from "@/layouts/public/storage/StorageLayout";

export default async function StoragePage() {
  return (
    <main className="flex">
      <div className="m-auto w-[1200px]">
        <StorageLayout />
      </div>
    </main>
  );
}
