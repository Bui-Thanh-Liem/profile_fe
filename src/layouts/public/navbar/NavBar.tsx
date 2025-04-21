//
import {
  FacebookOutlined,
  GithubOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Logo from "../../../components/Logo";
import { NavbarItemIcon } from "./NavbarItemIcon";
import { NavbarItemLink } from "./NavbarItemLink";

//
function NavBar() {
  return (
    <div className="w-[1200px] m-auto flex justify-between items-center h-16">
      <div>
        <Logo />
      </div>
      <ul className="flex gap-8">
        <li>
          <NavbarItemLink href="/">Home</NavbarItemLink>
        </li>
        <li>
          <NavbarItemLink href="/about">About</NavbarItemLink>
        </li>
        <li>
          <NavbarItemLink href="/skills">Skills</NavbarItemLink>
        </li>
        <li>
          <NavbarItemLink href="/education">Education</NavbarItemLink>
        </li>
        <li>
          <NavbarItemLink href="/experience">Experience</NavbarItemLink>
        </li>
        <li>
          <NavbarItemLink href="/projects">Projects</NavbarItemLink>
        </li>
        <li>
          <NavbarItemLink href="/blogs">Blogs</NavbarItemLink>
        </li>
        <li>
          <NavbarItemLink href="/storage">Storage</NavbarItemLink>
        </li>
      </ul>
      <ul className="flex gap-8 justify-end">
        <li>
          <a href="#" target="">
            <NavbarItemIcon icon={<FacebookOutlined color=""/>} />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <NavbarItemIcon icon={<GithubOutlined />} />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <NavbarItemIcon icon={<TwitterOutlined />} />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <NavbarItemIcon icon={<YoutubeOutlined />} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
