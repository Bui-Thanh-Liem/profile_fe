import { v4 as uuidV4 } from "uuid";

//
import CardSkill from "@/components/cards/CardSkill";
import antd from "../../../../public/icons/skills/ant.png";
import react from "../../../../public/icons/skills/computer.png";
import css from "../../../../public/icons/skills/css-file-format.png";
import docker from "../../../../public/icons/skills/docker.png";
import express from "../../../../public/icons/skills/express.png";
import github from "../../../../public/icons/skills/github.png";
import html from "../../../../public/icons/skills/html.png";
import js from "../../../../public/icons/skills/javascript.png";
import jwt from "../../../../public/icons/skills/jwt.png";
import mongo from "../../../../public/icons/skills/mongo.png";
import mui from "../../../../public/icons/skills/mui.png";
import mysql from "../../../../public/icons/skills/mysql-database.png";
import nestjs from "../../../../public/icons/skills/nestjs.png";
import nextjs from "../../../../public/icons/skills/nextjs.png";
import node from "../../../../public/icons/skills/nodejs.png";
import redis from "../../../../public/icons/skills/redis.png";
import redux from "../../../../public/icons/skills/redux.png";
import tailwind from "../../../../public/icons/skills/tailwind.png";
import ts from "../../../../public/icons/skills/typescript.png";
import zustand from "../../../../public/icons/skills/zustand.png";

export default function SkillPage() {
  const skills = [
    { name: "Html", icon: html },
    { name: "Css", icon: css },
    { name: "Tailwind Css", icon: tailwind },
    { name: "Javascript", icon: js },
    { name: "React js", icon: react },
    { name: "Redux", icon: redux },
    { name: "Zustand", icon: zustand },
    { name: "Next js", icon: nextjs },
    { name: "Ant design", icon: antd },
    { name: "Material ui", icon: mui },
    { name: "Github", icon: github },
    { name: "Node js", icon: node },
    { name: "Express js", icon: express },
    { name: "Json web token", icon: jwt },
    { name: "Mongo DB", icon: mongo },
    { name: "Mysql", icon: mysql },
    { name: "Typescript", icon: ts },
    { name: "Nest js", icon: nestjs },
    { name: "Redis", icon: redis },
    { name: "Docker", icon: docker },
  ];

  return (
    <main className="flex h-screen pt-10">
      <div className="m-auto w-[1200px] grid grid-cols-5 place-items-center gap-y-4">
        {skills.map((skill) => (
          <CardSkill key={uuidV4()} icon={skill.icon.src} name={skill.name} />
        ))}
      </div>
    </main>
  );
}
