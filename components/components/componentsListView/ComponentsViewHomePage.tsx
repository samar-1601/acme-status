import { Block } from "baseui/block"
import * as React from "react";
import { Page } from "../../../constants";
import { ComponentList } from "./ComponentList";
import { componentsListView, container, content, nav, navbarWrapper } from "../overrides/componentListStyles";
import { CreateComponentButton } from "./CreateComponentButton";

import { NavBarMenuItem } from "./NavBarMenuItem";
import { Header } from "./Header";

export const ComponentsViewHomePage: React.FC = () => {
  const [activePage, setPage] = React.useState<Page>(Page.Active); // variable indicating the current selected navbar menu-item

  return (
    <Block {...componentsListView}>
      <Block {...container}>
        <Header headerText="Components" />
        <Block {...navbarWrapper}>
          <Block {...nav}>
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
      <Block {...content}>
        <ComponentList pageType={activePage} />
      </Block> 
    </Block>
  );
};
