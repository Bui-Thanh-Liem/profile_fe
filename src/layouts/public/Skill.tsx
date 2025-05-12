"use client";
import { IPropCardSkill } from "@/interfaces/propsComponent.interface";
import { Col, notification, Progress, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

//
import { MyEmpty } from "@/components/MyEmpty";
import { ISkill } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { setPrefixFile } from "@/utils/setPrefixFile";

function SkillItem({ name, image, progress, link }: IPropCardSkill) {
  const router = useRouter();

  const openNotification = () => {
    if (link) {
      router.push(link);
      return;
    }

    notification.open({
      message: name,
      description: "Please visit the project page for more details.",
      icon: (
        <Image
          width={24}
          height={24}
          src={setPrefixFile(image)}
          alt={name}
          unoptimized
        />
      ),
      onClick: () => {
        router.push("/projects");
      },
    });
  };

  // bg-gradient-to-tr from-primary
  return (
    <div
      className={`h-32 w-56 border-4 border-primary bg-white rounded-tl-3xl rounded-br-3xl flex justify-center items-center flex-col gap-2 cursor-pointer hover:scale-110 transition-all duration-200 relative`}
      onClick={openNotification}
    >
      <Progress
        className="absolute top-2 right-2"
        size={30}
        type="circle"
        percent={progress}
      />
      <Image
        width={50}
        height={50}
        src={setPrefixFile(image)}
        alt={name}
        className="bg-transparent"
        unoptimized
      />
      <p className="font-bold text-primary shadow-2xl">{name}</p>
    </div>
  );
}

export function SkillLayout({ items }: IPropLayout<ISkill>) {
  return (
    <section className="flex h-screen">
      {items.length ? (
        <Row className="m-auto w-[1200px] gap-4">
          {items.map((skill) => (
            <Col key={skill.name}>
              <SkillItem
                image={skill.image}
                name={skill.name}
                progress={skill.progress}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <MyEmpty />
      )}
    </section>
  );
}
