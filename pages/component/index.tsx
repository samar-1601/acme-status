import React from "react";
import { Header, NavigationBar } from "../../components/component/Component";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Block } from "baseui/block";
import styles from "../../components/component/styles.module.css";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";
import { Spinner } from "baseui/spinner";
import { PageSlot } from "../../components/PageSlot/PageSlot";
import SideBar from "../../components/SideBar/SideBar";
import { SideBarMenu } from "../../constants";

const components: React.FC = () => {
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
        <SideBar activeItemID={SideBarMenu.Components} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <div className={styles.page}>
          <Header />
          <NavigationBar />
        </div>
      </PageSlot.Slot>
    </PageSlot>
  );
};

export default components;
