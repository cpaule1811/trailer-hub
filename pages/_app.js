import NavBar from '../components/Navbar';
import { useState } from 'react'
import 'tachyons';
import '../styles/globals.css';
import '../styles/media.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ 
    isSignedIn: false,
    userId: null
  })
  return (
    <div>
      <div className="background back fixed w-100"></div>
      <NavBar user={user} setUser={setUser}/>
      <Component {...pageProps} user={user} setUser={setUser}/>
     </div>
  )
}

export default MyApp
