import { Block } from "baseui/block";
import * as React from "react";
import IncidentCreation from "../../components/incidents/createIncidents/IncidentCreation";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";
import { Spinner } from "baseui/spinner";
import { PageSlot } from "../../components/PageSlot/PageSlot";
import SideBar from "../../components/SideBar/SideBar";
import { SideBarMenu } from "../../constants";

export default () => {
  const { push } = useRouter();
  const { data: session, status } = useSession({ // get user's session details
    required: true,
    onUnauthenticated: () => {
      // if user is unauthenticated take him to the login page
      push("/login/loginList");
    },
  });

  // if status not confirmed
  if (status == "loading") {
    return (
      <Block {...hasListLoadedStyle}>
        <Spinner />
      </Block>
    );
  }

  return (
    <PageSlot>
      <PageSlot.Slot name="leftNavBar">
        <SideBar activeItemID={SideBarMenu.CreateIncidents} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <IncidentCreation />
      </PageSlot.Slot>
    </PageSlot>
  );
};
