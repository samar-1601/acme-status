import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { Block } from "baseui/block";
import { loginListItem, loginListView, loginProviderName } from "../styles/loginStyles";

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
  if (status === "loading") return <Block>Checking Authentication...</Block>;

  if (session) {
    setTimeout(() => {
      push("/");
    }, 3000);

    return <Block>You are already Signed In !!</Block>;
  }

  const handleOAuthSignIn = (provider: any) => () => signIn(provider);

  return (
    <Block {...loginListView}
    >
      {providers.map(({ name, Icon }) => (
        <Block {...loginListItem}>
          <Icon size={32} color="grey">
            {Icon}
          </Icon>
          <Block {...loginProviderName} key={name} onClick={handleOAuthSignIn(name)}>
            Sign in with {name}
          </Block>
        </Block>
      ))}
    </Block>
  );
};

export default LoginProvidersList;
