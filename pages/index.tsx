import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { hasListLoadedStyle } from "../components/incidents/incidents-list-view/styles/listStyles";
import IncidentsHome from "../components/IncidentsHome";
import { useSession } from "next-auth/react";
import LoginPage from "./WelcomePage";

const Home = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <Block {...hasListLoadedStyle}>
        <Spinner />
      </Block>
    );
  }
  if (!session) {
    return <LoginPage />;
  }
  return (
      <IncidentsHome />
  );
};

export default Home;
