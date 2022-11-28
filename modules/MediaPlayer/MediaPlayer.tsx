const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false
});
import { IQuality, ISubtitle } from "@types";
import dynamic from "next/dynamic";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";

interface MediaPlayerProps {
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
