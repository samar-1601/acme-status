// lib
import { useState, useEffect, useCallback } from "react";
import * as React from "react";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";

// constants
import { PastIncidentsList } from "./PastIncidentsList";
import IncidentErrorPage from "../../incidentError/IncidentErrorPage";
import useLoadPastIncidents from "../hooks/useLoadPastIncidents";

/**
 * A react functional component for rendering past Incidents
 */
export const PastIncidents: React.FC = React.memo(() => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false); // boolean value determining the status of API request (completed/not completed)

  /**
   * API response
   * dataList : JSON response for the limit(currently 15) items in the current pageNumber
   * isLoading : whether the data has loaded or not from the API
   * isError : is there error in loading
   * status : get the response status from API call
   */
  const { dataList, isLoading, isError, status } = useLoadPastIncidents();

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

  if (isError) {
    return (
      <IncidentErrorPage message="Unable to Load Data. Please Try Again!!!" />
    );
  } else if (status == 420) {
    return (
      <IncidentErrorPage message="Too Many requests, try again after sometime!" />
    );
  } else
    return pageLoaded ? (
      dataList.length == 0 ? (
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
        <PastIncidentsList incidentList={dataList} />
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
