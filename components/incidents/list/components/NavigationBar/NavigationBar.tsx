// lib
import React from "react";

// components
import { Block } from "baseui/block";
import { CreateIncidentButton } from "../HeaderBar/CreateIncidentButton";
import { NavBarMenuItem } from "./NavigationBarMenuItem";

// constants
import { PageType } from "../../../../../constants";

// styles
import { NAVBAR_OVERRIDES, NAV_OVERRIDES } from "../../overrides/navStyles";

interface Props {
  activePage: PageType; // selected page in the navigation menu
  setPage: Function; // set the page if new navigation menu item is selected
  setQuery: Function; // flush the query when a new mavigation menu item is selected
}
export const NavigationBar: React.FC<Props> = React.memo(
  ({ activePage, setPage, setQuery }) => {
    return (
      <Block overrides={NAVBAR_OVERRIDES}>
        <Block overrides={NAV_OVERRIDES}>
          <NavBarMenuItem
            pageType={PageType.All}
            currentPage={activePage}
            onClick={() => {
              setQuery("");
              setPage(PageType.All);
            }}
          />
          <NavBarMenuItem
            pageType={PageType.Active}
            currentPage={activePage}
            onClick={() => {
              setQuery("");
              setPage(PageType.Active);
            }}
          />
          <NavBarMenuItem
            pageType={PageType.Maintenance}
            currentPage={activePage}
            onClick={() => {
              setQuery("");
              setPage(PageType.Maintenance);
            }}
          />
          <NavBarMenuItem
            pageType={PageType.Scheduled}
            currentPage={activePage}
            onClick={() => {
              setQuery("");
              setPage(PageType.Scheduled);
            }}
          />
        </Block>
        <CreateIncidentButton />
      </Block>
    );
  }
);
