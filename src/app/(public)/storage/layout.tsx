import { StorageNavItem } from "@/components/StoreageNavItem";
import { IPropStorageNavItem } from "@/interfaces/propsComponent.interface";
import { BenefitCustomer } from "@/layouts/public/storage/benefit-customer/BenefitCustomer";
import PersonalCustomer from "@/layouts/public/storage/benefit-customer/PersonalCustomer";
import FilterAndSearchStorage from "@/layouts/public/storage/FilterAndSearchStorage";
import {
  LayoutOutlined,
  PartitionOutlined,
  CalculatorOutlined,
  RadarChartOutlined,
  DatabaseOutlined,
  CodeOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Suspense } from "react";

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
      icon: <LayoutOutlined style={{ fontSize: "24px" }} />,
      name: "Front-end",
      href: "/storage/front-end",
    },
    {
      icon: <RadarChartOutlined style={{ fontSize: "24px" }} />,
      name: "Back-end",
      href: "/storage/back-end",
    },
    {
      icon: <PartitionOutlined style={{ fontSize: "24px" }} />,
      name: "Devops",
      href: "/storage/devops",
    },
    {
      icon: <CalculatorOutlined style={{ fontSize: "24px" }} />,
      name: "Algorithm",
      href: "/storage/algorithm",
    },
    {
      icon: <DatabaseOutlined style={{ fontSize: "24px" }} />,
      name: "Data structure",
      href: "/storage/data-structure",
    },
    {
      icon: <CodeOutlined style={{ fontSize: "24px" }} />,
      name: "Command line",
      href: "/storage/command-line",
    },
    {
      icon: <FileImageOutlined style={{ fontSize: "24px" }} />,
      name: "Image storage",
      href: "/storage/image-storage",
    },
  ];

  //
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[1200px] min-h-screen pt-20">
        {/* {requireLogin} */}
        {notificationForCustomer}
        <Suspense fallback={<div>Đang tải...</div>}>
          <FilterAndSearchStorage />
        </Suspense>
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
