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

interface Props {
  incidentList: any;
}

/**
 * Helper function for PastIncidents List component
 * @param incidentList the past/completed Incidents List
 * @returns Formatted List of past/completed incidents grouped on basis of resolved dates for the PastIncidents.tsx page
 */
export const PastIncidentsList: React.FC<Props> = React.memo(
  ({ incidentList }) => {
    let map = new Map(); // map to store all incident updates for the same day together (date is used as key)

    // iterate through the incidents and add keys for the map and subsequently add the incidents completed on the same day together
    for (let i = 0; i < incidentList.length; i++) {
      const incident: any = incidentList[i];
      const date: string | Date = formattedDateInSlashFormat(
        new Date(incident["updated_at"])
      );
      let previous = [];
      if (map.has(date)) previous = map.get(date);

      map.set(date, previous.concat(incident)); // concat the new incidents to the previous ones on the same day
    }
    map = new Map([...map].sort().reverse()); // sort the groups in decreasing order of dates
    console.log(map);
    let renderList: JSX.Element[] = []; // list to store formatted data
    let index = 0;

    // iterate through each date and format the related incidents with required styling
    map.forEach(function (value, key) {
      const headerDate = key; // date for a group
      const incidents = value; // list of incidents on a date
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
                {update["status"]}
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
          <Block
            key={incident["id"]}
            overrides={PAST_INCIDENT_WRAPPER_OVERRIDES}
          >
            <Block overrides={PAST_INCIDENT_NAME_OVERRIDES}>
              {" "}
              {incidentName}
            </Block>
            <Block>{renderIncidentUpdates}</Block>
          </Block>
        );
      }

      // couple the date and the incidents for this day
      renderList.push(
        <Block key={index++}>
          <Block overrides={PAST_INCIDENT_HOVER_OVERRIDES}>{headerDate}</Block>
          <Block>{incidentsForDate}</Block>
        </Block>
      );
    });

    return <>{renderList}</>;
  }
);
