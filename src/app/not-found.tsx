import ButtonPrimary from "@/components/ButtonPrimary";
import { Result } from "antd";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="h-screen flex items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href={"/"}>
            <ButtonPrimary>Back Home</ButtonPrimary>
          </Link>
        }
        style={{ height: `calc(100vh - var(--hight-navbar))`, margin: "auto" }}
      />
    </div>
  );
}

export default NotFoundPage;
