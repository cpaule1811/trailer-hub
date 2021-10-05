import MovieList from "../../components/MovieList";
import MovieCard from "../../components/MovieCard";
import { Box } from "@mui/system";

export default function genrePage({ movies, genre }) {
  return (
    <MovieList title={genre}>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {movies.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </Box>
    </MovieList>
  );
}

export async function getStaticPaths() {
  const paths = [
    { params: { genreid: '18' } },
    { params: { genreid: '28' } },
    { params: { genreid: '16' } },
    { params: { genreid: '27' } },
    { params: { genreid: '878' } },
    { params: { genreid: '35' } },
    { params: { genreid: '80' } },
    { params: { genreid: '10749' } },
    { params: { genreid: '10752' } },
  ];
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { genreid } = params;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=67fababd59c02f4ae576177be7083836&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1000&vote_average.gte=8&with_genres=${genreid}&with_watch_monetization_types=flatrate
  `;
  const res = await fetch(url);
  const latest = await res.json();
  return {
    props: {
      movies: latest.results,
      genre: "action",
    },
  };
}
