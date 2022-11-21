import { IconTrash } from "components/Icons";
import Image from "next/image";
import styles from "./imageUpload.module.scss";

interface ImageUploadProps {
  name: string;
  className: string;
  progress: number;
  image: string;
  handleDeleteImage: () => void;
}

const ImageUpload = ({
  name,
  className = "",
  progress = 0,
  image = "",
  handleDeleteImage = () => {},
  ...props
}: ImageUploadProps) => {
  return (
    <label className={styles.imageUpload}>
      <input
        type="file"
        name={name}
        className={styles.inputFileHidden}
        onChange={() => {}}
        {...props}
      />
      {progress !== 0 && !image && <div className={styles.loading}></div>}
      {!image && progress === 0 && (
        <div className={styles.upload}>
          <Image src="/img-upload.png" alt="upload-image" width={140} height={140} />
          <span>Choose photo</span>
        </div>
      )}
      {image && (
        <div className={styles.preview}>
          <picture>
            <img src={image} alt="preview" />
          </picture>
          <button className={styles.buttonDelete} onClick={handleDeleteImage}>
            <IconTrash />
          </button>
        </div>
      )}
      {!image && (
        <div className={styles.progress} style={{ width: `${Math.ceil(progress)}%` }}></div>
      )}
    </label>
  );
};

export default ImageUpload;
