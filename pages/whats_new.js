import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";
import { Box } from "@mui/system";
import Head from "next/head";

export default function LatestPage({ latestReleases }) {
  return (
    <MovieList title="Latest Hits">
    <Head>
    </Head>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {latestReleases.map((item, key) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </Box>
    </MovieList>
  );
}

export async function getServerSideProps() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=67fababd59c02f4ae576177be7083836&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_average.gte=8&vote_count.gte=5&with_watch_monetization_types=flatrate
  `;
  const res = await fetch(url);
  const latest = await res.json();
  return {
    props: {
      latestReleases: latest.results,
    },
  };
  
}
