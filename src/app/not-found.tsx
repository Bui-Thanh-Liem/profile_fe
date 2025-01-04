import ButtonPrimary from "@/components/ButtonPrimary";
import { Result } from "antd";
import Link from "next/link";

function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link href={"/"}>
          <ButtonPrimary>Back Home</ButtonPrimary>
        </Link>
      }
    />
  );
}

export default NotFoundPage;
