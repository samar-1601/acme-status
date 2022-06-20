import { Block } from "baseui/block";
import IncidentsHome from "../components/IncidentsHome";

const Home = () => {
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
