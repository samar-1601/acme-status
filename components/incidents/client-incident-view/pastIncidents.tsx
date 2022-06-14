// lib
import { useState, useEffect, useCallback } from "react";

// components
import { Block } from "baseui/block";
import { makePastIncidentComponents } from "./helperFunctions";

// constants
import { NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../../constants";

/**
 * Fetch components from API
 * @returns list of components in the given PAGE_ID
 */
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

const renderPastIncidentComponents = async () => {
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
    const components = await renderPastIncidentComponents();
    setState({ ...state, completedIncidentsList: components, isLoaded: true });
  }, []);

  const components = useEffect(() => {
    loadComponentsList();
  }, []);
  return <Block>{state.completedIncidentsList}</Block>;
};
