import { resizeImage } from "constants/global";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";

interface ImageProps extends LazyLoadImageProps {
  src: string;
  width?: number;
  height?: number;
  srcImageError?: string;
}

const Image = ({
  src,
  width = 0,
  height = 0,
  srcImageError = "/no-image-available.png",
  ...props
}: ImageProps) => {
  if (width && height) {
    return (
      <LazyLoadImage
        src={resizeImage(src, width, height)}
        effect="opacity"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = srcImageError;
        }}
        {...props}
      />
    );
  }
  return (
    <LazyLoadImage
      src={src}
      effect="opacity"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = srcImageError;
      }}
      {...props}
    />
  );
};

export default Image;
