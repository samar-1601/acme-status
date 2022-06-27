import { Block } from "baseui/block";
import * as React from "react";
import { divInsideNav, navActiveItem, navNonActiveItem, spanInsideNav } from "./componentStyles";


interface Props {
  currentPage: string;
  pageType: string;
  onClick: any;
}

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