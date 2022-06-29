// lib
import * as React from "react";
import Router from "next/router";

// components
import { Block } from "baseui/block";
import { FiArrowLeft } from "react-icons/fi";

// styles
import {
  HEADER_BAR_LEFT_WRAPPER_OVERRIDES,
  BACK_ICON_OVERRIDES,
  HEADER_BAR_OVERRIDES,
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
      <Block overrides={HEADER_BAR_OVERRIDES}>
        <Block overrides={HEADER_BAR_LEFT_WRAPPER_OVERRIDES}>
          <Block
            overrides={BACK_ICON_OVERRIDES}
            onClick={() => {
              Router.push("/");
            }}
          >
            <FiArrowLeft size={22} />
          </Block>
          <Block className="header">{headerText}</Block>
        </Block>
      </Block>
    );
  }
);
