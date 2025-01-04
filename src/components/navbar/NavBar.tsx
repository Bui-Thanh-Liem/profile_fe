//
import facebook from "../../../public/icons/facebook.png";
import github from "../../../public/icons/github.png";
// import instagram from "../../../public/icons/instagram.png";
import twitter from "../../../public/icons/twitter.png";
import youtube from "../../../public/icons/youtube.png";
import ItemIconNavbar from "./ItemIconNavbar";
import Logo from "../Logo";
import ItemLinkNavbar from "./ItemLinkNavbar";

//
function NavBar() {
  return (
    <div
      className="w-[1200px] m-auto flex justify-between items-center"
      style={{ height: "var(--hight-navbar)" }}
    >
      <div>
        <Logo />
      </div>
      <ul className="flex gap-8">
        <li>
          <ItemLinkNavbar href="about">About</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="skills">Skills</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="education">Education</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="work">Work</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="experience">Experience</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="/">Home</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="blogs">Blogs</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="projects">Projects</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="storage">Storage</ItemLinkNavbar>
        </li>
      </ul>
      <ul className="flex gap-8 justify-end">
        <li>
          <a href="#" target="">
            <ItemIconNavbar src={github.src} alt="github" />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <ItemIconNavbar src={facebook.src} alt="facebook" />
          </a>
        </li>
        {/* <li>
          <a href="#" target="">
            <ItemIconNavbar src={instagram.src} alt="instagram" />
          </a>
        </li> */}
        <li>
          <a href="#" target="">
            <ItemIconNavbar src={twitter.src} alt="twitter" />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <ItemIconNavbar src={youtube.src} alt="youtube" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
