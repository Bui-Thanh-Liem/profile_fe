import { InterfaceCommon } from "liemdev-profile-lib";

export interface IPropPage {
  params: Record<string, string>;
  searchParams: InterfaceCommon.IQueries;
}
