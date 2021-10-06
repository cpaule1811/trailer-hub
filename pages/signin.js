import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Form from "../components/Form";
import { useUpdateUser } from '../hooks/UserContext'

export default function Signin({ setLoadComplete }) {
  const [error, setError] = useState("");
  const router = useRouter();
  const updateUser = useUpdateUser()

  const handleSignIn = async (e, passwordField, emailField) => {
    e.preventDefault();
    try {
      setLoadComplete(false);
      const resp = await fetch("/api/signin", {
        method: "POST",
        body: JSON.stringify({
          email: emailField,
          password: passwordField,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await resp.json();
      if (user.user_id) {
        const watchlistResp = await fetch(`/api/getwatchlist/${user.user_id}`)
        const watchlist = await watchlistResp.json()
        updateUser({ userId: user.user_id, isSignedIn: true, watchlist });
        return router.push("/");
      }
      setError(user.message);
      setLoadComplete(true);
    } catch (e) {
      setError(e);
      setLoadComplete(true);
    }
  };

  return (
    <>
      <Head>
        <title>Trailer Hub | Signin</title>
        <meta
          name="description"
          content="Register to get recommendations on movies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form signin={true} handleForm={handleSignIn} error={error}/>
    </>
  );
}
