import Image from "next/image"
import play from "../img/play.svg"

export default function TrailerCard({name, ytKey, setVideoIndex, index}) { 
    const url = `https://img.youtube.com/vi/${ytKey}/0.jpg`
    return ( 
        <div className="relative hide-child h-75 mh1">
            <Image src={url} width={250} height={200} alt={name}/>
            <div className="absolute top-0 child bg-custom-black w-100"></div>
            <div className="absolute top-0 child white pa1 f6">{name}</div>
            <div className="flex pointer absolute top-0 w-100 h-100 justify-center grow">
                <Image onClick={() => setVideoIndex(index)} src={play} alt={name}/>
            </div>
        </div>
        )
}