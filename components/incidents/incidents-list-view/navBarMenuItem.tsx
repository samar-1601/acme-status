import {
  divInsideNav,
  spanInsideNav,
  navActiveItem,
  notActiveNavItem,
} from "./styles/navStyles";
import { Block } from "baseui/block";

interface Props {
currentPage:string;
  pageType: string;
  onClick: any;
}
export const NavBarMenuItem: React.FC<Props> = ({currentPage, pageType, onClick }) => {
  return (
    <Block {...divInsideNav} onClick={onClick}>
      <Block
        {...spanInsideNav}
        overrides={{
          Block: {
            style: currentPage === pageType? navActiveItem : notActiveNavItem,
          },
        }}
      >
        {pageType}
      </Block>
    </Block>
  );
};
