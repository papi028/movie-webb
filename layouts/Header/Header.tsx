import { CustomLink } from "components/CustomLink";
import { IconSearch } from "components/Icons";
import { PATH } from "constants/path";
import { SearchBox } from "modules/SearchBox";
import styles from "./header.module.scss";

const links = [
  {
    path: PATH.home,
    display: "Home",
  },
  {
    path: PATH.profile,
    display: "Profile",
  },
  {
    path: PATH.search,
    display: "Search",
  },
  {
    path: PATH.explore,
    display: "Explore",
  },
];

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.navbar}>
          <div className={styles.left}>
            <CustomLink className={styles.logo}>Filmlok</CustomLink>
            <ul className={styles.links}>
              {links.map((link) => (
                <li key={link.path}>
                  <CustomLink className={styles.link} href={link.path}>
                    {link.display}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.searchBox}>
            <SearchBox />
          </div>
          <CustomLink className={styles.searchIcon} href={PATH.search}>
            <IconSearch fill="#fff" />
          </CustomLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
