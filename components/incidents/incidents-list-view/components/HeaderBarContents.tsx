// lib
import * as React from "react";

// components
import { Block } from "baseui/block";
import Image from "next/image";

// styles
import {
  headerBarLeftWrapper,
  headerBarBackIcon,
  headerBarText,
  headerBar,
} from "../styles/navStyles";

interface Props {
  headerText: string; // text to render in the header
}

/**
 * React component to render the HeaderText on the top of the fixed navigation bar
 */
export const HeaderBarContents: React.FC<Props> = React.memo(
  ({ headerText }) => {
    return (
      <Block {...headerBar}>
        <Block {...headerBarLeftWrapper}>
          <Block {...headerBarBackIcon}>
            <Image width="32px" height="32px" src="/backArrow.png"></Image>
          </Block>
          <Block {...headerBarText} className="header">
            {headerText}
          </Block>
        </Block>
      </Block>
    );
  }
);
