// components
import { Block } from "baseui/block";
import { format } from "path";

// constants
import { PageType } from "../../../constants";

// styles
import {
  listItem,
  itemStatus,
  itemDate,
  itemName,
} from "./styles/fullIncidentsListStyles";

import {
  maintenanceListItem,
  maintenanceItemName,
  maintenanceItemDate,
  maintenanceItemHeaderWrapper,
  maintenanceItemStatusBody,
  maintenanceItemStatusStyle,
} from "./styles/scheduledMaintenanceList";

import {
  pastIncidentNameStyle,
  pastIncidentHeaderDateStyle,
  pastIncidentDetailsWrapper,
  pastIncidentWrapper,
  pastIincidentStatusStyle,
  pastIncidentStatusBody,
  pastIncidentStatusDate,
} from "./pastIncidentsStyles";

/**
 * Format date for display
 * @param date The date which needs to be formatted to display
 * @param pageType The type in which we need the formatted date
 * @returns formatted data in x days ago format
 */
export const formatDate = (date: string | Date, pageType: string): string => {
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
  if (pageType == PageType.Completed)
    return `${date.getUTCDate()} ${formatter.format(date)}, ${date.getUTCFullYear()}`;

  return `${date.getUTCDate()} ${formatter.format(
    date
  )}, ${timeHour}:${timeMins} UTC`;
};

function formattedDateInSlashFormat(d = new Date) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day}/${month}/${year}`;
}

/**
 * Helper function for PastIncidents List component
 * @param incidentList the past/completed Incidents List
 * @returns Formatted List of past/completed incidents grouped on basis of resolved dates for the PastIncidents.tsx page
 */
export const GetPastIncidentComponents = (incidentList: any[]) => {
  var map = new Map();
  for (let i = 0; i < incidentList.length; i++) {
    const incident: any = incidentList[i];
    const date: string | Date = formattedDateInSlashFormat(
      new Date(incident["updated_at"])
    );
    let previous = [];
    if (map.has(date)) previous = map.get(date);

    map.set(date, previous.concat(incident));
  }
  map = new Map([...map].sort().reverse());
  
  console.log("map", map);
  let renderList: JSX.Element[] = [];
  map.forEach(function (value, key) {
    const headerDate = key;
    const incidents = value;
    let incidentsForDate = [];
    for (const incident of incidents) {
      const incidentName = incident["name"];
      const incidentUpdates = incident["incident_updates"];
      let renderIncidentUpdates: JSX.Element[] = [];
      for (let i = 0; i < incidentUpdates.length; i++) {
        const update = incidentUpdates[i];
        const renderUpdate = (
          <Block key={update["id"]} {...pastIncidentDetailsWrapper}>
            <Block {...pastIincidentStatusStyle}>{update["status"]}</Block>
            <Block {...pastIncidentStatusBody}> - {update["body"]} </Block>
            <Block {...pastIncidentStatusDate}>
              {formatDate(update["updated_at"], PageType.All)}
            </Block>
          </Block>
        );
        renderIncidentUpdates.push(renderUpdate);
      }
      incidentsForDate.push(
        <Block key={incident["id"]} {...pastIncidentWrapper}>
          <Block {...pastIncidentNameStyle}> {incidentName}</Block>
          <Block>{renderIncidentUpdates}</Block>
        </Block>
      );
    }
    renderList.push(
      <Block key={key}>
        <Block {...pastIncidentHeaderDateStyle}>{headerDate}</Block>
        <Block>{incidentsForDate}</Block>
      </Block>
    );
  });

  return renderList;
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
  switch (pageType) {
    // If the pageType is Scheduled_Maintenance then we need to reender the Incident Updates and
    // their respective statuses as well
    case PageType.Scheduled:
      const incidentUpdates = incident["incident_updates"]; // stores the list of incident_updates for an incident
      let renderIncidentUpdates: JSX.Element[] = []; // JSX Elements list to store the formatted JSX list

      // loop through all the updates and add them to renderIncidentUpdates
      for (let i = 0; i < incidentUpdates.length; i++) {
        const update = incidentUpdates[i];
        const renderUpdate = (
          <Block key={update["id"]}>
            <Block {...maintenanceItemStatusStyle}>{update["status"]}</Block>
            <Block {...maintenanceItemStatusBody}> - {update["body"]} </Block>
            <Block {...maintenanceItemDate}>
              {formatDate(update["updated_at"], PageType.All)}
            </Block>
          </Block>
        );
        renderIncidentUpdates.push(renderUpdate);
      }

      // finally return the formatted list of updates along with the incident name & incident schedule timings
      return (
        <Block key={incident["name"]} {...maintenanceListItem}>
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
        <Block key={incident["name"]} {...listItem}>
          <Block {...itemName}>{incident["name"]}</Block>
          <Block {...itemStatus}>{incident["status"]}</Block>
          <Block {...itemDate}>
            {formatDate(incident["updated_at"], pageType)}
          </Block>
        </Block>
      );
    default:
      return <Block>Invalid PageType</Block>;
  }
};
