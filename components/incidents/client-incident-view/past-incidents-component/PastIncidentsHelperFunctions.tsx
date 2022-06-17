// components
import { Block } from "baseui/block";

//helper function
import { formatDate } from "../list-view-incidents/IncidentsListViewHelperFunctions";

// styles
import {
  pastIncidentNameStyle,
  pastIncidentHeaderDateStyle,
  pastIncidentDetailsWrapper,
  pastIncidentWrapper,
  pastIncidentStatusStyle,
  pastIncidentStatusBody,
  pastIncidentStatusDate,
} from "../styles/pastIncidentsStyles";

// get the formatted date in dd/mm/yy format
function formattedDateInSlashFormat(d = new Date()) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${day}/${month}/${year}`;
}

/**
 * Helper function for PastIncidents List component
 * @param incidentList the past/completed Incidents List
 * @returns Formatted List of past/completed incidents grouped on basis of resolved dates for the PastIncidents.tsx page
 */
export const GetPastIncidentComponents = (incidentList: any[]) => {
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
          <Block key={update["id"]} {...pastIncidentDetailsWrapper}>
            <Block {...pastIncidentStatusStyle}>{update["status"]}</Block>
            <Block {...pastIncidentStatusBody}> - {update["body"]} </Block>
            <Block {...pastIncidentStatusDate}>
              {formatDate(update["updated_at"])}
            </Block>
          </Block>
        );
        renderIncidentUpdates.push(renderUpdate); // push all updates together in a list
      }
      // push all incidents with their updates together
      incidentsForDate.push(
        <Block key={incident["id"]} {...pastIncidentWrapper}>
          <Block {...pastIncidentNameStyle}> {incidentName}</Block>
          <Block>{renderIncidentUpdates}</Block>
        </Block>
      ); 
    }

    // couple the date and the incidents for this day
    renderList.push(
      <Block key={index++}>
        <Block {...pastIncidentHeaderDateStyle}>{headerDate}</Block>
        <Block>{incidentsForDate}</Block>
      </Block>
    );
  });

  return renderList;
};
