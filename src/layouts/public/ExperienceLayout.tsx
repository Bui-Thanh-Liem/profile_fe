"use client";

import { ReactNode } from "react";
import { Col, Row, Typography } from "antd";
const { Paragraph, Text } = Typography;
import { SwapRightOutlined } from "@ant-design/icons";

interface IExperienceItem {
  date: [string, string];
  title: string;
  description: ReactNode;
}

//
function ExperienceItem({
  date: [start, end],
  title,
  description,
}: IExperienceItem) {
  return (
    <div className="flex">
      <div className="min-w-48 text-base">
        {start}
        <SwapRightOutlined className="mx-2" />
        {end}
      </div>
      <div className="flex flex-col items-center mr-4">
        <div className="bg-primary rounded-tl-2xl rounded-br-2xl py-2 px-2">
          <p className="font-bold text-white">Exp</p>
        </div>
        <div className="h-full w-0.5 bg-primary"></div>
      </div>
      <div className="pb-8">
        <p className="font-bold text-gray-700 text-2xl">{title}</p>
        {description}
      </div>
    </div>
  );
}

export function ExperienceLayout() {
  //
  const timelineData: IExperienceItem[] = [
    {
      date: ["05/2024", "Now..."],
      title: "Official employee at Sea Dragon Technology Company",
      description: (
        <Paragraph className="text-base mt-2">
          Transitioned from intern to full-time <Text code>fullstack</Text>
          developer, taking on more responsibilities in project architecture and
          implementation. Contributed to key company initiatives while
          continuously expanding my technical expertise.
        </Paragraph>
      ),
    },
    {
      date: ["03/2024", "05/2024"],
      title: "Internship   at Sea Dragon Technology Company",
      description: (
        <Paragraph className="text-base mt-2">
          Gain hands-on experience in projects, <Text code>front-end</Text>{" "}
          development using <Text code>Next.js</Text> and{" "}
          <Text code>back-end</Text> development using <Text code>Node.js</Text>{" "}
          and <Text code>Nest.js</Text> , database manipulation using{" "}
          <Text code>mysql</Text> , <Text code>mongoDb</Text> collaborate with
          senior developers on real projects. Improve my problem solving skills
          in a professional environment.
        </Paragraph>
      ),
    },
  ];

  return (
    <Row className="m-auto w-[1200px]">
      <Col span={24}>
        <div className="space-y-6">
          {timelineData.map((item, index) => (
            <ExperienceItem
              key={index}
              date={item.date}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Col>
    </Row>
  );
}
