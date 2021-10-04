import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card } from "@mui/material";
import Form from "../components/Form";

export default function Register({ setUser }) {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e, passwordField, emailField) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/register", {
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
        return router.push("/select");
      }
      setError(user.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Trailer Hub | Sign In</title>
        <meta
          name="description"
          content="Sign in to get recommendations for movie trailers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form handleForm={handleRegister} signin={false} />
    </>
  );
}
