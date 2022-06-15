// components
import { IncidentsList } from "./IncidentsList";
import { Block } from "baseui/block";
import { AboutThisSite } from "./AboutThisSite";
import { PastIncidents } from "./PastIncidents";

// constants
import { PageType } from "../../../constants";

// styles
import { incidentsListView, h1, h3 } from "./styles/containerStyles";

/**
 * IncidentsList View
 * triggers when / is accessed
 * @returns a custom made fixed navbar with menu items and infinite scrolling
 */
export const ClientsIncidentsListViewHome: React.FC = () => {
  return (
    <Block {...incidentsListView}>
      <Block {...h1}> Client Incident List View </Block>
      <IncidentsList pageType={PageType.Active} />
      <Block {...h3}> About This Site</Block>
      <AboutThisSite />
      <Block {...h3}> Scheduled Maintenance</Block>
      <IncidentsList pageType={PageType.Scheduled} />
      <Block {...h3}> Past Incidents</Block>
      <PastIncidents/>
    </Block>
  );
};
