import { Block } from "baseui/block";
import React from "react";
import { PageType } from "../../../../constants";
import { NAVBAR_OVERRIDES, NAV_OVERRIDES } from "../overrides/navStyles";
import { CreateIncidentButton } from "./HeaderBar/CreateIncidentButton";
import { NavBarMenuItem } from "./NavigationBarMenuItem";

interface Props {
  activePage: PageType;
  setPage: Function;
  setQuery: Function;
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
            onClick={() => setPage(PageType.Active)}
          />
          <NavBarMenuItem
            pageType={PageType.Maintenance}
            currentPage={activePage}
            onClick={() => setPage(PageType.Maintenance)}
          />
          <NavBarMenuItem
            pageType={PageType.Scheduled}
            currentPage={activePage}
            onClick={() => setPage(PageType.Scheduled)}
          />
        </Block>
        <CreateIncidentButton />
      </Block>
    );
  }
);
