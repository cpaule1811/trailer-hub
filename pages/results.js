import MovieCard from "../components/MovieCard"
import Head from "next/head"

export default function Results({movies, search}) { 
    return ( 
        <>
        <Head>
              <title>Trailer Hub | Search Results</title>
              <meta name="description" content="Find Movie Trailers" />
              <link rel="icon" href="/favicon.ico" />
        </Head>
          {movies.length ?
            <div className="flex flex-wrap justify-center gap mt4">
               {movies.map(item => <MovieCard key={item.id} movie={item}/>)}
            </div>
          : 
           <div className="tc f3 mt4">Sorry, we could not find any films matching {search}</div>
          }
        </>
    )
}

export async function getServerSideProps({ query }) { 
    const { search } = query 
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&query=${search}`
    const res = await fetch(url)
    const movies = await res.json()
    return { 
        props: {
            movies: movies.results,
            search
        }
    }
} 