import { IStar } from "@types";
import { StarItem } from "modules/StarItem";
import styles from "./watchStar.module.scss";

interface WatchStarProps {
  starList: IStar[];
}

const WatchStar = ({ starList }: WatchStarProps) => {
  return (
    <div className={styles.list}>
      {starList.map((star) => (
        <StarItem key={star.starId} image={star.image} name={star.localName} starId={star.starId} />
      ))}
    </div>
  );
};

export default WatchStar;
