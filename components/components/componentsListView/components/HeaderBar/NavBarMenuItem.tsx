// lib
import * as React from "react";

// components
import { Block } from "baseui/block";

// styles
import {
  DIV_INSIDE_NAV,
  DIV_INSIDE_NAV_DISABLED,
  navActiveItem,
  navNonActiveItem,
  spanInsideNav,
} from "../../overrides/componentListStyles";

interface Props {
  currentPage: string;
  pageType: string;
  onClick: any;
  disabled: Boolean;
}

export const NavBarMenuItem: React.FC<Props> = React.memo(
  ({ currentPage, pageType, onClick, disabled }) => {
    if (!disabled) {
      return (
        <Block overrides={DIV_INSIDE_NAV} onClick={onClick}>
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
    } else {
      return (
        <Block overrides={DIV_INSIDE_NAV_DISABLED} onClick={onClick}>
          <Block 
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
    }
  }
);
