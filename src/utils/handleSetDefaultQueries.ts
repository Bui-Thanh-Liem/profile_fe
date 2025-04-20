import { InterfaceCommon } from "liemdev-profile-lib";

export function handleSetDefaultQueries<T>(
  searchParams: InterfaceCommon.IQueries<T>
): InterfaceCommon.IQueries<T> {
  const { limit, page, search, sortBy, sortOrder } = searchParams;
  if (!limit) {
    searchParams.limit = "20";
  }

  if (!page) {
    searchParams.page = "1";
  }

  if (!search) {
    delete searchParams.search;
  }

  if (!sortBy) {
    searchParams.sortBy = "createdAt" as keyof T;
  }

  if (!sortOrder) {
    searchParams.sortOrder = "DESC";
  }

  return searchParams;
}
