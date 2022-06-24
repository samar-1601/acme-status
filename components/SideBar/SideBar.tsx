import { Block } from "baseui/block";
import Router from "next/router";
import { useState } from "react";
import { SideBarMenu } from "../../constants";
import { sideBarHeaderName, sideBarStyle } from "./SideBarStyles";

interface Props {
  activeItemID: SideBarMenu;
}

const SideBar: React.FC<Props> = ({ activeItemID }) => {
  const [activeMenuItem, setActiveMenuItem] =
    useState<SideBarMenu>(activeItemID);
  const handleClick = (menuItem: SideBarMenu) => {
    setActiveMenuItem(menuItem);
    if (menuItem == SideBarMenu.IncidentsView) Router.push("/incidents");
    else if (menuItem == SideBarMenu.CreateIncidents)
      Router.push("/incident/new");
    else if (menuItem == SideBarMenu.Components) Router.push("/component");
  };
  return (
    <Block {...sideBarStyle}>
      <Block {...sideBarHeaderName}>statuspage</Block>
      <Block
        onClick={() => handleClick(SideBarMenu.IncidentsView)}
        overrides={{
          Block: {
            style: {
              backgroundColor: `${
                activeMenuItem == SideBarMenu.IncidentsView ? "lightblue" : ""
              }`, // toggle the style based on the active page
              color: `${
                activeMenuItem == SideBarMenu.IncidentsView
                  ? "rgb(20,47,93)"
                  : "#F8F8FA"
              }`, // toggle the style based on the active page
              padding: "20px",
              cursor: "pointer",
              textAlign: "center",
            },
            props: { className: "hoverSideBarOption" },
          },
        }}
      >
        Incidents List View
      </Block>
      <Block
        onClick={() => handleClick(SideBarMenu.CreateIncidents)}
        overrides={{
          Block: {
            style: {
              backgroundColor: `${
                activeMenuItem == SideBarMenu.CreateIncidents ? "lightblue" : ""
              }`, // toggle the style based on the active page
              color: `${
                activeMenuItem == SideBarMenu.CreateIncidents
                  ? "rgb(20,47,93)"
                  : "#F8F8FA"
              }`, // toggle the style based on the active page
              padding: "20px",
              cursor: "pointer",
              textAlign: "center",
            },
            props: { className: "hoverSideBarOption" },
          },
        }}
      >
        Incidents Form
      </Block>
      <Block
        onClick={() => handleClick(SideBarMenu.Components)}
        overrides={{
          Block: {
            style: {
              backgroundColor: `${
                activeMenuItem == SideBarMenu.Components ? "lightblue" : ""
              }`, // toggle the style based on the active page
              color: `${
                activeMenuItem == SideBarMenu.Components
                  ? "rgb(20,47,93)"
                  : "#F8F8FA"
              }`, // toggle the style based on the active page
              padding: "20px",
              cursor: "pointer",
              textAlign: "center",
            },
            props: { className: "hoverSideBarOption" },
          },
        }}
      >
        Components
      </Block>
    </Block>
  );
};

export default SideBar;
