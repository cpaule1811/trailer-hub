import MovieCard from "../components/MovieCard";
import Head from "next/head";
import { Box } from "@mui/system";
import { Typography, Divider, Container } from "@mui/material";
import MovieList from "../components/MovieList";

export default function Results({ movies, search }) {
  return (
      <MovieList title="Top Results">
        <Head>
          <title>Trailer Hub | Search Results</title>
          <meta name="description" content="Find Movie Trailers" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {movies.length ? (
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {movies.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </Box>
        ) : (
          <Typography variant="h4" sx={{ textAlign:"center" }}>
            Sorry, we could not find any films matching {search}
          </Typography>
        )}
      </MovieList>
  );
}

export async function getServerSideProps({ query }) {
  const { search } = query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&query=${search}`;
  const res = await fetch(url);
  const movies = await res.json();
  return {
    props: {
      movies: movies.results,
      search,
    },
  };
}
