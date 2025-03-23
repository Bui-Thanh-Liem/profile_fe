"use client";
import { logout } from "@/apis/auth.api";
import { clearCookieBrowser } from "@/app/actions/clear-cookie";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { Constants } from "liemdev-profile-lib";
import { useRouter } from "next/navigation";

export function LogoutLayout() {
  const router = useRouter();

  async function handleLogout() {
    await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_USER);
    await logout();
    router.replace("login");
  }

  return (
    <main className="flex h-screen">
      <div className="m-auto">
        Logout
        <ButtonPrimary onClick={handleLogout}>Logout</ButtonPrimary>
      </div>
    </main>
  );
}
