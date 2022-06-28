// lib
import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// components
import { PageSlot } from "../../components/pageSlot/PageSlot";
import FullSideBar from "../../components/leftPageSlot/fullSideBar/FullSideBar";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";

// styles
import {
  mainStyle,
  errorPageStyle,
} from "../../components/incidents/internal/form/styles/BlockStyles";
import { hasListLoadedStyle } from "../../components/incidents/list/overrides/listStyles";

// constants
import { SideBarMenu } from "../../constants";
import EditComponent from "../../components/components/editComponents/EditComponents";
import { ComponentCreation } from "../../components/components/createComponents/CreateComponents";
import { ComponentsViewHomePage } from "../../components/components/componentsListView/ComponentsViewHomePage";

const AddComponents: React.FC = (props) => {
  return <ComponentCreation />;
};

const Components: React.FC = (props) => {
  return <ComponentsViewHomePage />;
};

const EditComponents: React.FC = function (props) {
  const router = useRouter();
  console.log(router.asPath);
  let param = router.asPath.split("/")[3];

  return <EditComponent componentId={param} />;
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

  useEffect(() => {
    if (session && !localStorage.getItem("isSideBarOpen"))
      localStorage.setItem("isSideBarOpen", "true");
  }, []);
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
  let content: React.ReactElement = <></>;
  const { params = [] } = router.query;
  if (params.length === 0) {
    content = <Components />;
  } else if (params.length === 1 && params[0] == "new") {
    content = <AddComponents />;
  } else if (params.length === 2 && params[0] == "edit") {
    content = <EditComponents />;
  } else {
    content = <WrongUrlPage />;
  }

  return (
    <PageSlot activeMenuItem={SideBarMenu.Components}>
      <PageSlot.Slot name="rightContent">{content}</PageSlot.Slot>
    </PageSlot>
  );
};
