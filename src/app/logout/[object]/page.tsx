import { LogoutLayout } from "@/layouts/private/ui/Logout";

export default function LogoutPage({
  params,
}: {
  params: { object: "user" | "customer" };
}) {
  return <LogoutLayout type={params.object} />;
}
