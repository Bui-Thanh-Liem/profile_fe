"use client";
import { IQueries } from "@/interfaces/common.interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function usePushUrl<T>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Lấy query parameters hiện tại

  const pushUrl = useCallback(
    (queryParams: IQueries<T> = {}) => {
      console.log("queryParams:::", queryParams);

      // Nếu queryParams rỗng, push về pathname mà không có query
      // if (Object.keys(queryParams).length === 0) {
      //   console.log("queryParams::: khong co");

      //   const newUrl = pathname;
      //   console.log("newUrl:::", newUrl);
      //   router.push(newUrl);
      //   return;
      // }

      // Tạo một bản sao của searchParams hiện tại
      const currentParams = new URLSearchParams(searchParams.toString());

      // Thêm hoặc cập nhật các query parameters mới
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          const isObject = typeof value === "object" && value !== null;
          const encodedValue = isObject ? JSON.stringify(value) : String(value);
          currentParams.set(key, encodedValue); // Sử dụng set để cập nhật hoặc thêm
        } else {
          currentParams.delete(key); // Xóa key nếu value là undefined hoặc chuỗi rỗng
        }
      });

      // Tạo URL mới với các query parameters đã hợp nhất
      const newUrl = `${pathname}?${currentParams.toString()}`;
      console.log("newUrl:::", newUrl);
      router.push(newUrl);
    },
    [pathname, router, searchParams] // Thêm searchParams vào dependency array
  );

  return { pushUrl };
}
