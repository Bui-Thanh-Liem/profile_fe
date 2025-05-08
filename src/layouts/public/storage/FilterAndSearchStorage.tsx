"use client";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { CONSTANT_ROUTE } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import useFetch from "@/hooks/useFetch";
import { usePushUrl } from "@/hooks/usePushUrl";
import { IImageStorage, IKeyWord } from "@/interfaces/model.interface";
import { Breadcrumb, Input, Select } from "antd";
import { InterfaceCommon } from "liemdev-profile-lib";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const { Search } = Input;

export default function FilterAndSearchStorage() {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const searchValueDebounce = useDebounce(searchValue, 1400);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const pathnameSplit = pathname.split("/")?.filter(Boolean);
  const endItem = pathnameSplit[pathnameSplit.length - 1];
  const { data, loading } = useFetch<InterfaceCommon.IGetMulti<IKeyWord>>(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KEYWORD}/type/${endItem}`
  );
  const { pushUrl } = usePushUrl<Pick<IImageStorage, "keywords">>();

  //
  useEffect(() => {
    pushUrl({ search: searchValueDebounce || "" });
  }, [searchValueDebounce, pushUrl]);

  //
  const items = [
    { title: <Link href="/">HOME</Link> },
    ...pathnameSplit?.map((item, idx, arr) => {
      const isEnd = endItem === item;
      const path = pathnameSplit
        .slice(0, arr.findIndex((x) => x === item) + 1)
        .join("/");

      return {
        title: (
          <Link href={`/${path}`} className={`${isEnd && "font-bold"}`}>
            {item.toLocaleUpperCase()}
          </Link>
        ),
      };
    }),
  ];

  //
  function handleAll() {
    pushUrl({});
    setSearchValue(undefined);
    setKeyword(undefined);
  }

  //
  function handleChangeKeyword(value: string) {
    console.log("value select keyword::::", value);
    setKeyword(value);
    pushUrl({
      filters: {
        keywords: value,
      },
    });
  }

  //
  if (pathname.endsWith("/storage")) {
    return null;
  }

  return (
    <div className="h-20 w-[1200px] rounded-2xl bg-white shadow-sm shadow-primary fixed left-1/2 -translate-x-1/2 z-40">
      <div className="flex justify-between items-center h-full px-8">
        <Breadcrumb items={items} />
        <div className="flex items-center gap-4">
          <ButtonPrimary
            onClick={handleAll}
            disabled={!(Boolean(searchValue) || Boolean(keyword))}
          >
            All
          </ButtonPrimary>
          <Select
            loading={loading}
            showSearch
            placeholder="Select a keyword"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={data?.items?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            className="min-w-40"
            value={keyword}
            onChange={handleChangeKeyword}
          />

          <Search
            addonBefore="Name'"
            enterButton
            placeholder="Search text"
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 304 }}
          />
        </div>
      </div>
    </div>
  );
}
