// lib
import React, { useState } from "react";
import router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// components
import { PageSlot } from "../../components/pageSlot/PageSlot";
import SideBar from "../../components/sideBar/SideBar";
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
import EditComponent from "../../components/incidentError/components/editComponents/EditComponents";
import { ComponentCreation } from "../../components/incidentError/components/createComponents/CreateComponents";
import { ComponentsViewHomePage } from "../../components/incidentError/components/componentsListView/ComponentsViewHomePage";

const AddComponents: React.FC<{
  isOpen: boolean;
  handleIsOpenChange: Function;
}> = (props) => {
  return (
    <PageSlot
      isOpen={props.isOpen}
      handleIsOpenChange={props.handleIsOpenChange}
    >
      <PageSlot.Slot name="leftNavBar">
        <SideBar activeItemID={SideBarMenu.Components} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <ComponentCreation />
      </PageSlot.Slot>
    </PageSlot>
  );
};

const Components: React.FC<{
  isOpen: boolean;
  handleIsOpenChange: Function;
}> = (props) => {
  return (
    <PageSlot
      isOpen={props.isOpen}
      handleIsOpenChange={props.handleIsOpenChange}
    >
      <PageSlot.Slot name="leftNavBar">
        <SideBar activeItemID={SideBarMenu.Components} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <ComponentsViewHomePage />
      </PageSlot.Slot>
    </PageSlot>
  );
};

const EditComponents: React.FC<{
  isOpen: boolean;
  handleIsOpenChange: Function;
}> = function (props) {
  const router = useRouter();
  console.log(router.asPath);
  let param = router.asPath.split("/")[3];

  return (
    <PageSlot
      isOpen={props.isOpen}
      handleIsOpenChange={props.handleIsOpenChange}
    >
      <PageSlot.Slot name="leftNavBar">
        <SideBar activeItemID={SideBarMenu.Components} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <EditComponent componentId={param} />
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
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpenChange = () => {
    setIsOpen((prevState) => !prevState);
  };
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
    return (
      <Components isOpen={isOpen} handleIsOpenChange={handleIsOpenChange} />
    );
  } else if (params.length === 1 && params[0] == "new") {
    return (
      <AddComponents isOpen={isOpen} handleIsOpenChange={handleIsOpenChange} />
    );
  } else if (params.length === 2 && params[0] == "edit") {
    return (
      <EditComponents isOpen={isOpen} handleIsOpenChange={handleIsOpenChange} />
    );
  } else {
    return <WrongUrlPage />;
  }
};
