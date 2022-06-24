// lib
import { useState } from "react";

// components
import { NavBarMenuItem } from "./components/NavigationBarMenuItem";
import { CreateIncidentButton } from "./components/CreateIncidentButton";
import { IncidentsList } from "./components/IncidentsList";
import { HeaderBarContents } from "./components/HeaderBarContents";
import { Block } from "baseui/block";

// constants
import { PageType } from "../../../constants";

// styles
import { incidentsListView } from "./styles/listStyles";
import { container, content, navbarWrapper, nav } from "./styles/navStyles";

/**
 * IncidentsList View Header
 * triggers when / is accessed
 * @returns a custom made fixed navbar with menu items and infinite scrolling
 */
export const IncidentsViewHomePage: React.FC = () => {
  const [activePage, setPage] = useState<PageType>(PageType.All); // variable indicating the current selected navbar menu-item

  return (
    <Block {...incidentsListView}>
      <Block {...container}>
        <HeaderBarContents headerText="Incidents" />
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
