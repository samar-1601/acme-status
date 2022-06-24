// lib
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { PageSlot } from "../../components/PageSlot/PageSlot";
import { IncidentsViewHomePage } from "../../components/incidents/incidents-list-view/IncidentsHomePage";
import SideBar from "../../components/SideBar/SideBar";

// constants
import { SideBarMenu } from "../../constants";

// styles
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";

export default () => {
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
        <SideBar activeItemID={SideBarMenu.IncidentsView} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <IncidentsViewHomePage />
      </PageSlot.Slot>
    </PageSlot>
  );
};
