// lib
import * as React from "react";

// components
import { Block } from "baseui/block";

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
        <Block {...headerBarBackIcon} className="material-symbols-outlined">arrow_back
        </Block>
        <Block {...headerBarText}>{headerText}</Block>
      </Block>
    );
  }
);
