import type { NextPage } from 'next'
import Head from 'next/head'
import { IncidentsListView } from "../components/incidents/Header";

const Home: NextPage = () => {
  return (
    <>
    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap" rel="stylesheet"/>
    </Head>
    <IncidentsListView/>
    </>
  )
}

export default Home
