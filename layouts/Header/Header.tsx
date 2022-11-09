import { CustomLink } from "components/CustomLink";
import { PATH } from "constants/path";
import { SearchBox } from "modules/SearchBox";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.navbar}>
          <div className={styles.left}>
            <CustomLink className={styles.logo}>Filmlok</CustomLink>
            <ul>
              <li>
                <CustomLink className={styles.link} href={PATH.home}>
                  Home
                </CustomLink>
              </li>
            </ul>
          </div>
          <SearchBox />
        </nav>
      </div>
    </header>
  );
};

export default Header;
