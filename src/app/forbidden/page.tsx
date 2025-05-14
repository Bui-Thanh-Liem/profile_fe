"use client";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { Result } from "antd";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <ButtonPrimary onClick={() => router.back()}>Back</ButtonPrimary>
        }
        style={{ height: `calc(100vh - var(--hight-navbar))`, margin: "auto" }}
      />
    </div>
  );
}
