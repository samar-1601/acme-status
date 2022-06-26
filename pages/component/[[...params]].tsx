// lib
import React from "react";
import router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// components
import { PageSlot } from "../../components/PageSlot/PageSlot";
import SideBar from "../../components/SideBar/SideBar";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { Header, NavigationBar } from "../../components/component/Component";

// styles
import styles from "../../components/ComponentCreation/styles.module.css";
import {
  mainStyle,
  errorPageStyle,
} from "../../components/incidents/createIncidents/styles/BlockStyles";
import { ComponentCreationForm } from "../../components/ComponentCreation/ComponentCreationForm";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";

// constants
import { SideBarMenu } from "../../constants";

const AddComponents: React.FC = () => {
  return (
    <PageSlot>
      <PageSlot.Slot name="leftNavBar">
        <SideBar activeItemID={SideBarMenu.Components} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <Block className={styles.page}>
          <ComponentCreationForm id="" />
        </Block>
      </PageSlot.Slot>
    </PageSlot>
  );
};

const Components: React.FC = () => {
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

const EditComponents = function () {
  return (
    <PageSlot>
      <PageSlot.Slot name="leftNavBar">
        <SideBar activeItemID={SideBarMenu.Components} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <div className={styles.page}>
          <ComponentCreationForm id={router.query.id} />
        </div>
      </PageSlot.Slot>
    </PageSlot>
  );
};

const WrongUrlPage = () => {
  return (
    <Block {...mainStyle}>
      <Block {...errorPageStyle}>
        <h1 className="header">
          Sorry the Page you requested for is not available!!!
        </h1>
        <Block></Block>
      </Block>
    </Block>
  );
};

export default () => {
  const router = useRouter();

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
  const { params = [] } = router.query;
  if (params.length === 0) {
    return <Components />;
  } else if (params.length === 1 && params[0] == "new") {
    return <AddComponents />;
  } else if (params.length === 1 && params[0] == "edit") {
    return <EditComponents />;
  } else {
    return <WrongUrlPage />;
  }
};