import { Image } from "components/Image";
import { EmojiReactions } from "modules/EmojiReactions";
import styles from "./commentItem.module.scss";

const CommentItem = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <Image width={44} height={44} src="https://source.unsplash.com/random" alt="avatar" />
      </div>
      <div>
        <div className={styles.content}>
          <span className={styles.username}>Trái tim trống vắng</span>
          <p className={styles.description}>phim hay quá xáaaaaaaaaaaaaaaaaa</p>
        </div>
        <div className={styles.actions}>
          <EmojiReactions />
          <span>Reply</span>
          <span>1 weeks</span>
          <span>Edited</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
