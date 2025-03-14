"use client";
import { IPropCardSkill } from "@/interfaces/propsComponent.interface";
import { notification, Progress } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CardSkill({
  name,
  image,
  progress,
  link,
}: IPropCardSkill) {
  const router = useRouter();

  const openNotification = () => {
    if (link) {
      router.push(link);
      return;
    }

    notification.open({
      message: name,
      description: "Please visit the project page for more details.",
      icon: <Image width={24} height={24} src={image} alt={name} />,
      onClick: () => {
        router.push("/projects");
      },
    });
  };

  return (
      <div
        className={`h-32 w-56 border-4 bg-gradient-to-tr from-primary rounded-tl-3xl rounded-br-3xl flex justify-center items-center flex-col gap-2 cursor-pointer hover:scale-110 transition-all duration-200 relative`}
        onClick={openNotification}
      >
        <Progress
          className="absolute top-2 right-2"
          size={30}
          type="circle"
          percent={progress}
        />
        <Image width={50} height={50} src={image} alt={name} />
        <p className="font-bold text-background shadow-2xl">{name}</p>
      </div>
  );
}
