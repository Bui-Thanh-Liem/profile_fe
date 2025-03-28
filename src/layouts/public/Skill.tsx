"use client";
import { IPropCardSkill } from "@/interfaces/propsComponent.interface";
import { notification, Progress } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

//
import { MyEmpty } from "@/components/MyEmpty";
import { ISkill } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import antd from "../../../public/icons/skills/ant.png";
import react from "../../../public/icons/skills/computer.png";
import css from "../../../public/icons/skills/css-file-format.png";
import docker from "../../../public/icons/skills/docker.png";
import express from "../../../public/icons/skills/express.png";
import github from "../../../public/icons/skills/github.png";
import html from "../../../public/icons/skills/html.png";
import js from "../../../public/icons/skills/javascript.png";
import jwt from "../../../public/icons/skills/jwt.png";
import mongo from "../../../public/icons/skills/mongo.png";
import mui from "../../../public/icons/skills/mui.png";
import mysql from "../../../public/icons/skills/mysql-database.png";
import nestjs from "../../../public/icons/skills/nestjs.png";
import nextjs from "../../../public/icons/skills/nextjs.png";
import node from "../../../public/icons/skills/nodejs.png";
import redis from "../../../public/icons/skills/redis.png";
import redux from "../../../public/icons/skills/redux.png";
import tailwind from "../../../public/icons/skills/tailwind.png";
import ts from "../../../public/icons/skills/typescript.png";
import zustand from "../../../public/icons/skills/zustand.png";

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
      icon: <Image width={24} height={24} src={image} alt={name} />,
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
        src={image}
        alt={name}
        className="bg-transparent"
      />
      <p className="font-bold text-primary shadow-2xl">{name}</p>
    </div>
  );
}

export function SkillLayout({ items }: IPropLayout<ISkill>) {
  const skills = [
    { name: "Html", image: html.src, progress: 85 },
    { name: "Css", image: css.src, progress: 90 },
    { name: "Tailwind Css", image: tailwind.src, progress: 95 },
    { name: "Javascript", image: js.src, progress: 90 },
    { name: "React js", image: react.src, progress: 80 },
    { name: "Redux", image: redux.src, progress: 85 },
    { name: "Zustand", image: zustand.src, progress: 65 },
    { name: "Next js", image: nextjs.src, progress: 55 },
    { name: "Ant design", image: antd.src, progress: 75 },
    { name: "Material ui", image: mui.src, progress: 75 },
    { name: "Github", image: github.src, progress: 85 },
    { name: "Node js", image: node.src, progress: 95 },
    { name: "Express js", image: express.src, progress: 85 },
    { name: "Json web token", image: jwt.src, progress: 85 },
    { name: "Mongo DB", image: mongo.src, progress: 65 },
    { name: "Mysql", image: mysql.src, progress: 85 },
    { name: "Typescript", image: ts.src, progress: 65 },
    { name: "Nest js", image: nestjs.src, progress: 65 },
    { name: "Redis", image: redis.src, progress: 55 },
    { name: "Docker", image: docker.src, progress: 35 },
  ];
  return (
    <main className="flex h-screen pt-10">
      {items.length ? (
        <div className="m-auto w-[1200px] grid grid-cols-5 place-items-center gap-y-4">
          {items.map((skill) => (
            <SkillItem
              key={skill.name}
              image={skill.image}
              name={skill.name}
              progress={skill.progress}
            />
          ))}
        </div>
      ) : (
        <MyEmpty />
      )}
    </main>
  );
}
