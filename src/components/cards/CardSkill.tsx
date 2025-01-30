"use client";
import { IPropCardSkill } from "@/interfaces/propsComponent.interface";
import { notification } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CardSkill({ name, icon, link }: IPropCardSkill) {
  const router = useRouter();

  const openNotification = () => {
    if (link) {
      router.push(link);
      return;
    }

    notification.open({
      message: name,
      description: "Please visit the project page for more details.",
      icon: <Image width={24} height={24} src={icon} alt={name} />,
      onClick: () => {
        router.push("/projects");
      },
    });
  };

  return (
    <div
      className={`h-32 w-56 border-4 bg-gradient-to-tr from-primary rounded-tl-3xl rounded-br-3xl flex justify-center items-center flex-col gap-2 cursor-pointer hover:scale-110 transition-all duration-200`}
      onClick={openNotification}
    >
      <Image width={50} height={50} src={icon} alt={name} />
      <p className="font-bold text-background shadow-2xl">{name}</p>
    </div>
  );
}
