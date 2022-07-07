// components
import { IncidentsList } from "./list-view-incidents/components/IncidentsList";
import { Block } from "baseui/block";
import { AboutThisSite } from "./about-this-page/components/AboutPageHome";
import { PastIncidents } from "./past-incidents-component/components/PastIncidents";

// constants
import { PageType, PAGE_NAME } from "../../../constants";

// styles
import {
  PAGE_CONTAINER_OVERRIDES,
  H1_OVERRIDES,
  H3_OVERRIDES,
  CLIENTS_COMMON_COMPONENTS_WRAPPER_OVERRIDES,
  HOME_PAGE_HEADER_OVERRIDES,
} from "./styles/containerStyles";

/**
 * Client Page View
 * triggers when / is accessed
 * @returns various components placed columnwise
 */
export const ClientsHomePage: React.FC = () => {
  return (
    <Block overrides={PAGE_CONTAINER_OVERRIDES}>
      <Block overrides={HOME_PAGE_HEADER_OVERRIDES}>{PAGE_NAME}</Block>
      {/* <Block overrides={CLIENTS_COMMON_COMPONENTS_WRAPPER_OVERRIDES}>
        <Block overrides={H1_OVERRIDES}> Active Incidents </Block>
        <IncidentsList pageType={PageType.Active} />
      </Block> */}
      {/* <Block overrides={CLIENTS_COMMON_COMPONENTS_WRAPPER_OVERRIDES}>
        <Block overrides={H3_OVERRIDES}> Scheduled Maintenance</Block>
        <IncidentsList pageType={PageType.Scheduled} />
      </Block> */}
      <Block overrides={CLIENTS_COMMON_COMPONENTS_WRAPPER_OVERRIDES}>
        <Block overrides={H3_OVERRIDES}> About This Site</Block>
        <AboutThisSite />
      </Block>
      {/* <Block overrides={CLIENTS_COMMON_COMPONENTS_WRAPPER_OVERRIDES}>
        <Block overrides={H3_OVERRIDES}> Past Incidents</Block>
        <PastIncidents />
      </Block> */}
    </Block>
  );
};
