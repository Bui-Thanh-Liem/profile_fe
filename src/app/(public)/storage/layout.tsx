import { StorageNavItem } from "@/components/StoreageNavItem";
import { IPropStorageNavItem } from "@/interfaces/propsComponent.interface";
import { Watermark } from "antd";
import { v4 } from "uuid";
import baseAlgorithm from "../../../../public/icons/algorithm.png";
import backend from "../../../../public/icons/backend.png";
import cmd from "../../../../public/icons/cmd.png";
import dataStructureAndAlgorithm from "../../../../public/icons/data-structure.png";
import devOps from "../../../../public/icons/devOps.png";
import frontend from "../../../../public/icons/frontend.png";
import imageStorage from "../../../../public/icons/image-storage.png";

export default function StorageLayout({
  children,
  requireLogin,
  notificationForCustomer,
}: {
  children: React.ReactNode;
  notificationForCustomer: React.ReactNode;
  requireLogin: React.ReactNode;
}) {
  //
  const mockData: IPropStorageNavItem[] = [
    {
      image: frontend.src,
      name: "Front-end",
      href: "/storage/front-end",
    },
    {
      image: backend.src,
      name: "Back-end",
      href: "/storage/back-end",
    },
    {
      image: devOps.src,
      name: "Devops",
      href: "/storage/devops",
    },
    {
      image: baseAlgorithm.src,
      name: "Algorithm",
      href: "/storage/algorithm",
    },
    {
      image: dataStructureAndAlgorithm.src,
      name: "Data structure",
      href: "/storage/data-structure",
    },
    {
      image: cmd.src,
      name: "Command line",
      href: "/storage/command-line",
    },
    {
      image: imageStorage.src,
      name: "Image storage",
      href: "/storage/image-storage",
    },
  ];
  return (
    <Watermark content={["LiemDev", "https://liemdev.dev"]}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[1200px] min-h-screen">
          {requireLogin}
          {notificationForCustomer}
          {children}
          <div className="fixed top-1/2 right-[calc(50%-700px)] translate-x-1/2 -translate-y-1/2">
            {mockData.map((item) => (
              <StorageNavItem
                key={v4()}
                image={item.image}
                name={item.name}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </div>
    </Watermark>
  );
}
