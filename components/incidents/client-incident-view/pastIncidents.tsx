// lib
import { useState, useEffect, useCallback } from "react";

// components
import { Block } from "baseui/block";

// styles
import {
  incidentNameStyle,
  headerDateStyle,
  incidentDetailsWrapper,
  incidentWrapper,
  incidentStatusStyle,
  incidentStatusBody,
  incidentStatusDate,
} from "./styles/pastIncidentsStyles";

// constants
import { NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../../constants";

const getCompletedIncidents = async () => {
  try {
    let URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/incidents/?q=completed`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const completedList = await response.json();

    return completedList;
  } catch (err) {
    console.log(err);
    alert("Couldn't fetch completed incidents.");
  }
};

/**
 * Format date for display
 * @param date The date which needs to be formatted to display
 * @returns formatted completedList in x days ago format
 */
const formatDate = (date: string | Date): string => {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  date = new Date(date);

  // making h:m to hh:mm
  let timeHour: string = `${date.getUTCHours()}`;
  if (timeHour.length == 1) timeHour = `0${timeHour}`;
  let timeMins: string = `${date.getUTCMinutes()}`;
  if (timeMins.length == 1) timeMins = `0${timeMins}`;

  return `${date.getUTCDate()} ${formatter.format(
    date
  )}, ${timeHour}:${timeMins} UTC`;
};

const makePastIncidentComponents = (incidentList: any[]) => {
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
          <Block key={update["id"]} {...incidentDetailsWrapper}>
            <Block {...incidentStatusStyle}>{update["status"]}</Block>
            <Block {...incidentStatusBody}> - {update["body"]} </Block>
            <Block {...incidentStatusDate}>
              {formatDate(update["updated_at"])}
            </Block>
          </Block>
        );
        renderIncidentUpdates.push(renderUpdate);
      }
      incidentsForDate.push(
        <Block key={incident["id"]} {...incidentWrapper}>
          <Block {...incidentNameStyle}> {incidentName}</Block>
          <Block>{renderIncidentUpdates}</Block>
        </Block>
      );
    }
    renderList.push(
      <Block key={key}>
        <Block {...headerDateStyle}>{headerDate}</Block>
        <Block>{incidentsForDate}</Block>
      </Block>
    );
  });

  return renderList;
};
const renderComponents = async () => {
  const completedList = await getCompletedIncidents();

  console.log(completedList);
  let renderCompletedList: JSX.Element[] =
    makePastIncidentComponents(completedList);

  return renderCompletedList;
};

export const PastIncidents = () => {
  const [state, setState] = useState({
    completedIncidentsList: Array(),
    isLoaded: false,
  });

  const loadComponentsList = useCallback(async () => {
    const components = await renderComponents();
    setState({ ...state, completedIncidentsList: components, isLoaded: true });
  }, []);

  const components = useEffect(() => {
    loadComponentsList();
  }, []);
  return <Block>{state.completedIncidentsList}</Block>;
};
