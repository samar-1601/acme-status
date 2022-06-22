import { Block } from "baseui/block";
import { signIn } from "next-auth/react";
import { loginListItem, loginListView } from "../login/loginStyles";

const WelcomePage: React.FC = () => {
  return (
    <Block {...loginListView}>
      <Block {...loginListItem} onClick={() => signIn()}>
        Welcome to Status... Click to Sign in
      </Block>
    </Block>
  );
};

export default WelcomePage;
