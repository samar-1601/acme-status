import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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

const IncidentsHomePage = () => {
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
        <SideBar activeItemID={SideBarMenu.IncidentsView} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <IncidentsViewHomePage />
      </PageSlot.Slot>
    </PageSlot>
  );
};

const CreateIncidentPage = () => {
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

const UpdateIncidentPage = () => {
  const router = useRouter();
  console.log(router.asPath);
  let param = router.asPath.split("/")[3];

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
        <SideBar activeItemID={SideBarMenu.CreateIncidents} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <UpdateIncident incidentId={param} />
      </PageSlot.Slot>
    </PageSlot>
  );
};

export default () => {
  const router = useRouter();
  const { params = [] } = router.query;
  if (params.length === 0) {
    return <IncidentsHomePage />;
  } else if (params.length === 1 && params[0] == "new") {
    return <CreateIncidentPage />;
  } else if (params.length === 2 && params[0] == "edit") {
    return <UpdateIncidentPage />;
  } else {
    return <WrongUrlPage />;
  }
};
