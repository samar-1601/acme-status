// lib
import * as React from "react";

// components
import { Block } from "baseui/block";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdOpenInNew } from "react-icons/md";
import { TbComponents } from "react-icons/tb";

// constants
import { SideBarMenu } from "../../constants";

/**
 * Props for a SideBarMenuItem
 * activeMenuItem: active item on the left sideBar
 * menuItem: label for the menu-item in the sideBar
 * onClick: functionality to execute when a menu item is clicked
 */
interface Props {
  activeMenuItem: SideBarMenu;
  menuItem: SideBarMenu;
  onClick?: any;
}

/**
 * Function for giving icons to sidebar menu
 * @param menuItem The menuItem for which icon is to be displayed
 * @param activeMenuItem The currently selected menu-item
 * @returns Icon for the sidebar menu-item
 */
const getIcon = (menuItem: SideBarMenu, activeMenuItem: SideBarMenu) => {
  switch (menuItem) {
    case SideBarMenu.IncidentsView:
      return activeMenuItem == menuItem ? (
        <AiOutlineExclamationCircle color="rgb(20,47,93)" size={20} />
      ) : (
        <AiOutlineExclamationCircle color="yellowgreen" size={20} />
      );
    case SideBarMenu.ClientsPage:
      return activeMenuItem == menuItem ? (
        <MdOpenInNew color="rgb(20,47,93)" size={20} />
      ) : (
        <MdOpenInNew color="yellow" size={20} />
      );
    case SideBarMenu.Components:
      return activeMenuItem == menuItem ? (
        <TbComponents color="rgb(20,47,93)" size={20} />
      ) : (
        <TbComponents color="pink" size={20} />
      );
  }
};

/**
 * SideBarMenuItem Component
 * @returns react component for a menu-item in sidebar
 */
export const SideBarMenuItem: React.FC<Props> = React.memo(
  ({ activeMenuItem, menuItem, onClick }) => {
    return (
      <Block
        onClick={onClick}
        overrides={{
          Block: {
            style: {
              backgroundColor: `${
                activeMenuItem == menuItem ? "lightblue" : "rgb(16, 36, 71)"
              }`, // toggle the style based on the active page
              color: `${
                activeMenuItem == menuItem ? "rgb(20,47,93)" : "#F8F8FA"
              }`, // toggle the style based on the active page
              padding: "16px",
              margin: "12px 20px",
              cursor: "pointer",
              textAlign: "center",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            },
            props: {
              className: `${
                activeMenuItem != menuItem ? "hoverSideBarOption" : ""
              }`,
            },
          },
        }}
      >
        {getIcon(menuItem, activeMenuItem)}
        {menuItem}
      </Block>
    );
  }
);
