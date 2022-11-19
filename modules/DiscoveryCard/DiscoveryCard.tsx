import { IDiscovery } from "@types";
import { CustomLink } from "components/CustomLink";
import { IconHeart, IconShare } from "components/Icons";
import { LoadingSpinner } from "components/Loading";
import { PATH } from "constants/path";
import useElementOnScreen from "hooks/useElementOnScreen";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./discoveryCard.module.scss";
const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false,
});

interface DiscoveryCardProps {
  discovery: IDiscovery;
}

const DiscoveryCard = ({ discovery }: DiscoveryCardProps) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const isVisible = useElementOnScreen(options, playerRef);
  const movie = discovery.refList?.[0];
  const [isLove, setIsLove] = useState(false);
  const [playerStyles, setPlayerStyles] = useState({
    maxWidth: "0px",
    aspectRatio: 1,
  });
  const isLoading = playerStyles.maxWidth === "0px";
  const handleLoadedMetadata = (event: any) => {
    const aspectRatio = event.target.videoWidth / event.target.videoHeight;
    if (aspectRatio === 1) {
      setPlayerStyles({ maxWidth: "473px", aspectRatio });
      return;
    }
    if (aspectRatio > 1) {
      setPlayerStyles({ maxWidth: "522px", aspectRatio });
      return;
    }
    if (aspectRatio < 1) {
      setPlayerStyles({ maxWidth: "280px", aspectRatio });
      return;
    }
  };
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <Image
            width={56}
            height={56}
            alt={discovery.upInfo.upName}
            src={discovery.upInfo.upImgUrl}
          />
        </div>
        <div>
          <h4>{discovery.upInfo.upName}</h4>
          <p className={styles.introduction}>{discovery.introduction}</p>
          {movie && (
            <CustomLink
              className={styles.link}
              href={`${PATH.watch}/${movie.category}/${movie.id}`}
            >
              {movie.name}
            </CustomLink>
          )}
        </div>
      </div>
      {isLoading && (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      )}
      <div className={styles.playerContent}>
        <ReactHlsPlayer
          controls
          poster={
            movie
              ? playerStyles.aspectRatio < 1
                ? movie.coverVerticalUrl
                : movie.coverHorizontalUrl
              : discovery.coverHorizontalUrl
          }
          src={discovery.mediaInfoUrl.mediaUrl}
          style={playerStyles}
          className={styles.player}
          playsInline={true}
          playerRef={playerRef}
          onLoadedMetadata={handleLoadedMetadata}
          autoPlay={isVisible}
          muted
        />
        {!isLoading && (
          <div className={styles.actions}>
            <button className={styles.action} onClick={() => setIsLove(!isLove)}>
              <IconHeart fill={isLove ? "#ff0000" : "#fff"} />
            </button>
            <span className={styles.number}>{discovery.likeCount}</span>
            <button className={styles.action}>
              <IconShare fill="#fff" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoveryCard;
