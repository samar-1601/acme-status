// lib
import * as React from "react";

// components
import { Block } from "baseui/block";
import { ComponentList } from "./components/ComponentList";
import { CreateComponentButton } from "./components/HeaderBar/CreateComponentButton";
import { NavBarMenuItem } from "./components/HeaderBar/NavBarMenuItem";
import { Header } from "./components/HeaderBar/Header";

// constants
import { Page } from "../../../constants";

// styles
import {
  COMPONENTS_LIST_VIEW,
  CONTAINER,
  CONTENT,
  NAV,
  NAV_BAR_WRAPPER,
} from "./overrides/componentListStyles";


export const ComponentsViewHomePage: React.FC = () => {
  const [activePage, setPage] = React.useState<Page>(Page.Active); // variable indicating the current selected navbar menu-item

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
        <ComponentList pageType={activePage} />
      </Block>
    </Block>
  );
};
