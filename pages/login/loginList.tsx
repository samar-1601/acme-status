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
  loginPageDividerLine,
  loginPageHeaderName,
  loginPageWrapper,
  loginProviderName,
} from "../../styles/loginStyles";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";
import Image from "next/image";

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
        {"Checking authentication status ... "}
        <Spinner />
      </Block>
    );

  if (session) {
    push("/");
    console.log("already signed in");
  }

  const handleOAuthSignIn = (provider: any) => async () => {
    const data = (await signIn(provider, {
      redirect: false,
      callback: "/",
    })) ?? { url: "" };
    push(data["url"]);
  };

  return (
    <>
      <Head>
        <title>statusapp</title>
        <link rel="icon" href="/Status_icon.png" />
      </Head>
      <Block {...loginPageWrapper}>
        <Image
          src="/loginImage1.svg"
          height={550}
          width={550}
          alt="login page image"
        ></Image>
        <Block {...loginPageDividerLine}></Block>
        <Block {...loginListView}>
          <Block {...loginPageHeaderName}>
            One step away from <b>statusapp</b>
          </Block>
          {providers.map(({ name, Icon }) => (
            <Block
              key={name}
              {...loginListItem}
              onClick={handleOAuthSignIn(name)}
            >
              <Icon size={32} color="white">
                {Icon}
              </Icon>
              <Block {...loginProviderName} key={name}>
                Sign in with {name}
              </Block>
            </Block>
          ))}
        </Block>
      </Block>
    </>
  );
};

export default LoginProvidersList;
