import React, { Component } from "react";

import styles from "../../components/ComponentCreation/styles.module.css";
import { ComponentCreationForm } from "../../components/ComponentCreation/ComponentCreationForm";

import { useRouter } from "next/router";
import { PageSlot } from "../../components/PageSlot/PageSlot";
import SideBar from "../../components/SideBar/SideBar";

const EditComponents = function () {
  const router = useRouter();

  return (
    <PageSlot>
      <PageSlot.Slot name="leftNavBar">
      <SideBar activeItemID={2} />
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
