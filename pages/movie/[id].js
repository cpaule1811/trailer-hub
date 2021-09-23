import ReactPlayer from "react-player/youtube";
import TrailerCard from "../../components/TrailerCard";
import MovieInfo from "../../components/MovieInfo";
import Head from "next/head";
import { useState } from "react";

export default function Movie({ movie }) {
  const [videoIndex, setVideoIndex] = useState(0);
  const { results } = movie.videos;
  const nextMovies = results.slice(0, 5);

  return (
    <>
      <Head>
        <title>Trailer Hub | {movie.title}</title>
        <meta
          name="description"
          content={`watch ${movie.title} movie trailers`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MovieInfo {...movie} />
          <div className="movie-pm">
            <div className="bg-black">
              {nextMovies.length ? (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${nextMovies[videoIndex].key}`}
                  width="100%"
                  height="70vh"
                  className="pa3"
                  config={{
                    youtube: {
                      playerVars: {
                        controls: 1,
                        rel: 1,
                      },
                    },
                  }}
                  onEnded={() =>
                    videoIndex < nextMovies.length - 1 &&
                    setVideoIndex(videoIndex + 1)
                  }
                />
              ) : (
                <div>
                  Sorry, looks like this film does not have any available
                  trailers
                </div>
              )}
            </div>
            <div className="flex carousel overflow-x-hidden auto flex-wrap justify-center mt2 pa3 mh-trailer-card">
              {nextMovies.map((trailer, i) => {
                if (i !== videoIndex)
                  return (
                    <TrailerCard
                      key={trailer.key}
                      ytKey={trailer.key}
                      name={trailer.name}
                      index={i}
                      setVideoIndex={setVideoIndex}
                    />
                  );
              })}
            </div>
          </div>
        </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(
    `http://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&append_to_response=casts,videos`
  );
  const movie = await res.json();
  return {
    props: {
      movie,
    },
  };
}
