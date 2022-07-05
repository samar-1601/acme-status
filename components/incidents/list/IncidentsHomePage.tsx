// lib
import { useEffect, useState } from "react";

// components
import { NavBarMenuItem } from "./components/NavigationBarMenuItem";
import { CreateIncidentButton } from "./components/HeaderBar/CreateIncidentButton";
import { IncidentsList } from "./components/IncidentsList";
import { HeaderBarContents } from "./components/HeaderBar/HeaderBarContents";
import { Block } from "baseui/block";

// constants
import { PageType } from "../../../constants";

// styles
import { INCIDENT_LIST_VIEW_OVERRIDES } from "./overrides/listStyles";
import {
  HEADER_CONTAINER_OVERRIDES,
  CONTENT_OVERRIDES,
  NAVBAR_OVERRIDES,
  NAV_OVERRIDES,
} from "./overrides/navStyles";
import { NavigationBar } from "./components/NavigationBar";

/**
 * IncidentsList View Header
 * triggers when / is accessed
 * @returns a custom made fixed navbar with menu items and infinite scrolling
 */
export const IncidentsViewHomePage: React.FC = () => {
  const [activePage, setPage] = useState<PageType>(PageType.All); // variable indicating the current selected navbar menu-item
  const [query, setQuery] = useState<string>("");
  const [isRefreshPressed, setIsRefreshPressed] = useState<boolean>(false);

  return (
    <Block overrides={INCIDENT_LIST_VIEW_OVERRIDES}>
      <Block overrides={HEADER_CONTAINER_OVERRIDES}>
        <HeaderBarContents
          headerText="Incidents"
          onSubmit={setQuery}
          activePage={activePage}
          setRefreshPressed={setIsRefreshPressed}
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
