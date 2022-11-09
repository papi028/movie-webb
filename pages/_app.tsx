import type { AppProps } from "next/app";
import "styles/reset.scss";
import "styles/global.scss";
import "swiper/css";
import "swiper/css/navigation";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
