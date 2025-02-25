import { useRouter } from "next/router";

export default function LogoutPage() {
  const router = useRouter();
  fetch("/auth/logout", { method: "POST" }).then(() => {
    router.push("/auth/login");
  });

  return (
    <div className="h-screen flex items-center">
      <p>Signing out...</p>
    </div>
  );
}
