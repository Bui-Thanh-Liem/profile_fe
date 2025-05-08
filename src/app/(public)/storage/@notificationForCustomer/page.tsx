import { NotificationForCustomerLayout } from "@/layouts/public/storage/NotificationForCustomer";
import { Suspense } from "react";

export default function notificationForCustomerPage() {
  return (
    <Suspense>
      <NotificationForCustomerLayout />
    </Suspense>
  );
}
