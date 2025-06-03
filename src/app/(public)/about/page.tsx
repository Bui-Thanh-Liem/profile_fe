import { find } from "@/apis/about.api";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import { ContactMe } from "@/layouts/public/ContactMe";
import { setPrefixFile } from "@/utils/setPrefixFile";
import {
  EnvironmentOutlined,
  FileJpgOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";
import { v4 } from "uuid";

async function AboutPage() {
  const resAbout = await find();
  const { text, address, email, phone, image } = resAbout.data;

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
            className="mt-6 mb-3 text-lg"
          >
            <MailOutlined className="mr-2" />
            {email}
          </a>
          <a href={`tel:${phone}`} className="mb-3 text-lg">
            <PhoneOutlined className="mr-2" />
            {phone}
          </a>
          <p className="mb-3 text-lg">
            <EnvironmentOutlined className="mr-2" />
            {address}
          </p>
          <a href="/CV_BuiThanhLiem.pdf" target="_blank" download={true}>
            <ButtonPrimary
              size="large"
              icon={<FileJpgOutlined />}
              className="mt-4"
            >
              Resume
            </ButtonPrimary>
          </a>
        </Col>
        <Col className="border-2 rounded-tl-[80px] rounded-br-[80px] border-solid border-primary overflow-hidden">
          <Image
            width={343}
            height={487}
            src={setPrefixFile(image)}
            alt="LiemDev"
            className="w-full"
            unoptimized
          />
        </Col>
        <ContactMe />
      </Row>
    </section>
  );
}

export default AboutPage;
