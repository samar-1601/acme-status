// lib
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

// components and icons
import { BsGithub, BsGoogle } from "react-icons/bs";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import Head from "next/head";

// styles
import {
  loginListItem,
  loginListView,
  loginProviderName,
} from "../../styles/loginStyles";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";

/**
 * store the list of providers with their respective icons
 */
const providers = [
  {
    name: "github",
    Icon: BsGithub,
  },
  {
    name: "google",
    Icon: BsGoogle,
  },
];

const LoginProvidersList: React.FC = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  console.log(session);
  if (status === "loading")
    return (
      <Block {...hasListLoadedStyle}>
        Checking Authentication Status... <Spinner />
      </Block>
    );

  if (session) {
    push("/");
    console.log("already signed in");
  }

  const handleOAuthSignIn = (provider: any) => () => signIn(provider);

  return (
    <>
      <Head>
        <title>Status App</title>
        <link rel="icon" href="/Status_icon.png" />
      </Head>
      <Block {...loginListView}>
        {providers.map(({ name, Icon }) => (
          <Block
            key={name}
            {...loginListItem}
            onClick={handleOAuthSignIn(name)}
          >
            <Icon size={32} color="grey">
              {Icon}
            </Icon>
            <Block {...loginProviderName} key={name}>
              Sign in with {name}
            </Block>
          </Block>
        ))}
      </Block>
    </>
  );
};

export default LoginProvidersList;
