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
    { name: "Html", image: html, progress: 85 },
    { name: "Css", image: css, progress: 90 },
    { name: "Tailwind Css", image: tailwind, progress: 95 },
    { name: "Javascript", image: js, progress: 90 },
    { name: "React js", image: react, progress: 80 },
    { name: "Redux", image: redux, progress: 85 },
    { name: "Zustand", image: zustand, progress: 65 },
    { name: "Next js", image: nextjs, progress: 55 },
    { name: "Ant design", image: antd, progress: 75 },
    { name: "Material ui", image: mui, progress: 75 },
    { name: "Github", image: github, progress: 85 },
    { name: "Node js", image: node, progress: 95 },
    { name: "Express js", image: express, progress: 85 },
    { name: "Json web token", image: jwt, progress: 85 },
    { name: "Mongo DB", image: mongo, progress: 65 },
    { name: "Mysql", image: mysql, progress: 85 },
    { name: "Typescript", image: ts, progress: 65 },
    { name: "Nest js", image: nestjs, progress: 65 },
    { name: "Redis", image: redis, progress: 55 },
    { name: "Docker", image: docker, progress: 35 },
  ];

  return (
    <main className="flex h-screen pt-10">
      <div className="m-auto w-[1200px] grid grid-cols-5 place-items-center gap-y-4">
        {skills.map((skill) => (
          <CardSkill
            key={uuidV4()}
            image={skill.image.src}
            name={skill.name}
            progress={skill.progress}
          />
        ))}
      </div>
    </main>
  );
}
