// lib
import * as React from "react";

// components
import { Block } from "baseui/block";
import { Avatar } from "baseui/avatar";
import Link from "next/dist/client/link";

// styles
import {
  headerBar,
  headerBarBackIcon,
  headerBarText,
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
        <Link href="">
          <Block {...headerBarBackIcon}>
            <span className="material-symbols-outlined">arrow_back</span>
          </Block>
        </Link>
        <Block {...headerBarText}>{headerText}</Block>
      </Block>
    );
  }
);
