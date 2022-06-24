import { Block } from "baseui/block";
import { useRouter } from "next/router";
import * as React from "react";
import UpdateIncident from "../../../components/incidents/updateIncidents/updateIncident";
import { useSession } from "next-auth/react";
import { hasListLoadedStyle } from "../../../components/incidents/incidents-list-view/styles/listStyles";
import { Spinner } from "baseui/spinner";
import { PageSlot } from "../../../components/PageSlot/PageSlot";
import SideBar from "../../../components/SideBar/SideBar";
import { SideBarMenu } from "../../../constants";

export default () => {
  const router = useRouter();
  console.log(router.asPath);
  let param = router.asPath.split("/")[3];

  const { push } = useRouter();
  const { data: session, status } = useSession({
    // get user's session details
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
        <UpdateIncident incidentId={param} />
      </PageSlot.Slot>
    </PageSlot>
  );
};
