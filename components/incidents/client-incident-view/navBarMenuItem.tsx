// styles
import {
  divInsideNav,
  spanInsideNav,
  navActiveItem,
  navNonActiveItem,
} from "./styles/container";

// components
import { Block } from "baseui/block";

interface Props {
  currentPage: string;
  pageType: string;
  onClick: any;
}

export const NavBarMenuItem: React.FC<Props> = ({
  currentPage,
  pageType,
  onClick,
}) => {
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
};
