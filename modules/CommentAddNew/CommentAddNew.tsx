import { Image } from "components/Image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "store/global-store";
import styles from "./commentAddNew.module.scss";

const CommentAddNew = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [commentValue, setCommentValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const resizeTextArea = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };
  const handleAddNewComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleAddNewComment");
  };
  useEffect(resizeTextArea, [commentValue]);
  return (
    <form onSubmit={handleAddNewComment} className={styles.form}>
      <div className={styles.addNew}>
        <Image
          className={styles.avatar}
          src={currentUser?.photoURL as string}
          alt={currentUser?.displayName}
        />
        <textarea
          className={styles.textarea}
          placeholder="Write comment..."
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
          ref={textAreaRef}
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          rows={1}
        />
      </div>
      <button type="submit" className={styles.submit}>
        Post
      </button>
    </form>
  );
};

export default CommentAddNew;
