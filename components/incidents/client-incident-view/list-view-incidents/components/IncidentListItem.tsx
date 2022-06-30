// components
import { Block } from "baseui/block";

// constants
import { PageType } from "../../../../../constants";

// helpers
import { formatDate } from "../helpers/formatDate";

// styles
import {
  ACTIVE_LIST_ITEM_OVERRIDES,
  ITEM_STATUS_OVERRIDES,
  ITEM_NAME_OVERRIDES,
} from "../overrides/fullIncidentsListStyles";

import {
  MAINTENANCE_LIST_ITEM_OVERRIDES,
  MAINTENANCE_ITEM_NAME_OVERRIDES,
  MAINTENANCE_ITEM_DATE_OVERRIDES,
  MAINTENANCE_ITEMHEADER_OVERRIDES,
  MAINTENANCE_ITEM_STATUS_BODY_OVERRIDES,
  MAINTENANCE_ITEM_STATUS_OVERRIDES,
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
        <Block overrides={MAINTENANCE_ITEM_STATUS_OVERRIDES}>
          {update["status"]}
        </Block>
        <Block overrides={MAINTENANCE_ITEM_STATUS_BODY_OVERRIDES}>
          {" "}
          - {update["body"]}{" "}
        </Block>
        <Block overrides={MAINTENANCE_ITEM_DATE_OVERRIDES}>
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
        <Block key={incident["id"]} overrides={MAINTENANCE_LIST_ITEM_OVERRIDES}>
          <Block overrides={MAINTENANCE_ITEMHEADER_OVERRIDES}>
            <Block overrides={MAINTENANCE_ITEM_NAME_OVERRIDES}>
              {incident["name"]}
            </Block>
            <Block overrides={MAINTENANCE_ITEM_DATE_OVERRIDES}>
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
        <Block key={incident["id"]} overrides={ACTIVE_LIST_ITEM_OVERRIDES}>
          <Block overrides={ITEM_NAME_OVERRIDES}>{incident["name"]}</Block>
          <Block overrides={ITEM_STATUS_OVERRIDES}>
            {renderIncidentUpdates}
          </Block>
        </Block>
      );
    default:
      return <Block>Invalid PageType</Block>;
  }
};
