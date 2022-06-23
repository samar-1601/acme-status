import { Block } from "baseui/block";
import { useRouter } from "next/router";
import * as React from "react";
import UpdateIncident from "../../../components/incidents/updateIncidents/updateIncident";
import { useSession } from "next-auth/react";
import { hasListLoadedStyle } from "../../../components/incidents/incidents-list-view/styles/listStyles";
import { Spinner } from "baseui/spinner";
import { PageSlot } from "../../../components/PageSlot/PageSlot";
import SideBar from "../../../components/SideBar/SideBar";

export default () => {
  const router = useRouter();
  console.log(router.asPath);
  let param = router.asPath.split("/")[3];

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
        <SideBar />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <UpdateIncident incidentId={param} />
      </PageSlot.Slot>
    </PageSlot>
  );
};
