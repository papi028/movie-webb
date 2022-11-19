import "styles/reset.scss";
import "styles/global.scss";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "swiper/css";
import "swiper/css/navigation";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "components/ErrorBoundary";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);
    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  if (!showChild) return null;
  if (typeof window === "undefined") return <></>;
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
