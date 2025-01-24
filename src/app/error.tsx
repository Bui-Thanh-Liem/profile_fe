"use client";
import ButtonPrimary from "@/components/ButtonPrimary";
import { Result } from "antd";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center h-screen">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<ButtonPrimary onClick={() => reset()}>Try again</ButtonPrimary>}
        style={{ height: `calc(100vh - var(--hight-navbar))`, margin: "auto" }}
      />
    </div>
  );
}
