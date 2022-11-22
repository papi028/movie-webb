import { IconBell, IconShare } from "components/Icons";
import { server } from "configs/server";
import { useRouter } from "next/router";
import classNames from "utils/classNames";
import { copyToClipBoard } from "utils/copyToClipboard";
import styles from "./watchActions.module.scss";

const WatchActions = () => {
  const router = useRouter();
  const handleShare = () => {
    copyToClipBoard(`${server}${router.asPath}`);
  };
  return (
    <div className={styles.actions}>
      <button className={classNames(styles.follow, styles.action)}>
        <IconBell />
        <span>Follow</span>
      </button>
      <button className={classNames(styles.share, styles.action)} onClick={handleShare}>
        <IconShare fill="#fff" height={20} width={20} />
        <span>Share</span>
      </button>
    </div>
  );
};

export default WatchActions;
