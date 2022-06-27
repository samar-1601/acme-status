// components
import { Block } from "baseui/block";

// constants
import { PageType } from "../../../../constants";

// styles
import {
  listItem,
  itemStatus,
  itemName,
} from "../styles/fullIncidentsListStyles";

import {
  maintenanceListItem,
  maintenanceItemName,
  maintenanceItemDate,
  maintenanceItemHeaderWrapper,
  maintenanceItemStatusBody,
  maintenanceItemStatusStyle,
} from "../styles/scheduledMaintenanceList";

/**
 * Format date for display
 * @param date The date which needs to be formatted to display
 * @param pageType The type in which we need the formatted date
 * @returns formatted data in the required format
 */
export const formatDate = (
  date: string | Date,
  pageType: string = PageType.All
): string => {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  date = new Date(date);

  // making h:m to hh:mm
  let timeHour: string = `${date.getUTCHours()}`;
  if (timeHour.length == 1) timeHour = `0${timeHour}`;
  let timeMins: string = `${date.getUTCMinutes()}`;
  if (timeMins.length == 1) timeMins = `0${timeMins}`;

  // returns formatted date if "Scheduled" pageType
  if (pageType == PageType.Scheduled)
    return `Posted on ${date.getUTCDate()} ${formatter.format(
      date
    )}, ${timeHour}:${timeMins} UTC`;

  // return formatted date for "Completed" pageType
  if (pageType == PageType.Completed)
    return `${date.getUTCDate()} ${formatter.format(
      date
    )}, ${date.getUTCFullYear()}`;

  return `${date.getUTCDate()} ${formatter.format(
    date
  )}, ${timeHour}:${timeMins} UTC`;
};

/**
 * list of data-items to display on screen
 * used inside Incidents List to render a data item fetched from an API
 * @param incident filtered JSON data from API
 * @param pageType the pageType for which wee need to format and render accordingly
 * @returns JSX component list
 */
export const renderData: React.FC = (
  incident: any,
  pageType: string
): JSX.Element => {
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