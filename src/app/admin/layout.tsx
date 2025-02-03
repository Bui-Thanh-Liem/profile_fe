import LayoutAdmin from "@/layouts/private/layout-admin/LayoutAdmin";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <LayoutAdmin>{children}</LayoutAdmin>;
}
