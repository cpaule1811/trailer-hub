import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Form from "../components/Form";

export default function Signin({ setUser, setLoadComplete }) {
  const [error, setError] = useState("");
  const router = useRouter();

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
        setUser({ userId: user.user_id, isSignedIn: true });
        return router.push("/");
      }
      setError(user.message);
    } catch (e) {
      setLoadComplete(true);
      setError(e);
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
      <Form signin={true} handleForm={handleSignIn} />
    </>
  );
}
