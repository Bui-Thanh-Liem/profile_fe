import { v4 as uuidV4 } from "uuid";

//
import CardStorage from "@/components/cards/CardStorage";
import { IPropCardStorage } from "@/interfaces/propsComponent.interface";
import ModalRequireLogin from "@/components/modals/ModalRequireLogin";
import baseAlgorithm from "../../../public/icons/algorithm.png";
import backend from "../../../public/icons/backend.png";
import cmd from "../../../public/icons/cmd.png";
import dataStructureAndAlgorithm from "../../../public/icons/data-structure.png";
import devOps from "../../../public/icons/devOps.png";
import frontend from "../../../public/icons/frontend.png";

//
const itemsStorage: Array<IPropCardStorage> = [
  {
    icon: frontend.src,
    name: "Front-end",
    href: "/storage/font-end",
  },
  {
    icon: backend.src,
    name: "Back-end",
    href: "/storage/back-end",
  },
  {
    icon: devOps.src,
    name: "Devops",
    href: "/storage/devops",
  },
  {
    icon: baseAlgorithm.src,
    name: "Base Algorithm",
    href: "/storage/base-algorithm",
  },
  {
    icon: dataStructureAndAlgorithm.src,
    name: "Advanced Algorithm",
    href: "/storage/advanced-algorithm",
  },
  {
    icon: cmd.src,
    name: "Command line",
    href: "/storage/command-line",
  },
];

export default function StoragePage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-[1200px]">
        <ModalRequireLogin />
        <div className="flex flex-wrap gap-6">
          {itemsStorage?.map((item) => (
            <CardStorage
              key={uuidV4()}
              href={item.href}
              name={item.name}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
