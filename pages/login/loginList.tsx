// lib
import { useSession, signIn } from "next-auth/react";
import router, { useRouter } from "next/router";

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
import { hasListLoadedStyle } from "../../components/incidents/list/overrides/listStyles";
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
  const { push, replace } = useRouter();

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

  const handleOAuthSignIn = (provider: any) => () => {
    signIn(provider);
    // const data = (await signIn(provider, {
    //   redirect: false,
    //   callback: "/",
    // })) ?? { url: "", query: "" };

    // replace(data["url"], "/", { shallow: true });

    // replace(data["url"].split("?")[0], "/", { shallow: true });

    // console.log(data["url"]);
    // signIn(provider, {
    //   redirect: false,
    //   callback: "/",
    // }).then(() => replace("/", "/", { shallow: true }));

    // const params = new URLSearchParams(data["query"]);
    // params.delete("state"); //"code", "scope", "authuser", "hd", "prompt");
    // params.delete("code");
    // params.delete("scope");
    // params.delete("authuser");
    // params.delete("hd");
    // params.delete("prompt");
    // const queryString = params.toString();
    // const path = `/${queryString ? `?${queryString}` : ""}`;

    // replace(path, "/", { scroll: false });
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
