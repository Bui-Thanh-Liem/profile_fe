import { v4 as uuidV4 } from "uuid";

//
import CardSkill from "@/components/cards/CardSkill";
import antd from "../../../public/icons/skills/ant.png";
import react from "../../../public/icons/skills/computer.png";
import css from "../../../public/icons/skills/css-file-format.png";
import docker from "../../../public/icons/skills/docker.png";
import express from "../../../public/icons/skills/express.png";
import github from "../../../public/icons/skills/github.png";
import html from "../../../public/icons/skills/html.png";
import js from "../../../public/icons/skills/java-script.png";
import jwt from "../../../public/icons/skills/jwt.png";
import mongo from "../../../public/icons/skills/mongo.png";
import mui from "../../../public/icons/skills/mui.png";
import mysql from "../../../public/icons/skills/mysql-database.png";
import nestjs from "../../../public/icons/skills/nestjs.png";
import nextjs from "../../../public/icons/skills/nextjs.png";
import node from "../../../public/icons/skills/nodejs.png";
import redis from "../../../public/icons/skills/redis.png";
import redux from "../../../public/icons/skills/redux.png";
import ts from "../../../public/icons/skills/typescript.png";
import zustand from "../../../public/icons/skills/zustand.png";

export default function SkillPage() {
  const skills = [
    { name: "Html", icon: html },
    { name: "Css", icon: css },
    { name: "Javascript", icon: js },
    { name: "React js", icon: react },
    { name: "Next js", icon: nextjs },
    { name: "Antd design", icon: antd },
    { name: "Material ui", icon: mui },
    { name: "Zustand", icon: zustand },
    { name: "Node js", icon: node },
    { name: "Express js", icon: express },
    { name: "Mongo DB", icon: mongo },
    { name: "Mysql", icon: mysql },
    { name: "Typescript", icon: ts },
    { name: "Redux", icon: redux },
    { name: "Nest js", icon: nestjs },
    { name: "Github", icon: github },
    { name: "Json web token", icon: jwt },
    { name: "Redis", icon: redis },
    { name: "Docker", icon: docker },
  ];

  return (
    <main className="flex h-screen">
      <div className="m-auto w-[1200px] grid grid-cols-5 place-items-center gap-y-4">
        {skills.map((skill, index) => {
          const delay = `${index * 0.4}s`;
          return (
            <div
              key={uuidV4()}
              className="h-32 w-56 border-4 bg-gradient-to-tr from-primary rounded-tl-3xl rounded-br-3xl flex justify-center items-center flex-col gap-2 cursor-pointer animate-wave"
              style={{ animationDelay: delay }}
            >
              <CardSkill iconUrl={skill.icon.src} name={skill.name} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
