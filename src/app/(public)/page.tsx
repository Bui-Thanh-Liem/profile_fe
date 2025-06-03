import ButtonPrimary from "@/components/elements/ButtonPrimary";
import HighlighText from "@/components/elements/HighlighText";
import EnterTextAnimated from "@/components/EnterTextAnimated";
import { ContactMe } from "@/layouts/public/ContactMe";
import { UserOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex h-screen">
      <Row className="m-auto w-[1200px] justify-between">
        <Col className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold text-foreground">Hi There,</h1>
          <h1 className="text-5xl font-bold text-foreground">
            My name&apos;s <HighlighText text="Bui Thanh Liem" />
          </h1>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            I&apos;m a{" "}
            <EnterTextAnimated
              texts={[
                "Software engineer___",
                "Front-end developer___",
                "Back-end developer___",
              ]}
            />
          </h1>

          <Link href="/about">
            <ButtonPrimary size="large" icon={<UserOutlined />}>
              About me
            </ButtonPrimary>
          </Link>
        </Col>
        <Col className="relative col-span-3 w-[420px] h-[420px]">
          <Image
            src="/meWebp.webp"
            alt="LiemDev"
            fill
            className="absolute rounded-tl-[80px] rounded-br-[80px]"
          />
        </Col>
      </Row>
      <ContactMe />
    </section>
  );
}
