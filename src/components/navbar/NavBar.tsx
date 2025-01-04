//
import facebook from "../../../public/icons/facebook.png";
import github from "../../../public/icons/github.png";
import instagram from "../../../public/icons/instagram.png";
import twitter from "../../../public/icons/twitter.png";
import youtube from "../../../public/icons/youtube.png";
import IconNavbar from "../IconNavbar";
import Logo from "../Logo";
import ItemLinkNavbar from "./ItemLinkNavbar";

//
function NavBar() {
  return (
    <div className="w-[1200px] m-auto flex justify-between items-center my-4">
      <div className="flex-1">
        <Logo />
      </div>
      <ul className="flex gap-8">
        <li>
          <ItemLinkNavbar href="/">Home</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="about">About</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="blogs">Blogs</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="projects">Projects</ItemLinkNavbar>
        </li>
        <li>
          <ItemLinkNavbar href="knowledge-storage">
            Knowledge Storage
          </ItemLinkNavbar>
        </li>
      </ul>
      <ul className="flex-1 flex gap-8 justify-end">
        <li>
          <a href="#" target="">
            <IconNavbar src={github.src} alt="github" />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <IconNavbar src={facebook.src} alt="facebook" />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <IconNavbar src={instagram.src} alt="instagram" />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <IconNavbar src={twitter.src} alt="twitter" />
          </a>
        </li>
        <li>
          <a href="#" target="">
            <IconNavbar src={youtube.src} alt="youtube" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
