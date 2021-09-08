import { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Signin({ setUser }) { 
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSignIn = async (e) => { 
         e.preventDefault()
         try {
            const resp = await fetch("/api/signin", {
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
                return router.push('/')
            }
            setError(user.message)
         }
         catch(e) { 
            setError(e)
         }
    }

    return ( 
        <>
        <Head>
              <title>Trailer Hub | Register</title>
              <meta name="description" content="Register to get recommendations on movies" />
              <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex justify-center signin-container items-center">
              <div className="signin-background dib w-25 h-50 br3 tc pa3 shadow-2 pv5">
              <h1 className="f3 Turquoise mb4">Sign In</h1> 
                <form className="">
                {error && <div className='red'>{error}</div>}
                    <input 
                        onChange = {(e) => setEmailField(e.target.value)}
                        type="email" 
                        className="w-80 h-25 mv2 br-pill pa2 bg-transparent ba"
                        placeholder="Email"
                        value={emailField}
                    />
                    <input 
                       onChange = {(e) => setPasswordField(e.target.value)}
                       type="password" 
                       className="w-80 h-25 mv2 br-pill pa2 bg-transparent ba"
                       placeholder="Password"
                       value={passwordField}
                    /> 
                    <input 
                      onClick={(e) => handleSignIn(e)}
                      type="submit"
                      value="SUBMIT"
                      className="w-40 mt4 content-box pa2 bg-turquoise br-pill b pointer f6 Dark-Blue"
                    />
                    <Link href="register" passHref><p className="f6 underline-hover pointer ma1 Turquoise">Register</p></Link>
               </form>
               </div>
        </div>
        </>
    )
}