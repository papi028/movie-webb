import { CheckLoadMore } from "modules/CheckLoadMore";
import { FC, HTMLProps, useEffect, useRef, useState } from "react";

interface ImageLazyLoadProps {
  src: string;
  opacity?: number;
}

const ImageLazyLoad: FC<HTMLProps<HTMLImageElement> & ImageLazyLoadProps> = ({
  src,
  crossOrigin: _,
  opacity = 1,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [realSrc, setRealSrc] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const handler = () => {
      setLoaded(true);
    };
    const current = imageRef.current;
    current?.addEventListener("load", handler);
    return () => current?.removeEventListener("load", handler);
  }, [src]);

  return (
    <CheckLoadMore onLoadMore={() => setRealSrc(src)}>
      <picture>
        <img ref={imageRef} style={{ opacity: loaded ? 1 : 0 }} src={realSrc} alt="" {...props} />
      </picture>
    </CheckLoadMore>
  );
};

export default ImageLazyLoad;
