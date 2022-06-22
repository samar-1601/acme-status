import { Block } from "baseui/block";
import * as React from "react";
import IncidentCreation from "../../components/incidents/createIncidents/IncidentCreation";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";
import { Spinner } from "baseui/spinner";

export default () => {
  const { push } = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      push("/login/loginList");
    },
  });

  if (status == "loading") {
    return (
      <Block {...hasListLoadedStyle}>
        <Spinner />
      </Block>
    );
  }

  if (status != "authenticated")
    return <Block> You are unauthenticated. this is a protected page.</Block>;
  return (
    <Block>
      <IncidentCreation />
    </Block>
  );
};
