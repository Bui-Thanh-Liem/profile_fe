// import ModalRequireLogin from "@/components/modals/ModalRequireLogin";
import CardStorage from "@/components/cards/CardStorage";
import { IPropCardStorage } from "@/interfaces/propsComponent.interface";
import { v4 as uuidV4 } from "uuid";
import baseAlgorithm from "../../../public/icons/algorithm.png";
import backend from "../../../public/icons/backend.png";
import dataStructureAndAlgorithm from "../../../public/icons/data-structure.png";
import devOps from "../../../public/icons/devOps.png";
import frontend from "../../../public/icons/frontend.png";
import Notification from "./Notification";
import Profile from "./Profile";

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
    href: "base-algorithm",
  },
  {
    iconUrl: dataStructureAndAlgorithm.src,
    name: "Data Structure And Algorithm",
    href: "data-structure-and-algorithm",
  },
];

function CardStorageList({ items }: { items: Array<IPropCardStorage> }) {
  return (
    <div className="grid grid-cols-3">
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
    <main className="flex">
      <div className="m-auto w-[1200px]">
        {/* <ModalRequireLogin /> */}
        <Notification />
        <Profile />
        {/* <div className="flex items-center justify-end gap-12">
        </div> */}
        <CardStorageList items={itemsStorage} />
      </div>
    </main>
  );
}
