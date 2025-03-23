import { InterfaceCommon } from "liemdev-profile-lib";

export interface IPropPage<T> {
  params: Record<string, string>;
  searchParams: InterfaceCommon.IQueries<T>;
}
