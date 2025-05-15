import { IPropPage } from "@/interfaces/propsPage.interface";
import { Otp } from "@/layouts/private/ui/otp";

export default function OtpPage({
  searchParams,
}: IPropPage<{ token: string }>) {
  return <Otp token={searchParams?.token || ""} />;
}
