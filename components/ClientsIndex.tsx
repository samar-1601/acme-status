import { Block } from "baseui/block";
import Head from "next/head";
import { PAGE_NAME } from "../constants";
import { ClientsHomePage } from "./incidents/client-incident-view/ClientHomePage";

const ClientsIndex = () => {
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
      <Block>
        <ClientsHomePage />
      </Block>
    </>
  );
};

export default ClientsIndex;
