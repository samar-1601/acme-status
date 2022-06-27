// lib
import * as React from "react";
import { useState, useEffect, useCallback } from "react";

// loading and helper functions
import { getComponents } from "./LoadAboutPageData";
import {
  renderComponents,
  legendColorDeterminer,
} from "./AboutPageHelperFunctions";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";

// styles
import {
  componentListWrapper,
  legendBoxStyle,
  legendBoxWrapperStyle,
} from "../styles/aboutThisStyles";
import { ComponentStatusType } from "../../../../constants";

/**
 * About this page component
 * returns past 90 days uptime/downtime status for all the components with color coded presentation
 */
export const AboutThisSite = React.memo(() => {
  const [state, setState] = useState({
    componentsList: Array(), // store the final response of components list to render
    isLoaded: false, // stores whether the page is loaded
  });

  /**
   * helper function to load the components list by calling API functions
   */
  const loadComponentsList = useCallback(async () => {
    try {
      let componentList = [];
      componentList = await getComponents(); // get components from API
      let components = [];
      components = await renderComponents(componentList); // get formatted list ready to render from the API

      setState({ ...state, componentsList: components, isLoaded: true }); // set the componentsList to returned render ready list and isLoaded to true
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadComponentsList();
  }, []);

  return state.isLoaded ? (
    // render components if data has loaded
    <>
      <Block {...legendBoxWrapperStyle}>
        <Block
          {...legendBoxStyle}
          backgroundColor={legendColorDeterminer(
            ComponentStatusType.MajorOutage
          )}
        ></Block>
        <Block>Major Outage</Block>
        <Block
          {...legendBoxStyle}
          backgroundColor={legendColorDeterminer(
            ComponentStatusType.PartialOutage
          )}
        ></Block>
        <Block>Partial Outage</Block>
        <Block
          backgroundColor={legendColorDeterminer(
            ComponentStatusType.Operational
          )}
          {...legendBoxStyle}
        ></Block>
        <Block>Operational</Block>
        <Block
          {...legendBoxStyle}
          backgroundColor={legendColorDeterminer(
            ComponentStatusType.UnderMaintenance
          )}
        ></Block>
        <Block>No Incidents Reported</Block>
      </Block>
      <Block {...componentListWrapper}>{state.componentsList}</Block>
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