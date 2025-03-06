"use client";
import { IQueries } from "@/interfaces/common.interface";
import { useRouter, usePathname } from "next/navigation";

export function usePushUrl() {
  const router = useRouter();
  const pathname = usePathname();

  function pushUrl(queryParams: IQueries) {
    const searchParams = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    const newUrl = `${pathname}?${searchParams.toString()}`;
    router.push(newUrl);
  }

  return pushUrl;
}
