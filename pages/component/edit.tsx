import React, { Component } from "react";

import styles from "../../components/ComponentCreation/styles.module.css";
import { ComponentCreationForm } from "../../components/ComponentCreation/ComponentCreationForm";

import router, { useRouter } from "next/router";
import { PageSlot } from "../../components/PageSlot/PageSlot";
import SideBar from "../../components/SideBar/SideBar";
import { SideBarMenu } from "../../constants";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { useSession } from "next-auth/react";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";

const EditComponents = function () {
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
        <div className={styles.page}>
          <ComponentCreationForm id={router.query.id} />
        </div>
      </PageSlot.Slot>
    </PageSlot>
  );
};

export default EditComponents;
