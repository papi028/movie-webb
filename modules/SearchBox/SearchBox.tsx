import { CustomLink } from "components/CustomLink";
import { IconSearch } from "components/icons";
import axiosClient from "configs/axiosClient";
import { PATH } from "constants/path";
import { useDebounce } from "hooks/useDebounce";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import classNames from "utils/classNames";
import styles from "./searchBox.module.scss";

const SearchBox = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [suggests, setSuggests] = useState<string[]>([]);
  const debouncedKeyword = useDebounce(keyword, 500);
  const fetchSuggestsKeyword = async () => {
    const { data } = await axiosClient(`/api/search/suggest?keyword=${keyword}`);
    setSuggests(data);
  };
  const handleChangeKeyword = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    setKeyword(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${PATH.search}?keyword=${keyword}`);
    setKeyword("");
  };
  useEffect(() => {
    fetchSuggestsKeyword();
  }, [debouncedKeyword]);

  return (
    <div className={styles.searchBox}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Tìm kiếm..."
          onChange={handleChangeKeyword}
        />
        <button type="submit" className={styles.searchButton}>
          <IconSearch />
        </button>
      </form>
      <ul className={classNames(styles.searchResults, "scrollbar")}>
        {suggests.map((suggest) => {
          const name = encodeURIComponent(suggest.replace(/[\<em>\</em>]/g, ""));
          return (
            <li key={name}>
              <CustomLink
                href={`${PATH.search}?keyword=${name}`}
                dangerouslySetInnerHTML={{ __html: suggest }}
                className={styles.suggest}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBox;
