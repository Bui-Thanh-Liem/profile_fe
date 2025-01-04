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
    <Result
      className="mt-24"
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<ButtonPrimary onClick={() => reset()}>Try again</ButtonPrimary>}
    />
  );
}
