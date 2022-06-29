import { Block } from "baseui/block";
import * as React from "react";
import {
  divInsideNav,
  divInsideNavDisabled,
  navActiveItem,
  navNonActiveItem,
  spanInsideNav,
} from "../overrides/componentListStyles";

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
    } else {
      return (
        <Block {...divInsideNavDisabled} onClick={onClick}>
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
    }
  }
);
