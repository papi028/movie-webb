import { CustomLink } from "components/CustomLink";
import { PATH } from "constants/path";
import { Image } from "components/Image";
import styles from "./newsCard.module.scss";
import { IMAGE_SIZE, resizeImageLoklok } from "constants/global";

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
          <Image
            src={resizeImageLoklok(image, IMAGE_SIZE.newCard.width, IMAGE_SIZE.newCard.height)}
            alt={title}
          />
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
