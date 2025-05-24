"use client";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import LayoutAdmin from "@/layouts/private/layout-admin/LayoutAdmin";
import { NotCompatibleLayout } from "@/layouts/public/storage/NotCompatible";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isMobileSmall, isMobileLarge, isDesktopSmall, isTablet } =
    useBreakpoints();

  if (isMobileSmall || isMobileLarge || isTablet || isDesktopSmall)
    return <NotCompatibleLayout />;

  return <LayoutAdmin>{children}</LayoutAdmin>;
}
