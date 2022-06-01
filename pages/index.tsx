import type { NextPage } from 'next'
import { IncidentsList } from './incident_list'
import Head from 'next/head'
const Home: NextPage = () => {
  return (
    <>
    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap" rel="stylesheet"/>
    </Head>
    <div>
      <IncidentsList/>
    </div>
    </>
  )
}

export default Home
