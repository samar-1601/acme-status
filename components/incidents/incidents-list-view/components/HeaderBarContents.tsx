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
        <Block {...headerBarBackIcon}>
          <Avatar
            name="Back"
            size="scale900"
            src="https://img.icons8.com/flat-round/64/undefined/back--v1.png"
          />
        </Block>
        \ <Block {...headerBarText}>{headerText}</Block>
      </Block>
    );
  }
);
