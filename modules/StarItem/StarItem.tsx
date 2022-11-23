import { CustomLink } from "components/CustomLink";
import { PATH } from "constants/path";
import { Image } from "components/Image";
import styles from "./starItem.module.scss";

interface CastProps {
  starId: number;
  image: string;
  name: string;
}

const StarItem = ({ image, name, starId }: CastProps) => {
  return (
    <div className={styles.star}>
      <div className={styles.avatar}>
        <CustomLink href={`${PATH.star}/${starId}`}>
          <Image src={image} width={100} height={100} alt={name} />
        </CustomLink>
      </div>
      <CustomLink href={`${PATH.star}/${starId}`} className={styles.name}>
        {name}
      </CustomLink>
    </div>
  );
};

export default StarItem;
