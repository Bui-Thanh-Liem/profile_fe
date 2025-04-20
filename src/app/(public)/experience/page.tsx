import { MyTimelineContainer } from "@/components/MyTimeline";
import { IPropMyTimeLine } from "@/interfaces/propsComponent.interface";
import { ContactMe } from "@/layouts/public/ContactMe";
import { Col, Row } from "antd";

function ExperiencePage() {
  const timelineData: IPropMyTimeLine[] = [
    {
      date: "05 - 2024",
      title: "Internship Internship at Sea Dragon Technology Company",
      description:
        "Gain hands-on experience in front-end development using Next.js and back-end development using Node.js and Nest.js, collaborate with senior developers on real projects. Develop responsive UI components and improve my problem solving skills in a professional environment.",
    },
    {
      date: "10 - 2022",
      title: "Become an official employee of the company",
      description:
        "Transitioned from intern to full-time front-end and back-end developer, taking on more responsibilities in project architecture and implementation. Contributed to key company initiatives while continuously expanding my technical expertise.",
    },
  ];

  return (
    <section className="flex h-screen">
      <Row className="m-auto w-[1200px]">
        <Col span={12} offset={6}>
          <MyTimelineContainer items={timelineData} datePosition="start" />
        </Col>
      </Row>
      <ContactMe />
    </section>
  );
}

export default ExperiencePage;
