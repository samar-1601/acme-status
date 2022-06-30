//lib
import * as React from "react";
import Router from "next/router";
import { useState } from "react";

//components
import { Block } from "baseui/block";
import { FullSideBarMenuItem } from "./FullSideBarMenuItem";

//constants
import { SideBarMenu } from "../../../constants";

interface Props {
  /**
   * the active/selected item currently on the sidebar
   */
  activeItemID: SideBarMenu;
}

export const FullSideBarMenuList: React.FC<Props> = React.memo(
  ({ activeItemID }) => {
    // state stroing the currently selected sidebar menu-item
    const [activeMenuItem, setActiveMenuItem] =
      useState<SideBarMenu>(activeItemID);

    return (
      <Block>
        <FullSideBarMenuItem
          onClick={() => {
            setActiveMenuItem(SideBarMenu.IncidentsView);
            Router.push("/incidents");
          }}
          menuItem={SideBarMenu.IncidentsView}
          activeMenuItem={activeMenuItem}
        />
        <FullSideBarMenuItem
          onClick={() => {
            setActiveMenuItem(SideBarMenu.Components);
            Router.push("/component");
          }}
          menuItem={SideBarMenu.Components}
          activeMenuItem={activeMenuItem}
        />
        <a
          href="https://client-incident-list-view.netlify.app/"
          target="_blank"
        >
          <FullSideBarMenuItem
            menuItem={SideBarMenu.ClientsPage}
            activeMenuItem={activeMenuItem}
          />
        </a>
      </Block>
    );
  }
);
