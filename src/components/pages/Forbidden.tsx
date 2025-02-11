import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { Result } from "antd";
import Link from "next/link";

function ForbiddenPage() {
  return (
    <div className="h-screen flex items-center">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link href={"/"}>
            <ButtonPrimary>Back to Home</ButtonPrimary>
          </Link>
        }
        style={{ height: `calc(100vh - var(--height-navbar))`, margin: "auto" }}
      />
    </div>
  );
}

export default ForbiddenPage;
