// lib
import * as React from "react";

// components
import { Block } from "baseui/block";

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
  onClick: any;
}

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
                activeMenuItem == menuItem ? "white" : ""
              }`, // toggle the style based on the active page
              color: `${
                activeMenuItem == menuItem ? "rgb(20,47,93)" : "#F8F8FA"
              }`, // toggle the style based on the active page
              padding: "16px",
              margin: "10px",
              cursor: "pointer",
              textAlign: "center",
              borderRadius: "16px",
            },
            props: { className: "hoverSideBarOption" },
          },
        }}
      >
        {menuItem}
      </Block>
    );
  }
);
