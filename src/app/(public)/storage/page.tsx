import { v4 as uuidV4 } from "uuid";

//
import CardStorage from "@/components/cards/CardStorage";
import { IPropCardStorage } from "@/interfaces/propsComponent.interface";
import baseAlgorithm from "../../../../public/icons/algorithm.png";
import backend from "../../../../public/icons/backend.png";
import cmd from "../../../../public/icons/cmd.png";
import dataStructureAndAlgorithm from "../../../../public/icons/data-structure.png";
import devOps from "../../../../public/icons/devOps.png";
import frontend from "../../../../public/icons/frontend.png";

//
const itemsStorage: Array<IPropCardStorage> = [
  {
    image: frontend.src,
    name: "Front-end",
    href: "/storage/font-end",
    status: {
      name: "Coming soon",
      color: "blue",
    },
    progress: 0
  },
  {
    image: backend.src,
    name: "Back-end",
    href: "/storage/back-end",
    status: {
      name: "ready",
      color: "red",
    },
    progress: 0
  },
  {
    image: devOps.src,
    name: "Devops",
    href: "/storage/devops",
    status: {
      name: "Coming soon",
      color: "blue",
    },
    progress: 0
  },
  {
    image: baseAlgorithm.src,
    name: "Base Algorithm",
    href: "/storage/base-algorithm",
    status: {
      name: "Coming soon",
      color: "blue",
    },
    progress: 0
  },
  {
    image: dataStructureAndAlgorithm.src,
    name: "Advanced Algorithm",
    href: "/storage/advanced-algorithm",
    status: {
      name: "Coming soon",
      color: "blue",
    },
    progress: 0
  },
  {
    image: cmd.src,
    name: "Command line",
    href: "/storage/command-line",
    status: {
      name: "Coming soon",
      color: "blue",
    },
    progress: 0
  },
];

export default function StoragePage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-[1200px]">
        <div className="flex flex-wrap gap-6">
          {itemsStorage?.map((item) => (
            <CardStorage
              key={uuidV4()}
              status={item.status}
              href={item.href}
              name={item.name}
              image={item.image}
              progress={0}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
