import CardSkill from "@/components/cards/CardSkill";
import { v4 as uuidV4 } from "uuid";

//
import antd from "../../../../../public/icons/skills/ant.png";
import react from "../../../../../public/icons/skills/computer.png";
import css from "../../../../../public/icons/skills/css-file-format.png";
import html from "../../../../../public/icons/skills/html.png";
import js from "../../../../../public/icons/skills/javascript.png";
import mui from "../../../../../public/icons/skills/mui.png";
import nextjs from "../../../../../public/icons/skills/nextjs.png";
import redux from "../../../../../public/icons/skills/redux.png";
import zustand from "../../../../../public/icons/skills/zustand.png";
import tailwind from "../../../../../public/icons/skills/tailwind.png";

export default function FontEndPage() {
  const skills = [
    { name: "Html", icon: html, link: "/storage/font-end/html" },
    { name: "Css", icon: css, link: "/storage/font-end/css" },
    {
      name: "Tailwind Css",
      icon: tailwind,
      link: "/storage/font-end/tailwindcss",
    },
    { name: "Javascript", icon: js, link: "/storage/font-end/javascript" },
    { name: "React js", icon: react, link: "/storage/font-end/reactjs" },
    { name: "Next js", icon: nextjs, link: "/storage/font-end/nextjs" },
    { name: "Ant design", icon: antd, link: "/storage/font-end/ant-design" },
    { name: "Material ui", icon: mui, link: "/storage/font-end/material-ui" },
    { name: "Zustand", icon: zustand, link: "/storage/font-end/zustand" },
    { name: "Redux", icon: redux, link: "/storage/font-end/redux" },
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
