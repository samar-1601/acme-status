// lib
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

// components and icons
import { BsGithub, BsGoogle } from "react-icons/bs";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";

// styles
import { loginListItem, loginListView, loginProviderName } from "./loginStyles";
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
    setTimeout(() => {
      push("/");
    }, 3000);

    return <Block>You are already Signed In !!</Block>;
  }

  const handleOAuthSignIn = (provider: any) => () => signIn(provider);

  return (
    <Block {...loginListView}>
      {providers.map(({ name, Icon }) => (
        <Block key={name} {...loginListItem}>
          <Icon size={32} color="grey">
            {Icon}
          </Icon>
          <Block
            {...loginProviderName}
            key={name}
            onClick={handleOAuthSignIn(name)}
          >
            Sign in with {name}
          </Block>
        </Block>
      ))}
    </Block>
  );
};

export default LoginProvidersList;
