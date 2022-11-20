import { CustomLink } from "components/CustomLink";
import { IconClose, IconMenu, IconSearch } from "components/Icons";
import { PATH } from "constants/path";
import { SearchBox } from "modules/SearchBox";
import { useRef } from "react";
import classNames from "utils/classNames";
import styles from "./header.module.scss";

const links = [
  {
    path: PATH.home,
    display: "Home",
  },
  {
    path: PATH.news,
    display: "News",
  },
  {
    path: PATH.discovery,
    display: "Discovery",
  },
  {
    path: PATH.history,
    display: "History",
  },
  {
    path: PATH.explore,
    display: "Explore",
  },
];

const Header = () => {
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleMenu = () => {
    if (menuRef.current) menuRef.current.classList.toggle("menu-hidden");
  };
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.navbar}>
          <div className={styles.left}>
            <CustomLink className={styles.logo}>Netfilm</CustomLink>
            <ul className={classNames(styles.menu, "menu-hidden")} ref={menuRef}>
              {links.map((link) => (
                <li key={link.path}>
                  <CustomLink className={styles.link} href={link.path}>
                    {link.display}
                  </CustomLink>
                </li>
              ))}
              <button className={styles.buttonCloseMenu} onClick={toggleMenu}>
                <IconClose />
              </button>
            </ul>
          </div>
          <div className={styles.searchBox}>
            <SearchBox />
          </div>
          <div className={styles.mobileAction}>
            <CustomLink href={PATH.search}>
              <IconSearch fill="#fff" />
            </CustomLink>
            <button className={styles.buttonOpenMenu} onClick={toggleMenu}>
              <IconMenu fill="#fff" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
