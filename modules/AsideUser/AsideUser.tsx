import { CustomLink } from "components/CustomLink";
import { IconKeyPassword, IconLogout, IconUser } from "components/Icons";
import { Image } from "components/Image";
import { defaultAvatar } from "constants/global";
import { PATH } from "constants/path";
import { logout } from "store/auth.slice";
import { useAppDispatch, useAppSelector } from "store/global-store";
import styles from "./asideUser.module.scss";

const AsideUser = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.aside}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <Image src={currentUser?.photoURL || defaultAvatar} alt="avatar" />
        </div>
        <div>
          <h3 className={styles.username}>{currentUser?.displayName}</h3>
          <span className={styles.email}>User</span>
        </div>
      </div>
      <div className={styles.links}>
        <CustomLink href={PATH.profile} className={styles.link}>
          <IconUser />
          <span>Profile</span>
        </CustomLink>
        <CustomLink href={PATH.changePassword} className={styles.link}>
          <IconKeyPassword />
          <span>Password</span>
        </CustomLink>
        <button onClick={handleLogout} className={styles.logout}>
          <IconLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AsideUser;
