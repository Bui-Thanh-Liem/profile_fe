// import ModalRequireLogin from "@/components/modals/ModalRequireLogin";
import CardStorage from "@/components/cards/CardStorage";
import ModalRequireLogin from "@/components/modals/ModalRequireLogin";
import { IPropCardStorage } from "@/interfaces/propsComponent.interface";
import { v4 as uuidV4 } from "uuid";
import baseAlgorithm from "../../../public/icons/algorithm.png";
import backend from "../../../public/icons/backend.png";
import cmd from "../../../public/icons/cmd.png";
import dataStructureAndAlgorithm from "../../../public/icons/data-structure.png";
import devOps from "../../../public/icons/devOps.png";
import frontend from "../../../public/icons/frontend.png";

const itemsStorage: Array<IPropCardStorage> = [
  {
    iconUrl: frontend.src,
    name: "Front-end",
    href: "font-end",
  },
  {
    iconUrl: backend.src,
    name: "Back-end",
    href: "back-end",
  },
  {
    iconUrl: devOps.src,
    name: "Devops",
    href: "devops",
  },
  {
    iconUrl: baseAlgorithm.src,
    name: "Base Algorithm",
    href: "/base-algorithm",
  },
  {
    iconUrl: dataStructureAndAlgorithm.src,
    name: "Advanced Algorithm",
    href: "advanced-algorithm",
  },
  {
    iconUrl: cmd.src,
    name: "Command line",
    href: "cmd",
  },
];

function CardStorageList({ items }: { items: Array<IPropCardStorage> }) {
  return (
    <div className="flex flex-wrap gap-6">
      {items?.map((item) => (
        <CardStorage
          key={uuidV4()}
          href={item.href}
          name={item.name}
          iconUrl={item.iconUrl}
        />
      ))}
    </div>
  );
}

export default function StorageLayout() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-[1200px]">
        <ModalRequireLogin />
        <CardStorageList items={itemsStorage} />
      </div>
    </main>
  );
}
