import { CommentAddNew } from "modules/CommentAddNew";
import { CommentItem } from "modules/CommentItem";
import styles from "./commentList.module.scss";

const CommentList = () => {
  return (
    <div className={styles.section}>
      <h4>Comments</h4>
      <CommentAddNew />
      <div className={styles.comments}>
        <CommentItem />
        <CommentItem />
      </div>
    </div>
  );
};

export default CommentList;
