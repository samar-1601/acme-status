// lib
import * as React from "react";

// components
import { Block } from "baseui/block";
import { FiArrowLeft } from "react-icons/fi";

// styles
import {
  headerBarLeftWrapper,
  headerBarBackIcon,
  headerBar,
} from "../overrides/navStyles";

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
            <FiArrowLeft size={22} />
          </Block>
          <Block className="header">{headerText}</Block>
        </Block>
      </Block>
    );
  }
);
