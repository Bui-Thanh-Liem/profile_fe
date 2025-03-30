import { AwardEducation } from "@/components/AwardEducation";
import { Col, Row } from "antd";

export default function EducationPage() {
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
          <div className="max-w-2xl mx-auto p-6">
            <div className="space-y-6">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="h-full w-0.5 bg-blue-300"></div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">08-2018</div>
                  <div className="font-bold text-gray-900">
                    Started studying at Ho Chi Minh City University of Industry
                    with a major in Electrical Technology
                  </div>
                  <p className="text-gray-600 mt-1">
                    Start your academic journey with an exciting foundation of
                    knowledge about your field of study. Join academic clubs and
                    connect with like-minded friends.
                  </p>
                </div>
              </div>

              {/*  */}
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="h-full w-0.5 bg-blue-300"></div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">03-2022</div>
                  <div className="font-bold text-gray-900">
                    Graduate internship
                  </div>
                  <p className="text-gray-600 mt-1">
                    It was fun to get 90% of the way there and realize that I
                    didn&apos;t really like the industry I was pursuing.
                  </p>
                </div>
              </div>

              {/*  */}
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="h-full w-0.5 bg-blue-300"></div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">07-2022</div>
                  <div className="font-bold text-gray-900">
                    Completed program at Ho Chi Minh City University of
                    Technology with GPA 3.4/4.0
                  </div>
                  <p className="text-gray-600 mt-1">
                    End of a challenging learning journey and valuable
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}
