import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IncidentCreation from "../../components/incidents/createIncidents/IncidentCreation";
import {
  mainStyle,
  errorPageStyle,
} from "../../components/incidents/internal/form/overrides/BlockStyles";
import { IncidentsViewHomePage } from "../../components/incidents/list/IncidentsHomePage";
import { LOADER_OVERRIDES } from "../../components/incidents/list/overrides/listStyles";
import UpdateIncident from "../../components/incidents/updateIncidents/UpdateIncidents";
import { PageSlot } from "../../components/pageSlot/PageSlot";
import { SideBarMenu } from "../../constants";

const IncidentsHomePage: React.FC = (props) => {
  return <IncidentsViewHomePage />;
};

const CreateIncidentPage: React.FC = (props) => {
  return <IncidentCreation />;
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

const UpdateIncidentPage: React.FC = (props) => {
  const router = useRouter();
  console.log(router.asPath);
  let param = router.asPath.split("/")[3];

  return <UpdateIncident incidentId={param} />;
};

export default () => {
  useEffect(() => {
    if (session && !localStorage.getItem("isSideBarOpen"))
      localStorage.setItem("isSideBarOpen", "true");
  }, []);
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
      <Block overrides={LOADER_OVERRIDES}>
        <Spinner />
      </Block>
    );
  }
  console.log("session", session);
  let content: React.ReactElement = <></>;

  const { params = [] } = router.query;
  if (params.length === 0) {
    content = <IncidentsHomePage />;
  } else if (params.length === 1 && params[0] == "new") {
    content = <CreateIncidentPage />;
  } else if (params.length === 2 && params[0] == "edit") {
    content = <UpdateIncidentPage />;
  } else {
    content = <WrongUrlPage />;
  }

  return (
    <PageSlot activeMenuItem={SideBarMenu.IncidentsView}>
      <PageSlot.Slot name="rightContent">{content}</PageSlot.Slot>
    </PageSlot>
  );
};
