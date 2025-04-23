import { find } from "@/apis/about.api";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import HighlighText from "@/components/elements/HighlighText";
import { ContactMe } from "@/layouts/public/ContactMe";
import { Col, Row } from "antd";
import { FileJpgOutlined } from "@ant-design/icons";
import Image from "next/image";
import { v4 } from "uuid";

async function AboutPage() {
  const resAbout = await find();
  const { text, address, email, phone, image } = resAbout.data;
  console.log("resAbout.data:::", resAbout.data);

  return (
    <section className="flex h-screen">
      <Row className="m-auto w-[1200px] justify-between">
        <Col span={12} className="flex-1 flex flex-col ">
          <h2 className="mb-4 text-lg font-bold text-foreground">Biography</h2>
          <>
            {text?.map((x) => (
              <p key={v4()} className="font-medium text-base mb-3">
                {x}
              </p>
            ))}
          </>
          <a
            href="mailto:buithanhliem5073@gmail.com"
            className="mt-6 mb-2 text-lg"
          >
            <HighlighText text="Email: " />
            {email}
          </a>
          <a href={`tel:${phone}`} className="mb-2 text-lg">
            <HighlighText text="Phone: " />
            {phone}
          </a>
          <p className="mb-2 text-lg">
            <HighlighText text="Place: " />
            {address}
          </p>
          <a href="/CV_BuiThanhLiem.pdf" target="_blank" download={true}>
            <ButtonPrimary
              size="large"
              icon={<FileJpgOutlined />}
              className="mt-2"
            >
              Resume
            </ButtonPrimary>
          </a>
        </Col>
        <Col className="border-2 rounded-tl-[80px] rounded-br-[80px] border-solid border-primary shadow-xl shadow-primary overflow-hidden">
          <Image
            width={433}
            height={577}
            src={image}
            alt="LiemDev"
            className="w-full h-auto rounded-2xl"
          />
        </Col>
        <ContactMe />
      </Row>
    </section>
  );
}

export default AboutPage;
