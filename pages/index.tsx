import { Block } from "baseui/block";
import { Button } from "baseui/button";
import IncidentsHome from "../components/IncidentsHome";
import { signIn, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Button onClick={() => signIn()}>Sign In</Button>;
  }
  return (
    <Block
      overrides={{
        Block: {
          style: {
            backgroundColor: "#F8F8FA",
          },
        },
      }}
    >
      <IncidentsHome />
    </Block>
  );
};

export default Home;
