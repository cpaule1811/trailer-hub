import MovieCard from '../components/MovieCard'
import MovieList from '../components/MovieList'
import { Box } from '@mui/system'
import { useUser } from '../hooks/UserContext'

export default function ListPage () {
    const { watchlist } = useUser() 
    return ( 
           <MovieList title="List">
                <Box display="flex" flexWrap="wrap">
               {watchlist.map(item => { return <MovieCard key={item.id} movie={item} /> })}
               </Box>
           </MovieList>
    )
}