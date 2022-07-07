// lib
import React, { useEffect, useState } from "react";

// components
import { Block } from "baseui/block";
import { IncidentsList } from "./components/IncidentList/IncidentsList";
import { HeaderBarContents } from "./components/HeaderBar/HeaderBarContents";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";

// constants
import { PageType } from "../../../constants";

// styles
import { INCIDENT_LIST_VIEW_OVERRIDES } from "./overrides/listStyles";
import {
  HEADER_CONTAINER_OVERRIDES,
  CONTENT_OVERRIDES,
} from "./overrides/navStyles";

// custom hooks
import useLoadIncidentsPageData from "./hooks/useLoadIncidentsPageData";
import IncidentErrorPage from "../../incidentError/IncidentErrorPage";
import {
  MAIN_STYLE_OVERRIDES,
  ERROR_PAGE_OVERRIDES,
} from "../client-incident-view/styles/containerStyles";
import { TombStoneLoader } from "./components/TombStoneLoader";

/**
 * IncidentsList View Header
 * triggers when / is accessed
 * @returns a custom made fixed navbar with menu items and infinite scrolling
 */
export const IncidentsViewHomePage = () => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false); // boolean value determining the status of API resquest (completed/not completed)
  const [activePage, setPage] = useState<PageType>(PageType.All); // variable indicating the current selected navbar menu-item
  const [query, setQuery] = useState<string>(""); // query string typed in search bar
  const [isRefreshPressed, setIsRefreshPressed] = useState<boolean>(false); // variable to check if the refresh button is pressed

  /**
   * API response
   * dataList : JSON response for the limit(currently 15) items in the current pageNumber
   * isLoading : whether the data has loaded or not from the API
   * hasMore : is there more data to fetch when we scroll
   * isError : is there error in loading
   * status : get the response status from API call
   * reFetch : function to refresh/refetch data from API
   */
  const { dataList, isLoading, hasMore, fetchMore, reFetch, isError, status } =
    useLoadIncidentsPageData(activePage, query);

  /**
   * triggered when the data is loaded from the API
   * sets pageLoaded for the current page (for the loading spinner)
   */
  useEffect(() => {
    // if page has loaded
    if (!isLoading) {
      setIsRefreshPressed(false);
      return setPageLoaded(true);
    }
  }, [isLoading]);

  /**
   * triggered if refresh button is pressed
   */
  useEffect(() => {
    if (isRefreshPressed) {
      setPageLoaded(false);
      reFetch();
    }
  }, [isRefreshPressed]);

  /**
   * Triggered when the PageType changes i.e when the user clicks another navigation bar item
   * Initialises pageLoaded to false
   */
  useEffect(() => {
    setPageLoaded(false);
  }, [activePage]);

  return (
    <Block overrides={INCIDENT_LIST_VIEW_OVERRIDES}>
      <Block overrides={HEADER_CONTAINER_OVERRIDES}>
        <HeaderBarContents
          headerText="Incidents"
          isRefreshPressed={isRefreshPressed}
          onSubmit={setQuery}
          activePage={activePage}
          setRefreshPressed={setIsRefreshPressed}
          query={query}
        />
        <NavigationBar
          activePage={activePage}
          setPage={setPage}
          setQuery={setQuery}
        />
      </Block>
      {/* --- page content below header --- */}
      <Block overrides={CONTENT_OVERRIDES}>
        {isError ? (
          <IncidentErrorPage message="Sorry Unable to Fetch Incidents" />
        ) : status == 420 ? (
          <IncidentErrorPage message="Too Many requests, try again after sometime!" />
        ) : pageLoaded ? (
          dataList.length == 0 ? (
            // If the page has no data
            <Block overrides={MAIN_STYLE_OVERRIDES}>
              <Block overrides={ERROR_PAGE_OVERRIDES}>
                <h1 className="header">This Page has no Incidents</h1>
              </Block>
            </Block>
          ) : (
            // if data has loaded and data length is not zero
            <IncidentsList
              reFetch={reFetch}
              setPageLoaded={setPageLoaded}
              dataList={dataList}
              fetchMore={fetchMore}
              hasMore={hasMore}
            />
          )
        ) : (
          <TombStoneLoader />
        )}
      </Block>
    </Block>
  );
};
