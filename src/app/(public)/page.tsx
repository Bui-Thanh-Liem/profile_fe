import ButtonPrimary from "@/components/elements/ButtonPrimary";
import HighlighText from "@/components/elements/HighlighText";
import EnterTextAnimated from "@/components/EnterTextAnimated";
import { ContactMe } from "@/layouts/public/ContactMe";
import { UserOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  //
  const classesImage =
    "relative col-span-3 w-[400px] h-[400px] p-6 rounded-tl-[80px] rounded-br-[80px] border-2 border-solid border-primary shadow-md shadow-primary";

  //
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
        <Col className={classesImage}>
          <Image
            src="/meWebp.webp"
            alt="LiemDev"
            fill
            className={`${classesImage} absolute`}
          />
        </Col>
      </Row>
      <ContactMe />
    </section>
  );
}
