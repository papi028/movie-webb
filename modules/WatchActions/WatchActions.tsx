import { IMovieCard } from "@types";
import { IconBell, IconShare } from "components/Icons";
import { server } from "configs/server";
import { useRouter } from "next/router";
import { addFollow, removeFollow } from "store/follow.slice";
import { useAppDispatch, useAppSelector } from "store/global-store";
import classNames from "utils/classNames";
import { copyToClipBoard } from "utils/copyToClipboard";
import styles from "./watchActions.module.scss";

const WatchActions = ({ id, domainType, title, poster }: IMovieCard) => {
  const router = useRouter();
  const { follows } = useAppSelector((state) => state.follow);
  const dispatch = useAppDispatch();
  const handleShare = () => {
    copyToClipBoard(`${server}${router.asPath}`);
  };
  const handleFollowMovie = () => {
    dispatch(addFollow({ id, domainType, title, poster }));
    const foundMovieIndex = follows.findIndex((movie) => movie.id === id);
    if (foundMovieIndex !== -1) {
      dispatch(removeFollow(id));
      return;
    }
    dispatch(addFollow({ id, domainType, title, poster }));
  };
  return (
    <div className={styles.actions}>
      <button className={classNames(styles.follow, styles.action)} onClick={handleFollowMovie}>
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
