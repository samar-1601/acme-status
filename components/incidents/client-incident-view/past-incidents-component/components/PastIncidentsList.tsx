// lib
import * as React from "react";

// components
import { Block } from "baseui/block";

// helpers
import { formatDate } from "../../list-view-incidents/helpers/formatDate";
import { formattedDateInSlashFormat } from "../helpers/formatDateInSlashFormat";

// styles
import {
  PAST_INCIDENT_DETAILS_WRAPPER_OVERRIDES,
  PAST_INCIDENT_STATUS_OVERRIDES,
  PAST_INCIDENT_STATUS_BODY_OVERRIDES,
  PAST_INCIDENT_STATUS_DATE_OVERRIDES,
  PAST_INCIDENT_WRAPPER_OVERRIDES,
  PAST_INCIDENT_NAME_OVERRIDES,
  PAST_INCIDENT_HOVER_OVERRIDES,
} from "../overrides/pastIncidentsStyles";
import { getComponentStatusText, PageType } from "../../../../../constants";
import { getGroupedIncidentsUpdatedOnSameDate } from "../helpers/getGroupsofIncidents";

interface Props {
  incidentList: any;
}

const renderIncidentsForDate = (incidents: any) => {
  let incidentsForDate = [];

  // iterate through incidents for a day and format them with required styling
  for (const incident of incidents) {
    const incidentName = incident["name"];
    const incidentUpdates = incident["incident_updates"];
    let renderIncidentUpdates: JSX.Element[] = [];

    // iterate through an incidents' updates and style them
    for (let i = 0; i < incidentUpdates.length; i++) {
      const update = incidentUpdates[i];
      const renderUpdate = (
        <Block
          key={update["id"]}
          overrides={PAST_INCIDENT_DETAILS_WRAPPER_OVERRIDES}
        >
          <Block overrides={PAST_INCIDENT_STATUS_OVERRIDES}>
            {getComponentStatusText(update["status"])}
          </Block>
          <Block overrides={PAST_INCIDENT_STATUS_BODY_OVERRIDES}>
            {" "}
            - {update["body"]}{" "}
          </Block>
          <Block overrides={PAST_INCIDENT_STATUS_DATE_OVERRIDES}>
            {formatDate(update["updated_at"])}
          </Block>
        </Block>
      );
      renderIncidentUpdates.push(renderUpdate); // push all updates together in a list
    }
    // push all incidents with their updates together
    incidentsForDate.push(
      <Block key={incident["id"]} overrides={PAST_INCIDENT_WRAPPER_OVERRIDES}>
        <Block overrides={PAST_INCIDENT_NAME_OVERRIDES}>{incidentName}</Block>
        <Block>{renderIncidentUpdates}</Block>
      </Block>
    );
  }
  return incidentsForDate;
};

/**
 * Helper function for PastIncidents List component
 * @param incidentList the past/completed Incidents List
 * @returns Formatted List of past/completed incidents grouped on basis of resolved dates for the PastIncidents.tsx page
 */
export const PastIncidentsList: React.FC<Props> = React.memo(
  ({ incidentList }) => {
    let map = new Map(); // map to store all incident updates for the same day together (date is used as key)
    map = getGroupedIncidentsUpdatedOnSameDate(incidentList);

    let renderList: JSX.Element[] = []; // list to store formatted data

    // iterate through each date and format the related incidents with required styling
    map.forEach(function (incidents, key) {
      let date = key.split("/");

      // month is 0-based, that's why we need dataParts[1] - 1
      var dateObject = new Date(
        date[2] + "/" + date[1] + "/" + String(Number(date[0]) + 1)
      );
      const headerDate = formatDate(dateObject, PageType.Completed); // formatted date for a group of incidents

      let incidentsForDate = [];
      incidentsForDate = renderIncidentsForDate(incidents);

      // couple the date and the incidents for this day
      renderList.push(
        <Block key={headerDate}>
          <Block overrides={PAST_INCIDENT_HOVER_OVERRIDES}>{headerDate}</Block>
          <Block>{incidentsForDate.reverse()}</Block>
        </Block>
      );
    });

    return <>{renderList}</>;
  }
);
