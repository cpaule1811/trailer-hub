import Head from 'next/head'
import MovieCardCarousel from '../components/MovieCardCarousel'
import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import { Box } from '@mui/system'

export default function Home(props) {
  const { drama, action, animation, romance, comedy, user } = props
  const { isSignedIn, userId } = user
  const [recommended, setRecommended] = useState([])

  useEffect(() => {
    async function getRecommended () {
      const resp = await fetch(`/api/gettags?user_id=${userId}`)
      const data = await resp.json()
      const movies = await fetchData(data.genreString)
      setRecommended(movies.results)
    }
    isSignedIn && getRecommended()
  },[isSignedIn, userId])

  return (
    <>
      <Head>
        <title>Trailer Hub</title>
        <meta name="description" content="A site to watch all your favourite movie trailers." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Banner/>
        <Box pt={3}>
        {isSignedIn && <MovieCardCarousel genre="Reccomended for you" movies={recommended}/>}
        <MovieCardCarousel genre="Action" movies={action}/>
        <MovieCardCarousel genre="Drama" movies={drama}/>
        <MovieCardCarousel genre="Animation" movies={animation}/>
        <MovieCardCarousel genre="Comedy" movies={comedy}/>
        <MovieCardCarousel genre="Romance" movies={romance}/>
        </Box>
      </main>
      </>
  )
}

export async function getStaticProps() { 
  const drama = await fetchData(18)
  const action = await fetchData(28)
  const animation = await fetchData(16)
  const comedy = await fetchData(35)
  const romance = await fetchData(10749)

  return { 
    props: {
      drama: drama.results,
      action: action.results,
      animation: animation.results,
      comedy: comedy.results,
      romance: romance.results,
    }
  }
}

const fetchData = async (genre) => { 
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&with_genres=${genre}&vote_count.gte=1000&sort_by=vote_average.desc`
    const res = await fetch(url)
    return res.json()
}
