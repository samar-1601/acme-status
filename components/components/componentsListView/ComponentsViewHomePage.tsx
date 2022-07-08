// lib
import * as React from "react";
import { useState } from "react";

// components
import { Block } from "baseui/block";
import { CreateComponentButton } from "./components/HeaderBar/CreateComponentButton";
import { NavBarMenuItem } from "./components/HeaderBar/NavBarMenuItem";
import IncidentErrorPage from "../../incidentError/IncidentErrorPage";
import { Header } from "./components/HeaderBar/Header";
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

export const ComponentsViewHomePage = () => {
  const [activePage, setPage] = useState<Page>(Page.Active); // variable indicating the current selected navbar menu-item
  const [pageLoaded, setPageLoaded] = useState<boolean>(false); // boolean value determining the status of API request (completed/not completed)

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

  React.useEffect(() => {
    if (!isLoading) {
      setPageLoaded(true);
    }
  }, [isLoading]);

  return (
    <Block overrides={COMPONENTS_LIST_VIEW}>
      <Block overrides={CONTAINER}>
        <Header headerText="Components" />
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
