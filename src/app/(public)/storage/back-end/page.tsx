import CardSkill from "@/components/cards/CardSkill";
import { v4 as uuidV4 } from "uuid";

//
import nodeJs from "../../../../../public/icons/skills/nodejs.png";
import expressJs from "../../../../../public/icons/skills/express.png";
import jwt from "../../../../../public/icons/skills/jwt.png";
import mongoDb from "../../../../../public/icons/skills/mongo.png";
import mySql from "../../../../../public/icons/skills/javascript.png";
import ts from "../../../../../public/icons/skills/typescript.png";
import nestjs from "../../../../../public/icons/skills/nestjs.png";
import redis from "../../../../../public/icons/skills/redis.png";
import docker from "../../../../../public/icons/skills/docker.png";

export default function BackEndPage() {
  const skills = [
    { name: "Node JS", icon: nodeJs, link: "/storage/back-end/nodejs" },
    {
      name: "Express JS",
      icon: expressJs,
      link: "/storage/back-end/expressjs",
    },
    {
      name: "Json Web Token",
      icon: jwt,
      link: "/storage/back-end/jwt",
    },
    { name: "Mongo DB", icon: mongoDb, link: "/storage/back-end/mongodb" },
    { name: "My SQL", icon: mySql, link: "/storage/back-end/mysql" },
    { name: "Typescript", icon: ts, link: "/storage/back-end/typescript" },
    { name: "Nest JS", icon: nestjs, link: "/storage/back-end/nestjs" },
    { name: "Redis", icon: redis, link: "/storage/back-end/redis" },
    { name: "Docker ", icon: docker, link: "/storage/back-end/docker" },
  ];

  return (
    <main className="flex h-screen pt-10">
      <div className="m-auto w-[1200px] grid grid-cols-4 place-items-center gap-y-16">
        {skills.map((skill) => {
          return (
            <div key={uuidV4()}>
              <CardSkill
                icon={skill.icon.src}
                name={skill.name}
                link={skill.link}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
