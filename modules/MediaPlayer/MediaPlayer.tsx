const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false,
});
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { IQuality, ISubtitle } from "@types";
import dynamic from "next/dynamic";

interface MediaPlayerProps {
  playerRef: React.RefObject<HTMLVideoElement>;
  subtitles: ISubtitle[];
  qualities: IQuality[];
  poster: string;
}

const MediaPlayer = ({ subtitles, qualities, poster }: MediaPlayerProps) => {
  return (
    <Player src={qualities} subtitles={subtitles}>
      {(ref, props) => <ReactHlsPlayer playerRef={ref} {...props} autoPlay poster={poster} />}
    </Player>
  );
};

export default MediaPlayer;
