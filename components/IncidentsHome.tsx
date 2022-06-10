import Head from "next/head";
import { ClientsIncidentsListViewHeader } from "./incidents/client-incident-view/Header";

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
      <ClientsIncidentsListViewHeader />
    </>
  );
};

export default IncidentsHome;
