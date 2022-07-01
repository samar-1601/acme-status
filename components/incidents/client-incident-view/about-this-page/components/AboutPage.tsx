// lib
import * as React from "react";
import { useState, useEffect, useCallback } from "react";

// loading and helper functions
import { getComponents } from "../helpers/loadAboutPageData";
import { renderComponents } from "./AboutPageComponentsList";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";

// styles
import { COMPONENT_LIST_WRAPPER_OVERRIDES } from "../overrides/aboutThisStyles";
import { Legends } from "./Legends";
import IncidentErrorPage from "../../incidentError/IncidentErrorPage";

const totalDays: number = 90; // total no. of days for whcih we are rendering data

/**
 * About this page component
 * returns past 90 days uptime/downtime status for all the components with color coded presentation
 */
export const AboutThisSite = React.memo(() => {
  const [state, setState] = useState({
    componentsList: Array(), // store the final response of components list to render
    isLoaded: false, // stores whether the page is loaded
    isError: false,
  });

  /**
   * helper function to load the components list by calling API functions
   */
  const loadComponentsList = useCallback(async () => {
    try {
      let componentList = [];
      componentList = await getComponents(); // get components from API
      let components = [];
      components = await renderComponents(totalDays, componentList); // get formatted list ready to render from the API

      setState({
        ...state,
        componentsList: components,
        isLoaded: true,
        isError: false,
      }); // set the componentsList to returned render ready list and isLoaded to true
    } catch (err) {
      console.log(err);
      setState({ ...state, isError: true });
    }
  }, []);

  useEffect(() => {
    loadComponentsList();
  }, []);

  if (state.isError) {
    return <IncidentErrorPage message="Failed to Fetch Components!!!" />;
  }
  return state.isLoaded ? (
    // render components if data has loaded
    <>
      <Legends />
      <Block overrides={COMPONENT_LIST_WRAPPER_OVERRIDES}>
        {state.componentsList}
      </Block>
    </>
  ) : (
    // show spinner if data has not loaded
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
