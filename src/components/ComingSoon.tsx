import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { Result } from "antd";
import Link from "next/link";

function ComingSoonPage() {
  return (
    <div className="h-screen flex items-center bg-gray-second-app">
      <Result
        status="info"
        title="Coming Soon"
        subTitle="We're working hard to bring this page to life. Stay tuned for updates!"
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

export default ComingSoonPage;
