import { Block } from "baseui/block";
import Router from "next/router";
import * as React from "react";
import { useState } from "react";
import { SideBarMenu } from "../../../constants";
import { CollapsedSideBarMenuItem } from "./CollapsedSideBarMenuItem";

interface Props {
  activeItemID: SideBarMenu;
}

export const CollapsedSideBarMenuList: React.FC<Props> = React.memo(
  ({ activeItemID }) => {
    const [activeMenuItem, setActiveMenuItem] =
      useState<SideBarMenu>(activeItemID);

    return (
      <Block>
        <CollapsedSideBarMenuItem
          onClick={() => {
            setActiveMenuItem(SideBarMenu.IncidentsView);
            Router.push("/incidents");
          }}
          menuItem={SideBarMenu.IncidentsView}
          activeMenuItem={activeMenuItem}
        />
        <CollapsedSideBarMenuItem
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
          <CollapsedSideBarMenuItem
            menuItem={SideBarMenu.ClientsPage}
            activeMenuItem={activeMenuItem}
          />
        </a>
      </Block>
    );
  }
);
