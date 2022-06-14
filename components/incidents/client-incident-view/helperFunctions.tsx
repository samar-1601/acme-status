// components
import { Block } from "baseui/block";

// constants
import { PageType } from "../../../constants";

// styles
import {
  listItem,
  itemStatus,
  itemDate,
  itemName,
} from "./styles/FullIncidentsList";

import {
  maintenanceListItem,
  maintenanceItemName,
  maintenanceItemDate,
  maintenanceItemHeaderWrapper,
  maintenanceItemStatusBody,
  maintenanceItemStatusStyle,
} from "./styles/maintenanceList";

// styles
import {
  pastIncidentNameStyle,
  pastIncidentHeaderDateStyle,
  pastIncidentDetailsWrapper,
  pastIncidentWrapper,
  pastIincidentStatusStyle,
  pastIncidentStatusBody,
  pastIncidentStatusDate,
} from "./styles/pastIncidentsStyles";

/**
 * Format date for display
 * @param date The date which needs to be formatted to display
 * @returns formatted data in x days ago format
 */
const formatDate = (date: string | Date, pageType: string): string => {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  date = new Date(date);

  // making h:m to hh:mm
  let timeHour: string = `${date.getUTCHours()}`;
  if (timeHour.length == 1) timeHour = `0${timeHour}`;
  let timeMins: string = `${date.getUTCMinutes()}`;
  if (timeMins.length == 1) timeMins = `0${timeMins}`;

  if (pageType == PageType.Scheduled)
    return `Posted on ${date.getUTCDate()} ${formatter.format(
      date
    )}, ${timeHour}:${timeMins} UTC`;

  return `${date.getUTCDate()} ${formatter.format(
    date
  )}, ${timeHour}:${timeMins} UTC`;
};


export const makePastIncidentComponents = (incidentList: any[]) => {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  var map = new Map();
  for (let i = 0; i < incidentList.length; i++) {
    const incident: any = incidentList[i];
    let date: string | Date = new Date(incident["updated_at"]);
    date = `${date.getUTCDate()} ${formatter.format(
      date
    )}, ${date.getUTCFullYear()}`;
    let previous = [];
    if (map.has(date)) previous = map.get(date);

    map.set(date, previous.concat(incident));
  }
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
 * @param data filtered JSON data from API
 * @returns JSX component list
 */
export const renderData: React.FC = (
  data: any,
  pageType: string
): JSX.Element => {
  if (pageType == PageType.Scheduled) {
    const incidentUpdates = data["incident_updates"];
    let renderIncidentUpdates: JSX.Element[] = [];
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
    return (
      <Block key={data["name"]} {...maintenanceListItem}>
        <Block {...maintenanceItemHeaderWrapper}>
          <Block {...maintenanceItemName}>{data["name"]}</Block>
          <Block {...maintenanceItemDate}>
            Scheduled for {formatDate(data["scheduled_for"], PageType.All)} -{" "}
            {formatDate(data["scheduled_until"], PageType.All)}
          </Block>
        </Block>
        {renderIncidentUpdates}
      </Block>
    );
  }

  return (
    <Block key={data["name"]} {...listItem}>
      <Block {...itemName}>{data["name"]}</Block>
      <Block {...itemStatus}>{data["status"]}</Block>
      <Block {...itemDate}>{formatDate(data["updated_at"], pageType)}</Block>
    </Block>
  );
};
