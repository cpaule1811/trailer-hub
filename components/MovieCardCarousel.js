import MovieCard from './MovieCard'
import Image from 'next/image'
import { useRef } from 'react'
import right from '../img/right.svg'
import left from '../img/left.svg'

export default function MovieCardCarousel({ genre, movies }) { 
    const contentWrapper = useRef(null);

    const sideScroll = (speed, distance, step) => {
        contentWrapper.current.scrollLeft += step;
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            contentWrapper.current.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
              clearInterval(slideTimer);
            }
          }, speed);
      };

    return (
        <div>
        <div className="Dark-Blue ml3 f3 b">{genre}</div>
        <div className="flex overflow-x-hidden touch-scroll" ref={contentWrapper}>
           <div onClick={() => sideScroll(5, window.innerWidth, -5)} className={`absolute left-1 mt6 pv4 pointer front grow-large o-40 glow touch-hide`}>
              <Image src={left} alt="left-arrow"/>
            </div>
           {movies.map((item) => <MovieCard key={item.id} movie={item}/>)}
           <div onClick={() => sideScroll(5, window.innerWidth, 5)} className="absolute right-1 mt6 pv4 pointer front grow-large o-40 glow touch-hide">
               <Image src={right} alt="right arrow"/>
            </div>
        </div>
        </div>
    )
} 
