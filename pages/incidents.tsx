import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";

import { hasListLoadedStyle } from "../components/incidents/incidents-list-view/styles/listStyles";
import { PageSlot } from "../components/PageSlot/PageSlot";
import SideBar from "../components/SideBar/SideBar";
import { SideBarMenu } from "../constants";
import { IncidentsViewHomePage } from "../components/incidents/incidents-list-view/IncidentsHomePage";

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
