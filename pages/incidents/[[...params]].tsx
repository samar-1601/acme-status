import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import IncidentCreation from "../../components/incidents/createIncidents/IncidentCreation";
import {
  mainStyle,
  errorPageStyle,
} from "../../components/incidents/createIncidents/styles/BlockStyles";
import { IncidentsViewHomePage } from "../../components/incidents/incidents-list-view/IncidentsHomePage";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";
import UpdateIncident from "../../components/incidents/updateIncidents/updateIncident";
import { PageSlot } from "../../components/PageSlot/PageSlot";
import SideBar from "../../components/SideBar/SideBar";
import { SideBarMenu } from "../../constants";

const IncidentsHomePage: React.FC<{
  isOpen: boolean;
  handleIsOpenChange: Function;
}> = (props) => {
  return (
    <PageSlot
      isOpen={props.isOpen}
      handleIsOpenChange={props.handleIsOpenChange}
    >
      <PageSlot.Slot name="leftNavBar">
        <SideBar activeItemID={SideBarMenu.IncidentsView} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <IncidentsViewHomePage />
      </PageSlot.Slot>
    </PageSlot>
  );
};

const CreateIncidentPage: React.FC<{
  isOpen: boolean;
  handleIsOpenChange: Function;
}> = (props) => {
  return (
    <PageSlot
      isOpen={props.isOpen}
      handleIsOpenChange={props.handleIsOpenChange}
    >
      <PageSlot.Slot name="leftNavBar">
        <SideBar activeItemID={SideBarMenu.CreateIncidents} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <IncidentCreation />
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

const UpdateIncidentPage: React.FC<{
  isOpen: boolean;
  handleIsOpenChange: Function;
}> = (props) => {
  const router = useRouter();
  console.log(router.asPath);
  let param = router.asPath.split("/")[3];

  return (
    <PageSlot
      isOpen={props.isOpen}
      handleIsOpenChange={props.handleIsOpenChange}
    >
      <PageSlot.Slot name="leftNavBar">
        <SideBar activeItemID={SideBarMenu.CreateIncidents} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <UpdateIncident incidentId={param} />
      </PageSlot.Slot>
    </PageSlot>
  );
};

export default () => {
  const [isOpen, setIsOpen] = useState(true);
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
  console.log("session", session);

  const handleIsOpenChange = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { params = [] } = router.query;
  if (params.length === 0) {
    return (
      <IncidentsHomePage
        isOpen={isOpen}
        handleIsOpenChange={handleIsOpenChange}
      />
    );
  } else if (params.length === 1 && params[0] == "new") {
    return (
      <CreateIncidentPage
        isOpen={isOpen}
        handleIsOpenChange={handleIsOpenChange}
      />
    );
  } else if (params.length === 2 && params[0] == "edit") {
    return (
      <UpdateIncidentPage
        isOpen={isOpen}
        handleIsOpenChange={handleIsOpenChange}
      />
    );
  } else {
    return <WrongUrlPage />;
  }
};
