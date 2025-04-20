"use client";
import { IQueries } from "@/interfaces/common.interface";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export function usePushUrl<T>() {
  const router = useRouter();
  const pathname = usePathname();

  const pushUrl = useCallback(
    (queryParams: IQueries<T>) => {
      const searchParams = new URLSearchParams();

      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
          const isObject = typeof value === "object" && value !== null;
          const encodedValue = isObject ? JSON.stringify(value) : String(value);
          searchParams.append(key, encodedValue);
        }
      });

      const newUrl = `${pathname}?${searchParams.toString()}`;
      console.log("newUrl:::", newUrl);
      router.push(newUrl);
    },
    [pathname, router]
  );

  return { pushUrl };
}
