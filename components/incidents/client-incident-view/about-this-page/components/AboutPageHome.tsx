// lib
import * as React from "react";
import { useState, useEffect } from "react";

// loading and helper functions
import { RenderComponents } from "./RenderComponentsList";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";

// styles
import { COMPONENT_LIST_WRAPPER_OVERRIDES } from "../overrides/aboutThisStyles";
import { Legends } from "./Legends";
import IncidentErrorPage from "../../incidentError/IncidentErrorPage";
import useLoadAboutPageData from "../hooks/useLoadAboutPageData";
import { RenderComponentGroups } from "./RenderComponentGroups";
import { cp } from "fs";

/**
 * About this page component
 * returns past 90 days uptime/downtime status for all the components with color coded presentation
 */
export const AboutThisSite = React.memo(() => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false); // boolean value determining the status of API resquest (completed/not completed)

  const {
    pureComponentsList,
    componentGroupNamesMap,
    componentGroupsMap,
    componentUptimeMap,
    isLoading,
    isError,
    status,
  } = useLoadAboutPageData();

  /**
   * triggered when the data is loaded from the API
   * sets pageLoaded for the current page (for the loading spinner)
   */
  useEffect(() => {
    // if page has loaded
    if (!isLoading) {
      return setPageLoaded(true);
    }
  }, [isLoading]);

  return status == 420 ? (
    <IncidentErrorPage message="Too Many requests, try again after sometime!" />
  ) : isError || status != 200 ? (
    <IncidentErrorPage message="Sorry Unable to Fetch Incidents" />
  ) : pageLoaded ? (
    // render components if data has loaded
    <>
      <Legends />
      <Block overrides={COMPONENT_LIST_WRAPPER_OVERRIDES}>
        <RenderComponents
          totalDays={90}
          componentList={pureComponentsList}
          componentUptimeMap={componentUptimeMap}
        />
        <RenderComponentGroups
          componentGroupNamesMap={componentGroupNamesMap}
          componentGroupsMap={componentGroupsMap}
          componentUptimeMap={componentUptimeMap}
        />
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
