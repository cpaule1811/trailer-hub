import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingBar from "../components/LoadingBar";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import "tachyons";
import "../styles/globals.css";
import "../styles/media.css";

import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "../components/UserContext";

import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";

import "/styles/globals.css";
import theme from "../styles/theme";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const [user, setUser] = useState({
    isSignedIn: false,
    userId: null,
  });
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
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Trailer Hub</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
      <UserProvider>
        <NavBar user={user} setUser={setUser} />
        <Box marginTop="84px">
          <LoadingBar
            loadComplete={loadComplete}
            setLoadComplete={setLoadComplete}
          />
          <Component
            {...pageProps}
            user={user}
            setUser={setUser}
            setLoadComplete={setLoadComplete}
          />
        </Box>
        <Footer />
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
