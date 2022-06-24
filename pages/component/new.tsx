import React from "react";

import styles from "../../components/ComponentCreation/styles.module.css";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";

import { ComponentCreationForm } from "../../components/ComponentCreation/ComponentCreationForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { PageSlot } from "../../components/PageSlot/PageSlot";
import SideBar from "../../components/SideBar/SideBar";
import { SideBarMenu } from "../../constants";

const AddComponents: React.FC = () => {
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

export default AddComponents;
