import SearchBar from "./SearchBar"
import Link from "next/link"

export default function NavBar({ user, setUser }) {
    const {isSignedIn} = user
    return (
      <div className="ph3 nav-background justify-between flex pv2 shadow-3 w-100 nav-s">
      <Link href="/" passHref><div className="tc pointer">
        <div className="f2 Darker-Turquoise align-title">TRAILER</div>
        <div className="mexcellent light-gray" style = {{fontSize: '36px'}}>HUB</div>
      </div></Link>
       <SearchBar/>
       {
         !isSignedIn ?
          <div className="f6 f4-ns border-box pa3 font-color2">
            <Link href="/signin" passHref><div className= "tc pointer mb2 white grow underline-hover">Sign In</div></Link>
            <Link href="/register" passHref><div className= "tc pointer white grow underline-hover">Register</div></Link>
          </div>
          : <div onClick={() => setUser({ userId: null, isSignedIn: false })} className="f6 f4-ns pa3 font-color2 tc pointer mt2 white grow underline-hover">Sign Out</div>
       }
      </div>
    )
  }