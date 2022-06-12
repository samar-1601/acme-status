// lib
import * as React from "react";

// styles
import {
  divInsideNav,
  spanInsideNav,
  navActiveItem,
  navNonActiveItem,
} from "./styles/navStyles";

// components
import { Block } from "baseui/block";

// props for NavBarMenuItems
interface Props {
  currentPage: string;
  pageType: string;
  onClick: any;
}

/**
 * Check function for React.memo on the NavBarMenuItem to reduce unnecesary renders for unchanged menu items
 * @param prevMenu The previous selected menu item
 * @param currentMenu The current selected menu item
 * @returns true if the previous or the current item was untouched
 */
function menuItemChanged(prevMenu: Props, currentMenu: Props) {
  return (
    prevMenu.currentPage !== prevMenu.pageType &&
    currentMenu.currentPage !== currentMenu.pageType
  );
}

/**
 * Returns a NavbarMenu item based on the Props passed
 * Memoized to reduced unnecessary renders
 * now only the changed menu items(cuurent + previous menu items) are rendered and not the unchanegd ones
 */
export const NavBarMenuItem: React.FC<Props> = React.memo(
  ({ currentPage, pageType, onClick }) => {
    console.log("menu");
    return (
      <Block {...divInsideNav} onClick={onClick}>
        <Block
          {...spanInsideNav}
          overrides={{
            Block: {
              style:
                currentPage === pageType ? navActiveItem : navNonActiveItem,
            },
          }}
        >
          {pageType}
        </Block>
      </Block>
    );
  },
  menuItemChanged
);
