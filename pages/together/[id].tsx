import { IEpisode, IRoomInfo } from "@types";
import { LoadingSpinner } from "components/Loading";
import axiosClient from "configs/axiosClient";
import { defaultAvatar } from "constants/global";
import { Unsubscribe } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { db } from "libs/firebase-app";
import { CommentList } from "modules/CommentList";
import { MediaPlayer } from "modules/MediaPlayer";
import { Message } from "modules/Message";
import { MovieCard } from "modules/MovieCard";
import { MovieList } from "modules/MovieList";
import { WatchActions } from "modules/WatchActions";
import { WatchCategory } from "modules/WatchCategory";
import { WatchMeta } from "modules/WatchMeta";
import { WatchStar } from "modules/WatchStar";
import { WatchSummary } from "modules/WatchSummary";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "store/global-store";
import styles from "styles/watch.module.scss";
import classNames from "utils/classNames";
import { v4 as uuidv4 } from "uuid";

const WatchTogether = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { currentUser } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IEpisode>();
  const [commentValue, setCommentValue] = useState("");
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>();
  console.log("roomInfo: ", roomInfo);
  useEffect(() => {
    let unSubscribe: Unsubscribe = () => {};
    async function getRoom() {
      try {
        if (!id) return;
        const colRef = doc(db, "rooms", id);
        unSubscribe = onSnapshot(colRef, async (doc) => {
          const room: IRoomInfo = doc.data() as IRoomInfo;
          const { movieId, categoryId, episodeId } = room;
          try {
            const { data } = await axiosClient.get(`/api/episode`, {
              params: { id: movieId, category: categoryId, episode: episodeId },
            });
            setData(data);
            setRoomInfo(room);
          } catch (error) {
            console.log("error: ", error);
          } finally {
            setLoading(false);
          }
        });
        return unSubscribe;
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    getRoom();
    return () => {
      unSubscribe();
    };
  }, [id]);

  const handlePause = async () => {
    const watchRef = doc(db, "rooms", id);
    await updateDoc(watchRef, {
      isPlaying: false,
    });
    console.log("updated pause!!!");
  };

  const handlePlay = async () => {
    const colRef = doc(db, "rooms", id);
    await updateDoc(colRef, {
      isPlaying: true,
    });
    console.log("updated play!!!");
  };

  const handleTimeUpdate = async (e: any) => {
    const colRef = doc(db, "rooms", id);
    await updateDoc(colRef, {
      currentTime: e.target.currentTime,
    });
    console.log("updated time!!!");
  };

  const handleAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please sign in!");
      return;
    }
    try {
      const colRef = doc(db, "rooms", id as string);
      const cloneRoomInfo = roomInfo;
      cloneRoomInfo?.messages.push({
        id: uuidv4(),
        userId: currentUser.uid,
        avatar: currentUser.photoURL || defaultAvatar,
        fullname: currentUser.displayName,
        content: commentValue,
      });
      await updateDoc(colRef, { messages: cloneRoomInfo?.messages });
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setCommentValue("");
    }
  };
  if (!data || loading) {
    return (
      <LayoutPrimary>
        <LoadingSpinner />
      </LayoutPrimary>
    );
  }
  return (
    <LayoutPrimary>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.layoutMain}>
            <MediaPlayer
              qualities={data.qualities}
              subtitles={data.subtitles}
              poster={data.coverHorizontalUrl}
              onSeeked={handleTimeUpdate}
              onPlay={handlePlay}
              onPause={handlePause}
              autoPlay={roomInfo?.isPlaying}
            />
            <h1 className={styles.heading}>
              {data.name} {data.currentEpName && `- ${data.currentEpName}`}
            </h1>
            <div className={styles.meta}>
              <WatchMeta
                areaList={data.areaList}
                currentEpisode={data.currentEpisode}
                episodeCount={data.episodeCount}
                year={data.year}
                score={data.score}
              />
              <WatchActions
                id={data.id}
                title={data.name}
                domainType={data.category}
                poster={data.coverVerticalUrl}
              />
            </div>
            <WatchCategory categories={data.tagList} />
            <WatchSummary introduction={data.introduction} />
            <WatchStar starList={data.starList} />
          </div>
          <div className={classNames(styles.layoutSidebar, "scrollbar")}>
            <span className={styles.notification}>
              <b>Thuan Bach</b> has joined the room
            </span>
            {roomInfo?.messages.map((message) => (
              <Message
                key={message.id}
                isMe={currentUser?.uid === message.userId}
                username={message.fullname}
                content={message.content}
                avatar={defaultAvatar}
              />
            ))}
            <form className={styles.form} onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="Write comment"
                value={commentValue}
                onKeyDown={(e) => e.stopPropagation()}
                onKeyUp={(e) => e.stopPropagation()}
                onKeyPress={(e) => e.stopPropagation()}
                onChange={(e) => setCommentValue(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className={styles.layoutMain}>
          <CommentList />
        </div>
        <MovieList heading="You may like">
          {data.likeList.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.name}
              poster={movie.coverVerticalUrl}
              domainType={movie.category}
            />
          ))}
        </MovieList>
      </div>
    </LayoutPrimary>
  );
};

export default WatchTogether;
