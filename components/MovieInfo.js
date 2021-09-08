import Image from 'next/image'

export default function MovieInfo({ poster_path, title, overview, release_date, casts, runtime }) { 
    const url= `https://image.tmdb.org/t/p/w300${poster_path}`
    const { cast } = casts
    return ( 
        <div className=" shadow-5 vh-100 info nav-background font-color absolute w-20 side-info-dimensions">
                <Image key="id" src={url} width={320} height={480} alt={`${title} poster`}/>
                <div className="pa3">
                    <div className="f4 b">{title}</div>
                    <div className="mt3 f5">Release: {release_date}</div>
                    <div className=" f5">Run time: {runtime}min</div>
                    <div className="f5">Cast: {`${cast[0].name}, ${cast[1].name} & ${cast[2].name}`}</div>
                    {/* <div >{vote_average}</div> */}
                    <div className="mv2 f6">{overview}</div>
                </div>
        </div>
    )
}