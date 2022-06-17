// components
import { IncidentsList } from "./list-view-incidents/IncidentsList";
import { Block } from "baseui/block";
import { AboutThisSite } from "./about-this-page/AboutThisSite";
import { PastIncidents } from "./past-incidents-component/PastIncidents";

// constants
import { PageType, PAGE_NAME } from "../../../constants";

// styles
import {
  pageContainer,
  h1,
  h3,
  clientsCommonComponentsWrapper,
  homepageHeader,
} from "./styles/containerStyles";

/**
 * Client Page View
 * triggers when / is accessed
 * @returns various components placed columnwise
 */
export const ClientsHomePage: React.FC = () => {
  return (
    <Block {...pageContainer}>
      <Block {...homepageHeader}>{PAGE_NAME}</Block>
      <Block {...clientsCommonComponentsWrapper}>
        <Block {...h1}> Active Incidents </Block>
        <IncidentsList pageType={PageType.Active} />
      </Block>
      <Block {...clientsCommonComponentsWrapper}>
        <Block {...h3}> Scheduled Maintenance</Block>
        <IncidentsList pageType={PageType.Scheduled} />
      </Block>
      <Block {...clientsCommonComponentsWrapper}>
        <Block {...h3}> About This Site</Block>
        <AboutThisSite />
      </Block>
      <Block {...clientsCommonComponentsWrapper}>
        <Block {...h3}> Past Incidents</Block>
        <PastIncidents />
      </Block>
    </Block>
  );
};
