import type { AppProps } from "next/app";
import "styles/reset.scss";
import "styles/global.scss";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);
  if (!showChild) return null;
  if (typeof window === "undefined") return <></>;
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
