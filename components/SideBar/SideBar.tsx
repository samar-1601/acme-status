// lib
import { useState } from "react";
import * as React from "react";
import { signOut } from "next-auth/react";

// components
import { Block } from "baseui/block";
import Router from "next/router";
import { SideBarMenuItem } from "./SideBarMenuItem";

// constants
import { SideBarMenu } from "../../constants";

// styles
import { sideBarHeaderName, sideBarStyle, signOutButton } from "./SideBarStyles";

interface Props {
  /**
   * the active/selected item currently on the sidebar
   */
  activeItemID: SideBarMenu;
}

/**
 * SideBar component
 * @returns sidebar react component for the app
 */
const SideBar: React.FC<Props> = React.memo(({ activeItemID }) => {
  // state stroing the currently selected sidebar menu-item
  const [activeMenuItem, setActiveMenuItem] =
    useState<SideBarMenu>(activeItemID);

  return (
    <Block {...sideBarStyle}>
      <Block {...sideBarHeaderName}>statuspage</Block>
      <Block>
        <SideBarMenuItem
          onClick={() => {
            setActiveMenuItem(SideBarMenu.IncidentsView);
            Router.push("/incidents");
          }}
          menuItem={SideBarMenu.IncidentsView}
          activeMenuItem={activeMenuItem}
        />
        <SideBarMenuItem
          onClick={() => {
            setActiveMenuItem(SideBarMenu.CreateIncidents);
            Router.push("/incident/new");
          }}
          menuItem={SideBarMenu.CreateIncidents}
          activeMenuItem={activeMenuItem}
        />
        <SideBarMenuItem
          onClick={() => {
            setActiveMenuItem(SideBarMenu.Components);
            Router.push("/component");
          }}
          menuItem={SideBarMenu.Components}
          activeMenuItem={activeMenuItem}
        />
      </Block>
      <Block
        className="secondary-button"
        onClick={() => {
          // signOut of the page and also remove the loadingcount for the homepage (used for showing the successfully logged in SnackBar when signed in for the first time)
          localStorage.removeItem("loadingCount");
          signOut();
        }}
        {...signOutButton}
      >
        Sign Out
      </Block>
    </Block>
  );
});

export default SideBar;
