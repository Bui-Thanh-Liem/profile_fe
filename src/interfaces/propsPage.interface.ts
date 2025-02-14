import { IQueries } from "./query.interface";

export interface IPropPage {
  params: Record<string, string>,
  searchParams: IQueries
}