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

interface Props {
  currentPage: string;
  pageType: string;
  onClick: any;
}

export const NavBarMenuItem: React.FC<Props> = React.memo(({
  currentPage,
  pageType,
  onClick,
}) => {
  console.log("nav")
  return (
    <Block {...divInsideNav} onClick={onClick}>
      <Block
        {...spanInsideNav}
        overrides={{
          Block: {
            style: currentPage === pageType ? navActiveItem : navNonActiveItem,
          },
        }}
      >
        {pageType}
      </Block>
    </Block>
  );
});
