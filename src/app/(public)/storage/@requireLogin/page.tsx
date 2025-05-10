import { RequireLogin } from "@/layouts/public/storage/general/RequireLogin";
import { Suspense } from "react";

export default function RequireLoginPage() {
  return (
    <Suspense>
      <RequireLogin />
    </Suspense>
  );
}
