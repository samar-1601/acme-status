// lib
import { useState } from "react";

// components
import { NavBarMenuItem } from "./navBarMenuItem";
import { CreateIncidentButton } from "./createIncidentButton";
import { IncidentsList } from "./IncidentsList";
import { HeaderBarText } from "./headerBarText";
import { Block } from "baseui/block";

// constants
import { PageType } from "../../../constants";

// styles
import { incidentsListView } from "./styles/listStyles";
import { container, content, navbarWrapper, nav } from "./styles/navStyles";

/**
 * IncidentsList View
 * triggers when / is accessed
 * @returns a custom made fixed navbar with menu items and infinite scrolling
 */
export const IncidentsListViewHeader: React.FC = () => {
  const [activePage, setPage] = useState<PageType>(PageType.All); // variable indicating the current selected navbar menu-item

  return (
    <Block {...incidentsListView}>
      <Block {...container}>
        <HeaderBarText headerText="Incidents" />
        <Block {...navbarWrapper}>
          <Block {...nav}>
            <NavBarMenuItem
              pageType={PageType.All}
              currentPage={activePage}
              onClick={() => setPage(PageType.All)}
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
      </Block>
      <Block {...content}>
        <IncidentsList pageType={activePage} />
      </Block>
    </Block>
  );
};
