import { IPropPage } from "@/interfaces/propsPage.interface";
import { ResetPassword } from "@/layouts/private/ui/ResetPassword";

export default function ResetPasswordPage({
  searchParams,
}: IPropPage<{ token: string }>) {
  return <ResetPassword token={searchParams?.token || ""} />;
}
