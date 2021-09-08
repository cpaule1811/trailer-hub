import Link from 'next/link'
import Image from 'next/image'

export default function MovieCard({ movie }) {
   const {poster_path, id, title, overview} = movie
   const url= `https://image.tmdb.org/t/p/w300${poster_path}`
   return ( 
      <Link href={`/movie/${id}`} passHref>
      <div className="mh2 mv3 br2 card-dimensions pointer hide-child relative shadow-4 grow-light">
         <Image className="br2 shadow-5" src={url} width={250} height={375} alt={`Poster for ${title}`}/>
          <div className="fade card-dimensions child absolute top-0 br2"></div>
         <div className="white child shadow-5 absolute w-100 bottom-0 h3 mt--1">
             <div className="absolute bottom-1 ph2 f6"><div className="tc mb2 f5">{title}</div>
             {overview.includes('.') ? overview.substring(0, overview.indexOf('.') + 1) : overview}
             </div>
        </div> 
      </div>
      </Link>
   )
} 