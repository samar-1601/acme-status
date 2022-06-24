// lib
import Head from "next/head";

// components
import { ClientsHomePage } from "../components/incidents/client-incident-view/ClientHomePage";

// constants
import { PAGE_NAME } from "../constants";

const Home = () => {
  return (
    <>
      <Head>
        <title>{PAGE_NAME} Status</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/titleIcon.png" />
      </Head>
      <ClientsHomePage />
    </>
  );
};

export default Home;
