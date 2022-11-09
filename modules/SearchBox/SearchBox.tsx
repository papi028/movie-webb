import styles from "./searchBox.module.scss";

const SearchBox = () => {
  return (
    <div className={styles.searchBox}>
      <input type="text" className={styles.searchInput} placeholder="Tìm kiếm..." />
    </div>
  );
};

export default SearchBox;
