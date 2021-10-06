import Head from "next/head";
import MovieCardCarousel from "../components/MovieCardCarousel";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import { Box } from "@mui/system";
import { useUser } from "../hooks/UserContext";

export default function Home(props) {
  const { drama, action, animation, romance, comedy } = props;
  const { isSignedIn, userId, watchlist } = useUser();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    async function getRecommended() {
      const resp = await fetch(`/api/gettags?user_id=${userId}`);
      const data = await resp.json();
      const movies = await fetchData(data.genreString);
      setRecommended(movies.results);
    }
    isSignedIn && getRecommended();
  }, [isSignedIn, userId]);

  return (
    <>
      <Head>
        <title>Trailer Hub</title>
        <meta
          name="description"
          content="A site to watch all your favourite movie trailers."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <Box pt={3} width="100%" sx={{ overflow: "hidden" }}>
        {watchlist.length > 0 &&
          <MovieCardCarousel genre="List" movies={watchlist} />
        }
        {isSignedIn && (
          <MovieCardCarousel genre="Reccomended for you" movies={recommended} />
        )}
        <MovieCardCarousel genre="Action" movies={action} />
        <MovieCardCarousel genre="Drama" movies={drama} />
        <MovieCardCarousel genre="Animation" movies={animation} />
        <MovieCardCarousel genre="Comedy" movies={comedy} />
        <MovieCardCarousel genre="Romance" movies={romance} />
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const drama = await fetchData(18);
  const action = await fetchData(28);
  const animation = await fetchData(16);
  const comedy = await fetchData(35);
  const romance = await fetchData(10749);

  return {
    props: {
      drama: drama.results,
      action: action.results,
      animation: animation.results,
      comedy: comedy.results,
      romance: romance.results,
    },
  };
}

const fetchData = async (genre) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&with_genres=${genre}&vote_count.gte=1000&sort_by=vote_average.desc`;
  const res = await fetch(url);
  return res.json();
};
