// lib
import * as React from "react";

// styles
import {
  NAV_BAR_MENU_ITEM_WRAPPER_OVERRIDES,
  ACTIVE_NAV_ITEM_OVERRIDES,
  NON_ACTIVE_NAV_ITEM_OVERRIDES,
} from "../../overrides/navStyles";

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
      <Block overrides={NAV_BAR_MENU_ITEM_WRAPPER_OVERRIDES} onClick={onClick}>
        <Block
          onClick={onClick}
          overrides={{
            Block: {
              style:
                currentPage === pageType
                  ? ACTIVE_NAV_ITEM_OVERRIDES
                  : NON_ACTIVE_NAV_ITEM_OVERRIDES, // toggle the style based on the active page
            },
          }}
        >
          {pageType}
        </Block>
      </Block>
    );
  }
);
