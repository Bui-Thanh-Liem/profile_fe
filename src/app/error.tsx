"use client";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { Result } from "antd";
import Link from "next/link";
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
        extra={
          <div className="flex gap-x-4 items-center">
            <Link href={"/"}>
              <ButtonPrimary>Back to Home</ButtonPrimary>
            </Link>
            <ButtonPrimary onClick={() => reset()}>Try again</ButtonPrimary>
          </div>
        }
        style={{ height: `calc(100vh - var(--hight-navbar))`, margin: "auto" }}
      />
    </div>
  );
}
