"use client";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import {
  FacebookOutlined,
  GithubOutlined
} from "@ant-design/icons";
import { useEffect } from "react";
import Logo from "../../../components/Logo";
import { NavbarItemIcon } from "./NavbarItemIcon";
import { NavbarItemLink } from "./NavbarItemLink";

//
export default function NavBar() {
  const {
    isMobileSmall,
    isMobileLarge,
    isTablet,
    isDesktopSmall,
    isDesktop,
    isDesktopLarge,
  } = useBreakpoints();

  useEffect(() => {
    console.log("isMobileSmall::::", isMobileSmall);
    console.log("isMobileLarge::::", isMobileLarge);
    console.log("isTablet::::", isTablet);
    console.log("isDesktopSmall::::", isDesktopSmall);
    console.log("isDesktop::::", isDesktop);
    console.log("isDesktopLarge::::", isDesktopLarge);
  }, [
    isDesktop,
    isDesktopLarge,
    isDesktopSmall,
    isMobileLarge,
    isMobileSmall,
    isTablet,
  ]);

  //
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/education", label: "Education" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/storage", label: "Storage" },
  ];

  //
  const socialLinks = [
    {
      icon: (
        <FacebookOutlined
          className="text-blue-500"
          style={{ fontSize: "24px" }}
        />
      ),
      href: "https://www.facebook.com/profile.php?id=100010395697006",
      target: "_blank",
    },
    {
      icon: <GithubOutlined style={{ fontSize: "24px" }} />,
      href: "https://github.com/Bui-Thanh-Liem",
      target: "_blank",
    },
  ];

  return (
    <div className="w-[1200px] m-auto flex justify-between items-center h-16">
      <div>
        <Logo />
      </div>

      {/*  */}
      <ul className="flex gap-8">
        {navLinks?.map((nav) => (
          <li key={nav.href}>
            <NavbarItemLink href={nav.href}>{nav.label}</NavbarItemLink>
          </li>
        ))}
      </ul>

      {/*  */}
      <ul className="flex gap-8 justify-end">
        {socialLinks?.map((nav) => (
          <li key={nav.href}>
            <a href="#" target="">
              <NavbarItemIcon icon={nav.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
