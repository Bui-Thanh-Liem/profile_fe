import LoadingPage from "@/app/loading";
import { StorageNavItem } from "@/components/StoreageNavItem";
import { IPropStorageNavItem } from "@/interfaces/propsComponent.interface";
import FilterAndSearchStorage from "@/layouts/public/storage/general/FilterAndSearchStorage";
import { BenefitCustomer } from "@/layouts/public/storage/personal-customer/benefit/BenefitCustomer";
import PersonalCustomer from "@/layouts/public/storage/personal-customer/profile/ProfileCustomer";
import {
  CalculatorOutlined,
  CodeOutlined,
  DatabaseOutlined,
  LayoutOutlined,
  PartitionOutlined,
  RadarChartOutlined,
  BugOutlined,
} from "@ant-design/icons";
import { Suspense } from "react";

export default function StorageLayout({
  children,
  requireLogin,
  storageUserGuide,
}: {
  children: React.ReactNode;
  storageUserGuide: React.ReactNode;
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
      icon: <BugOutlined style={{ fontSize: "24px" }} />,
      name: "Errors",
      href: "/storage/error",
    },
  ];

  //
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[1200px] min-h-screen pt-20">
        <Suspense fallback={<></>}>{requireLogin}</Suspense>
        <Suspense fallback={<></>}>{storageUserGuide}</Suspense>
        <Suspense fallback={<></>}>
          <FilterAndSearchStorage />
        </Suspense>
        <Suspense fallback={<LoadingPage />}>
          <div className="mt-8">{children}</div>
        </Suspense>
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
