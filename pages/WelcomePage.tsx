import { Block } from "baseui/block";
import { signIn } from "next-auth/react";
import {
  loginListItem,
  loginListView,
} from "../styles/loginStyles";

const LoginPage: React.FC = () => {
  return (
    <Block {...loginListView}>
      <Block {...loginListItem} onClick={() => signIn()}>
        Welcome to Incidents List View... Click to Sign in
      </Block>
    </Block>
  );
};

export default LoginPage;
