import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import Layout from "../components/Layout";

import "../styles/reset.css";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>Walleye</title>
        <link rel="icon" href="/walleye.svg" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
