import { IComment } from "@types";
import { Image } from "components/Image";
import { defaultAvatar } from "constants/global";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "libs/firebase-app";
import { EmojiReactions } from "modules/EmojiReactions";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  const reactionTypes: string[] = [];
  const myReaction = comment.reactions[foundMyReactionIndex];
  const [emoji, setEmoji] = useState(myReaction?.reaction || "Like");
  const handleChangeEmoji = async (value: string) => {
    if (!currentUser) return;
    const colRef = doc(db, "comments", comment.id);
    if (!myReaction) {
      comment.reactions.push({
        id: uuidv4(),
        userId: currentUser.uid,
        avatar: currentUser.photoURL || defaultAvatar,
        fullname: currentUser.displayName,
        reaction: value,
      });
      await updateDoc(colRef, { reactions: comment.reactions });
      setEmoji(value);
      return;
    }
    comment.reactions[foundMyReactionIndex].reaction = value;
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
          <span className={styles.username}>{comment.fullname || "Unknown"}</span>
          <p className={styles.description}>{comment.content}</p>
          <div className={styles.reactions}>
            {comment.reactions.slice(0, 3).map((item) => {
              const foundTypeIndex = reactionTypes.findIndex((type) => type === item.reaction);
              if (foundTypeIndex !== -1) return null;
              reactionTypes.push(item.reaction);
              return (
                <Image
                  key={item.id}
                  alt={item.reaction}
                  className={styles.reaction}
                  src={`/icon-${item.reaction}.png`}
                />
              );
            })}
            <span>{comment.reactions.length}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <EmojiReactions emoji={emoji} handleChangeEmoji={handleChangeEmoji} />
          <span>Reply</span>
          <span> {checkTimeAgo((comment?.createdAt?.seconds as number) * 1000)}</span>
          {/* <span>Edited</span> */}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
