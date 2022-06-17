import Head from "next/head";
import { HomePage } from "./incidents/incidents-list-view/HomePage";

/**
 * Incidents List View Home
 * @returns the parent component returning the incident lists component
 */
const IncidentsHome = () => {
  return (
    <>
      <Head>
        <title>Incidents List</title>
      </Head>
      <HomePage />
    </>
  );
};

export default IncidentsHome;
