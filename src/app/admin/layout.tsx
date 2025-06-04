"use client";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { NotCompatibleLayout } from "@/layouts/NotCompatible";
import LayoutAdmin from "@/layouts/private/layout-admin/LayoutAdmin";
import { ReactNode, useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isMobileSmall, isMobileLarge, isDesktopSmall, isTablet } =
    useBreakpoints();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isMobileSmall || isMobileLarge || isTablet || isDesktopSmall)
    return <NotCompatibleLayout />;

  return <LayoutAdmin>{children}</LayoutAdmin>;
}
