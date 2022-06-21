import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { signIn } from "next-auth/react";
import {
  loginListItem,
  loginListView,
  loginProviderName,
} from "../styles/loginStyles";
import { createIncidentButton } from "../components/incidents/incidents-list-view/styles/navStyles";

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
