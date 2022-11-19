import { IObjIdName } from "@types";
import { CustomLink } from "components/CustomLink";
import { PATH } from "constants/path";
import styles from "./watchCategory.module.scss";

interface WatchCategoryProps {
  categories: IObjIdName[];
}

const WatchCategory = ({ categories }: WatchCategoryProps) => {
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <CustomLink
          key={category.id}
          href={`${PATH.category}?category=${category.id}`}
          className={styles.category}
        >
          {category.name}
        </CustomLink>
      ))}
    </div>
  );
};

export default WatchCategory;
