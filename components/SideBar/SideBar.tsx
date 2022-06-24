// lib
import { useState } from "react";

// components
import { Block } from "baseui/block";
import Router from "next/router";
import { SideBarMenuItem } from "./SideBarMenuItem";

// constants
import { SideBarMenu } from "../../constants";

// styles
import { sideBarHeaderName, sideBarStyle } from "./SideBarStyles";

interface Props {
  activeItemID: SideBarMenu;
}

const SideBar: React.FC<Props> = ({ activeItemID }) => {
  const [activeMenuItem, setActiveMenuItem] =
    useState<SideBarMenu>(activeItemID);

  return (
    <Block {...sideBarStyle}>
      <Block {...sideBarHeaderName}>statuspage</Block>
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
  );
};

export default SideBar;
