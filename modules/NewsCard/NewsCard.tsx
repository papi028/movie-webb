import { CustomLink } from "components/CustomLink";
import { PATH } from "constants/path";
import { Image } from "components/Image";
import styles from "./newsCard.module.scss";

interface NewsCardProps {
  image: string;
  id: number;
  title: string;
  introduction: string;
}

const NewsCard = ({ image, title, introduction, id }: NewsCardProps) => {
  return (
    <div>
      <div className={styles.thumbnail}>
        <CustomLink href={`${PATH.news}/${id}`}>
          <Image src={image} width={500} height={282} alt={title} />
        </CustomLink>
      </div>
      <div>
        <CustomLink href={`${PATH.news}/${id}`}>
          <h3 dangerouslySetInnerHTML={{ __html: title }} className={styles.title} />
        </CustomLink>
        <p className={styles.description}>{introduction}</p>
      </div>
    </div>
  );
};

export default NewsCard;
