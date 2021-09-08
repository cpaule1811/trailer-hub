import Link from "next/link"
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Register({ setUser }) { 
   const [passwordField, setPasswordField] = useState("")
   const [emailField, setEmailField] = useState("")
   const [error, setError] = useState("")
   const router = useRouter()

   const handleRegister = async (e) => { 
    e.preventDefault()
    try {
       const resp = await fetch("/api/register", {
           method: "POST",
           body: JSON.stringify({
               email: emailField,
               password: passwordField
           }),
           headers: {
               'Content-Type': 'application/json'
           }
       })
       const user = await resp.json()
       if(user.user_id) {
           setUser({userId: user.user_id, isSignedIn: true})
           return router.push('/select')
       }
       setError(user.message)
    }
    catch(error) { 
       setError(error.message)
    }
   }

    return ( 
        <div className="flex justify-center signin-container items-center">
              <div className="signin-background dib w2 h-100 br3 tc pa3 shadow-2 pv5">
              <h1 className="f3 Turquoise mb4">Register</h1> 
              {error && <div className='red'>{error}</div>}
                <form>
                    <input 
                        onChange={(e) => setEmailField(e.target.value)}
                        type="email" 
                        className="w-80 h-25 mv2 br-pill pa2 bg-transparent ba"
                        placeholder="Email"
                        value={emailField}
                    />
                    <input 
                       onChange={(e) => setPasswordField(e.target.value)}
                       type="password" 
                       className="w-80 h-25 mv2 br-pill pa2 bg-transparent ba"
                       placeholder="Password"
                       value={passwordField}
                    /> 
                    <input 
                      onClick={(e) => handleRegister(e)}
                      type="submit"
                      value="SUBMIT"
                      className="w-40 mt4 content-box pa2 bg-turquoise br-pill b pointer f6 Dark-Blue"
                    />
                    <Link href="signin" passHref><p className="f6 underline-hover pointer ma1 Turquoise">Sign In</p></Link>
               </form>
               </div>
          </div>
    )
}