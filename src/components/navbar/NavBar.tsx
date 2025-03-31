//
import facebook from "../../../public/icons/facebook.png";
import github from "../../../public/icons/github.png";
// import instagram from "../../../public/icons/instagram.png";
import twitter from "../../../public/icons/twitter.png";
import youtube from "../../../public/icons/youtube.png";
import Logo from "../Logo";
import { NavbarItemLink } from "./NavbarItemLink";
import { NavbarItemIcon } from "./NavbarItemIcon";

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
            <NavbarItemIcon src={github.src} alt="github" />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <NavbarItemIcon src={facebook.src} alt="facebook" />
          </a>
        </li>
        {/* <li>
          <a href="#" target="">
            <ItemIconNavbar src={instagram.src} alt="instagram" />
          </a>
        </li> */}
        <li>
          <a href="#" target="">
            <NavbarItemIcon src={twitter.src} alt="twitter" />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <NavbarItemIcon src={youtube.src} alt="youtube" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
