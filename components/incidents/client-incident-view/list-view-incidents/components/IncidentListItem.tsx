// components
import { Block } from "baseui/block";

// constants
import { PageType } from "../../../../../constants";

// helpers
import { formatDate } from "../helpers/formatDate";

// styles
import {
  listItem,
  itemStatus,
  itemName,
} from "../overrides/fullIncidentsListStyles";

import {
  maintenanceListItem,
  maintenanceItemName,
  maintenanceItemDate,
  maintenanceItemHeaderWrapper,
  maintenanceItemStatusBody,
  maintenanceItemStatusStyle,
} from "../overrides/scheduledMaintenanceStyles";

interface Props {
  incident: any;
  pageType: string;
}
/**
 * list of data-items to display on screen
 * used inside Incidents List to render a data item fetched from an API
 * @param incident filtered JSON data from API
 * @param pageType the pageType for which wee need to format and render accordingly
 * @returns JSX component list
 */
export const IncidentListItem: React.FC<Props> = ({
  incident,
  pageType,
}): JSX.Element => {
  const incidentUpdates = incident["incident_updates"]; // stores the list of incident_updates for an incident
  let renderIncidentUpdates: JSX.Element[] = []; // JSX Elements list to store the formatted JSX list

  // loop through all the updates for the incident and add them to renderIncidentUpdates
  for (let i = 0; i < incidentUpdates.length; i++) {
    const update = incidentUpdates[i];
    const renderUpdate = (
      <Block
        overrides={{
          Block: {
            style: {
              paddingBottom: "20px",
            },
          },
        }}
        key={update["id"]}
      >
        <Block {...maintenanceItemStatusStyle}>{update["status"]}</Block>
        <Block {...maintenanceItemStatusBody}> - {update["body"]} </Block>
        <Block {...maintenanceItemDate}>
          {formatDate(update["updated_at"], PageType.All)}
        </Block>
      </Block>
    );
    renderIncidentUpdates.push(renderUpdate);
  }
  switch (pageType) {
    // If the pageType is Scheduled_Maintenance
    case PageType.Scheduled:
      // finally return the formatted list of updates along with the incident name & incident schedule timings
      return (
        <Block key={incident["id"]} {...maintenanceListItem}>
          <Block {...maintenanceItemHeaderWrapper}>
            <Block {...maintenanceItemName}>{incident["name"]}</Block>
            <Block {...maintenanceItemDate}>
              Scheduled for{" "}
              {formatDate(incident["scheduled_for"], PageType.All)} -{" "}
              {formatDate(incident["scheduled_until"], PageType.All)}
            </Block>
          </Block>
          {renderIncidentUpdates}
        </Block>
      );

    case PageType.Active:
      return (
        <Block key={incident["id"]} {...listItem}>
          <Block {...itemName}>{incident["name"]}</Block>
          <Block {...itemStatus}>{renderIncidentUpdates}</Block>
        </Block>
      );
    default:
      return <Block>Invalid PageType</Block>;
  }
};
