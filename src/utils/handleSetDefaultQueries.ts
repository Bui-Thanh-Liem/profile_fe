import { InterfaceCommon } from "liemdev-profile-lib";

export function handleSetDefaultQueries<T>(
  searchParams: InterfaceCommon.IQueries<T>
): InterfaceCommon.IQueries<T> {
  const { limit, page, search } = searchParams;
  if (!limit) {
    searchParams.limit = "20";
  }

  if (!page) {
    searchParams.page = "1";
  }

  if (!search) {
    delete searchParams.search;
  }

  return searchParams;
}
