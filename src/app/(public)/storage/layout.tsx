import { StorageNavItem } from "@/components/StoreageNavItem";
import { IPropStorageNavItem } from "@/interfaces/propsComponent.interface";
import { BenefitCustomer } from "@/layouts/public/storage/benefit-customer/BenefitCustomer";
import PersonalCustomer from "@/layouts/public/storage/benefit-customer/PersonalCustomer";
import FilterAndSearchStorage from "@/layouts/public/storage/FilterAndSearchStorage";
import {
  FileCode,
  FileJson,
  Images,
  MonitorCog,
  SpellCheck,
  SpellCheck2,
  Terminal,
} from "lucide-react";

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
  const storageNavData: IPropStorageNavItem[] = [
    {
      icon: <FileCode />,
      name: "Front-end",
      href: "/storage/front-end",
    },
    {
      icon: <FileJson />,
      name: "Back-end",
      href: "/storage/back-end",
    },
    {
      icon: <MonitorCog />,
      name: "Devops",
      href: "/storage/devops",
    },
    {
      icon: <SpellCheck />,
      name: "Algorithm",
      href: "/storage/algorithm",
    },
    {
      icon: <SpellCheck2 />,
      name: "Data structure",
      href: "/storage/data-structure",
    },
    {
      icon: <Terminal />,
      name: "Command line",
      href: "/storage/command-line",
    },
    {
      icon: <Images />,
      name: "Image storage",
      href: "/storage/image-storage",
    },
  ];

  //
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[1200px] min-h-screen pt-20">
        {requireLogin}
        {notificationForCustomer}
        <FilterAndSearchStorage />
        <div className="mt-28">{children}</div>
        <div className="fixed top-1/2 right-[calc(50%-700px)] translate-x-1/2 -translate-y-1/2">
          {storageNavData.map((nav) => (
            <StorageNavItem
              key={nav.href}
              icon={nav.icon}
              name={nav.name}
              href={nav.href}
            />
          ))}
        </div>
      </div>
      <PersonalCustomer />
      <BenefitCustomer />
    </div>
  );
}
