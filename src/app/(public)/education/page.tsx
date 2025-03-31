import { AwardEducation } from "@/components/AwardEducation";
import { MyTimelineContainer } from "@/components/MyTimeline";
import { IPropMyTimeLine } from "@/interfaces/propsComponent.interface";
import { Col, Row } from "antd";

export default function EducationPage() {
  //
  const timelineData: IPropMyTimeLine[] = [
    {
      date: "08 - 2018",
      title:
        "Started studying at Ho Chi Minh City University of Industry with a major in Electrical Technology",
      description:
        "Start your academic journey with an exciting foundation of knowledge about your field of study. Join academic clubs and connect with like-minded friends.",
    },
    {
      date: "03 - 2022",
      title: "Graduate internship",
      description:
        "It was fun to get 90% of the way there and realize that I didn't really like the industry I was pursuing.",
    },
    {
      date: "07 - 2022",
      title:
        "Completed program at Ho Chi Minh City University of Technology with GPA 3.4/4.0",
      description:
        "End of a challenging learning journey and valuable experience.",
    },
    {
      date: "08 - 2022",
      title:
        "Started studying at Ho Chi Minh City College of Information Technology with a major in Information Technology",
      description: "start pursuing the career you love",
    },
    {
      date: "08 - 2024",
      title: "Graduated with honors with an average score of 3.5/4.0",
      description:
        "Taking the first step toward building a rewarding career driven by passion and dedication.",
    },
  ];

  //
  return (
    <section className="flex h-screen">
      <Row className="w-[1200px] m-auto justify-between">
        <Col span={12}>
          <h1 className="text-8xl">Education</h1>
          <div className="w-full h-1 bg-black mt-3 mb-8" />
          <p className="mb-14 text-base">
            During my studies in Information Technology, I have experienced many
            interesting challenges from basic programming exercises to complex
            projects. Each subject has provided me with new knowledge and
            skills, helping me build a solid foundation in this field. I am
            especially interested in web development subjects, where I can
            combine creativity with technology to create useful products.
          </p>
          <AwardEducation />
        </Col>
        <Col span={10}>
          <MyTimelineContainer items={timelineData} datePosition="end" />
        </Col>
      </Row>
    </section>
  );
}
