"use client";

import { AwardEducation } from "@/components/AwardEducation";
import { Col, Row, Tag } from "antd";
import { ReactNode } from "react";

interface IEducationItem {
  date: string;
  title: string;
  description: ReactNode;
}

function EducationItem({ date, title, description }: IEducationItem) {
  return (
    <Row>
      <Col span={4}>
        <div className="flex flex-col items-center mr-4">
          <div className="bg-primary rounded-tl-2xl rounded-br-2xl py-2 px-2">
            <p className="font-bold text-white">Edu</p>
          </div>
          <div className="h-full min-h-20 w-0.5 bg-primary"></div>
        </div>
      </Col>
      <Col span={20}>
        <Tag color="gold" className="text-base">
          {date}
        </Tag>
        <div className="pb-8">
          <p className="font-bold text-gray-700 text-lg">{title}</p>
          {description}
        </div>
      </Col>
    </Row>
  );
}

export function EducationLayout() {
  //
  const timelineData: IEducationItem[] = [
    {
      date: "08 - 2024",
      title: "Graduated with honors with an average score of 3.5/4.0",
      description:
        "Taking the first step toward building a rewarding career driven by passion and dedication.",
    },
    {
      date: "08 - 2022",
      title:
        "Started studying at Ho Chi Minh City College of Information Technology with a major in Information Technology",
      description: "start pursuing the career you love",
    },
    {
      date: "07 - 2022",
      title:
        "Completed program at Ho Chi Minh City University of Technology with GPA 3.4/4.0",
      description:
        "End of a challenging learning journey and valuable experience.",
    },
    {
      date: "03 - 2022",
      title: "Graduate internship",
      description:
        "It was fun to get 90% of the way there and realize that I didn't really like the industry I was pursuing.",
    },
    {
      date: "08 - 2018",
      title:
        "Started studying at Ho Chi Minh City University of Industry with a major in Electrical Technology",
      description:
        "Start your academic journey with an exciting foundation of knowledge about your field of study. Join academic clubs and connect with like-minded friends.",
    },
  ];

  return (
    <Row className="w-[1200px] m-auto justify-between">
      <Col span={12} className="pt-40">
        <h1 className="text-8xl">Education</h1>
        <div className="w-full h-1 bg-black mt-3 mb-8" />
        <p className="mb-14 text-base">
          During my studies in Information Technology, I have experienced many
          interesting challenges from basic programming exercises to complex
          projects. Each subject has provided me with new knowledge and skills,
          helping me build a solid foundation in this field. I am especially
          interested in web development subjects, where I can combine creativity
          with technology to create useful products.
        </p>
        <AwardEducation />
      </Col>
      <Col span={10} className="pt-20">
        {timelineData?.map((item) => (
          <EducationItem
            key={item.date}
            date={item.date}
            description={item.description}
            title={item.title}
          />
        ))}
      </Col>
    </Row>
  );
}
