import Head from "next/head";

import Home from ".";

import "../global.css";

export default function Main() {
  return (
    <>
      <Head>
        <title>Search Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </>
  );
}
