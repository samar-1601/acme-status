import { Block } from "baseui/block";
import { signIn } from "next-auth/react";
import { loginListItem, loginListView } from "../../styles/loginStyles";
import Head from "next/head";

const WelcomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Status App</title>
        <link rel="icon" href="/Status_icon.png" />
      </Head>
      <Block {...loginListView}>
        <Block {...loginListItem} onClick={() => signIn()}>
          Welcome to Status... Click to Sign in
        </Block>
      </Block>
    </>
  );
};

export default WelcomePage;
