import { useState } from "react";
import { useRouter } from "next/router";
import { useUpdateUser } from "../components/UserContext";
import Head from "next/head";
import Form from "../components/Form";

export default function Register() {
  const [error, setError] = useState("");
  const router = useRouter();
  const updateUser = useUpdateUser();

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
        updateUser({ userId: user.user_id, isSignedIn: true });
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
