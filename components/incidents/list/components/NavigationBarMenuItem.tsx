// lib
import * as React from "react";

// styles
import {
  divInsideNav,
  spanInsideNav,
  navActiveItem,
  navNonActiveItem,
} from "../overrides/navStyles";

// components
import { Block } from "baseui/block";

// props for NavBarMenuItems
interface Props {
  currentPage: string;
  pageType: string;
  onClick: any;
}

/**
 * Returns a NavbarMenu item based on the Props passed
 * React.Memo to reduced unnecessary renders
 */
export const NavBarMenuItem: React.FC<Props> = React.memo(
  ({ currentPage, pageType, onClick }) => {
    return (
      <Block {...divInsideNav} onClick={onClick}>
        <Block
          {...spanInsideNav}
          overrides={{
            Block: {
              style:
                currentPage === pageType ? navActiveItem : navNonActiveItem, // toggle the style based on the active page
            },
          }}
        >
          {pageType}
        </Block>
      </Block>
    );
  }
);
