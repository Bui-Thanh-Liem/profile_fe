import { useRouter } from "next/router";

export default function LogoutPage() {
  const router = useRouter();
  fetch("/auth/logout", { method: "POST" }).then(() => {
    router.push("/auth/login");
  });

  return <p>Đang đăng xuất...</p>;
}
