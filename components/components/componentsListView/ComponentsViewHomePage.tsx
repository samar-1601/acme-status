// lib
import * as React from "react";
import { useEffect, useState } from "react";

// components
import { Block } from "baseui/block";
import { CreateComponentButton } from "./components/HeaderBar/CreateComponentButton";
import { NavBarMenuItem } from "./components/HeaderBar/NavBarMenuItem";
import IncidentErrorPage from "../../incidentError/IncidentErrorPage";
import { RenderComponentsList } from "./components/ComponentsList/RenderComponentsList";
import { TombStoneLoader } from "./components/TombStoneLoader";

// constants
import { Page } from "../../../constants";

// styles
import {
  COMPONENTS_LIST_VIEW,
  CONTAINER,
  CONTENT,
  LOADER,
  NAV,
  NAV_BAR_WRAPPER,
} from "./overrides/componentListStyles";

// custom hooks
import useLoadComponentsData from "./hooks/useLoadComponentsData";
import { HeaderBarContents } from "../../incidents/list/components/HeaderBar/HeaderBarContents";

export const ComponentsViewHomePage = () => {
  const [activePage, setPage] = useState<Page>(Page.Active); // variable indicating the current selected navbar menu-item
  const [pageLoaded, setPageLoaded] = useState<boolean>(false); // boolean value determining the status of API request (completed/not completed)
  const [isRefreshPressed, setIsRefreshPressed] = useState<boolean>(false); // variable to check if the refresh button is pressed

  /**
   * API response
   * dataList : JSON response for the limit(currently 15) items in the current pageNumber
   * isLoading : whether the data has loaded or not from the API
   * isError : is there error in loading
   * reFetch : function to refresh/refetch data from API
   * status : get the response status from API call
   */
  const { dataList, isLoading, reFetch, isError, status } =
    useLoadComponentsData(activePage);

  /**
   * triggered when the data is loaded from the API
   * sets pageLoaded for the current page (for the loading spinner)
   */
  useEffect(() => {
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

  return (
    <Block overrides={COMPONENTS_LIST_VIEW}>
      <Block overrides={CONTAINER}>
        <HeaderBarContents
          headerText="Components"
          isRefreshPressed={isRefreshPressed}
          setRefreshPressed={setIsRefreshPressed}
        />
        <Block overrides={NAV_BAR_WRAPPER}>
          <Block overrides={NAV}>
            <NavBarMenuItem
              pageType={Page.Active}
              currentPage={activePage}
              onClick={() => setPage(Page.Active)}
              disabled={false}
            />
            <NavBarMenuItem
              pageType={Page.ThirdParty}
              currentPage={activePage}
              onClick={() => {}}
              disabled={true}
            />
          </Block>
          <CreateComponentButton />
        </Block>
      </Block>
      <Block overrides={CONTENT}>
        {status == 420 ? (
          <IncidentErrorPage message="Too Many requests, try again after sometime!" />
        ) : isError || status != 200 ? (
          <IncidentErrorPage message="Sorry Unable to Fetch Incidents" />
        ) : pageLoaded ? (
          <RenderComponentsList
            dataList={dataList}
            setLoaded={setPageLoaded}
            reFetch={reFetch}
          />
        ) : (
          <Block overrides={LOADER}>
            <TombStoneLoader />
          </Block>
        )}
      </Block>
    </Block>
  );
};
