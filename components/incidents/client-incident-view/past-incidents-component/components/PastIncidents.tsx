// lib
import { useState, useEffect, useCallback } from "react";
import * as React from "react";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";

// constants
import { NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../../../../constants";
import { PastIncidentsList } from "./PastIncidentsList";

/**
 * @returns list of completed incidents in the given PAGE_ID
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
  }
};

/**
 * A react functional component for rendering past Incidents
 */
export const PastIncidents: React.FC = React.memo(() => {
  const [state, setState] = useState({
    pastIncidentsList: [],
    isLoaded: false,
  });

  /**
   * Helper function to get JSX components from API data
   * @returns a JSX componentList ready to render after styling the API response
   */
  const loadComponentsList = useCallback(async () => {
    let completedIncidents = [];
    try {
      completedIncidents = await getCompletedIncidents();

      /**
       * isLoaded : To notify the loading spinner whether data has loaded
       * pastIncidentsList : List storing the JSX components to render when data has loaded.
       */
      setState({
        ...state,
        pastIncidentsList: completedIncidents,
        isLoaded: true,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Load data for the when the page loads for the first time
  useEffect(() => {
    loadComponentsList();
  }, []);

  return state.isLoaded ? (
    state.pastIncidentsList.length == 0 ? (
      <Block
        overrides={{
          Block: {
            style: {
              marginTop: "15vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
        }}
      >
        No past Incidents !!
      </Block>
    ) : (
      <PastIncidentsList incidentList={state.pastIncidentsList} />
    )
  ) : (
    <Block
      overrides={{
        Block: {
          style: {
            marginTop: "15vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      <Spinner />
    </Block>
  );
});
