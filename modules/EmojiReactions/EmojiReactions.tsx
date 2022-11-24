import { IconLike } from "components/Icons";
import { useState } from "react";
import classNames from "utils/classNames";
import styles from "./emojiReactions.module.scss";

const EmojiReactions = () => {
  const [emoji, setEmoji] = useState("");
  const handleReactEmoji = (value: string) => {
    setEmoji(value);
  };
  return (
    <div className={styles.reaction}>
      <span>Like</span>
      <div className={styles.emojiContainer}>
        <div
          onClick={() => handleReactEmoji("Like")}
          className={classNames(styles.emoji, styles.like)}
        >
          <div className={styles.icon} data-title="Like"></div>
        </div>
        <div
          onClick={() => handleReactEmoji("Love")}
          className={classNames(styles.emoji, styles.love)}
        >
          <div className={styles.icon} data-title="Love"></div>
        </div>
        <div
          onClick={() => handleReactEmoji("Haha")}
          className={classNames(styles.emoji, styles.haha)}
        >
          <div className={styles.icon} data-title="Haha"></div>
        </div>
        <div
          onClick={() => handleReactEmoji("Wow")}
          className={classNames(styles.emoji, styles.wow)}
        >
          <div className={styles.icon} data-title="Wow"></div>
        </div>
        <div
          onClick={() => handleReactEmoji("Sad")}
          className={classNames(styles.emoji, styles.sad)}
        >
          <div className={styles.icon} data-title="Sad"></div>
        </div>
        <div
          onClick={() => handleReactEmoji("Angry")}
          className={classNames(styles.emoji, styles.angry)}
        >
          <div className={styles.icon} data-title="Angry"></div>
        </div>
      </div>
    </div>
  );
};

export default EmojiReactions;
