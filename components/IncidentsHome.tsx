import Head from "next/head";
import { ClientsIncidentsListViewHome } from "./incidents/client-incident-view/ClientHomePage";

const IncidentsHome = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ClientsIncidentsListViewHome />
    </>
  );
};

export default IncidentsHome;
