// components
import { IncidentsList } from "./IncidentsList";
import { Block } from "baseui/block";

// constants
import { PageType } from "../../../constants";

// styles
import { incidentsListView, h1, h3 } from "./styles/container";

/**
 * IncidentsList View
 * triggers when / is accessed
 * @returns a custom made fixed navbar with menu items and infinite scrolling
 */
export const ClientsIncidentsListViewHeader: React.FC = () => {
  return (
    <Block {...incidentsListView}>
      <Block {...h1}> Client Incident List View </Block>
      <IncidentsList pageType={PageType.All} />
      <Block {...h3}> About This Site</Block>
      <Block {...h3}> Scheduled Maintenance</Block>
      <IncidentsList pageType={PageType.Scheduled} />
    </Block>
  );
};
