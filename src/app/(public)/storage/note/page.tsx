import { findAll } from "@/apis/note";
import { INote } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import NoteLayout from "@/layouts/public/storage/personal-customer/benefit/notes/NoteLayout";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function NotePage({ searchParams }: IPropPage<INote>) {
  //
  const queryDefault = handleSetDefaultQueries(searchParams);

  //
  // const toDay = new Date();
  // const firstDayOfMonth = new Date(toDay.getFullYear(), toDay.getMonth(), 1);
  // const lastDayOfMonth = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);
  // queryDefault.fromDate = `${formatDateToSQL(firstDayOfMonth)}`;
  // queryDefault.toDate = `${formatDateToSQL(lastDayOfMonth)}`;

  //
  const res = await findAll(queryDefault);
  const { items, totalItems } = res.data;

  return <NoteLayout items={items} totalItems={totalItems} />;
}
