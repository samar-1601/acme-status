// lib
import { useState } from "react";

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

/**
 * IncidentsList View Header
 * triggers when / is accessed
 * @returns a custom made fixed navbar with menu items and infinite scrolling
 */
export const IncidentsViewHomePage: React.FC = () => {
  const [activePage, setPage] = useState<PageType>(PageType.All); // variable indicating the current selected navbar menu-item
  const [query, setQuery] = useState<string>(""); // query string typed in search bar
  const [isRefreshPressed, setIsRefreshPressed] = useState<boolean>(false); // variable to check if the refresh button is pressed

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
      <Block overrides={CONTENT_OVERRIDES}>
        <IncidentsList
          pageType={activePage}
          query={query}
          isRefreshPressed={isRefreshPressed}
          setRefreshPressed={setIsRefreshPressed}
        />
      </Block>
    </Block>
  );
};
