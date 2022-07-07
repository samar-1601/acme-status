//lib
import * as React from "react";
import Router from "next/router";
import { useState } from "react";

//components
import { Block } from "baseui/block";
import { CollapsedSideBarMenuItem } from "./CollapsedSideBarMenuItem";

//constants
import { SideBarMenu } from "../../../constants";

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
            Router.push("/components");
          }}
          menuItem={SideBarMenu.Components}
          activeMenuItem={activeMenuItem}
        />
        <CollapsedSideBarMenuItem
          onClick={() => {
            Router.push("/client");
          }}
          menuItem={SideBarMenu.ClientsPage}
          activeMenuItem={activeMenuItem}
        />
      </Block>
    );
  }
);
