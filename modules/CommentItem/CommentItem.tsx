import { IComment } from "@types";
import { Image } from "components/Image";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "libs/firebase-app";
import { EmojiReactions } from "modules/EmojiReactions";
import { useState } from "react";
import { useAppSelector } from "store/global-store";
import { checkTimeAgo } from "utils/helper";
import styles from "./commentItem.module.scss";

interface CommentItemProps {
  comment: IComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const foundMyReactionIndex = comment.reactions.findIndex(
    (item) => item.userId === currentUser?.uid
  );
  const myReactionStatus = comment.reactions[foundMyReactionIndex].reaction;
  const [emoji, setEmoji] = useState(myReactionStatus || "Like");
  const handleChangeEmoji = async (value: string) => {
    if (!currentUser) return;
    comment.reactions[foundMyReactionIndex].reaction = value;
    const colRef = doc(db, "comments", comment.id);
    await updateDoc(colRef, { reactions: comment.reactions });
    setEmoji(value);
  };
  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <Image width={44} height={44} src={comment.avatar} alt={comment.fullname} />
      </div>
      <div>
        <div className={styles.content}>
          <span className={styles.username}>{comment.fullname}</span>
          <p className={styles.description}>{comment.content}</p>
        </div>
        <div className={styles.actions}>
          <EmojiReactions emoji={emoji} handleChangeEmoji={handleChangeEmoji} />
          <span>Reply</span>
          <span> {checkTimeAgo((comment?.createdAt?.seconds as number) * 1000)}</span>
          <span>Edited</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
