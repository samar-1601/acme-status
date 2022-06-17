import { Block } from "baseui/block";
import Head from "next/head";
import { ClientsHomePage } from "./incidents/client-incident-view/ClientHomePage";

const ClientsIndex = () => {
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
      <Block>
        <ClientsHomePage />
      </Block>
    </>
  );
};

export default ClientsIndex;
