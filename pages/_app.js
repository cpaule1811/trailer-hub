import LoadingBar from "../components/LoadingBar";
import Layout from "../components/layout";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import Providers from "../components/Providers";
import createEmotionCache from "../utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const [loadComplete, setLoadComplete] = useState(true);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setLoadComplete(true);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setLoadComplete(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Providers emotionCache={emotionCache}>
      <Head>
        <title>Trailer Hub</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Layout>
        <LoadingBar
          loadComplete={loadComplete}
          setLoadComplete={setLoadComplete}
        />
        <Component {...pageProps} setLoadComplete={setLoadComplete} />
      </Layout>
    </Providers>
  );
}
