// components
import { Block } from "baseui/block";
import Router from "next/router";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";

// styles
import {
  HEADER_BAR_LEFT_WRAPPER_OVERRIDES,
  BACK_ICON_OVERRIDES,
} from "../../overrides/navStyles";

interface Props {
  /**
   * Text for the header
   */
  headerText: string;
}
export const HeaderBarText: React.FC<Props> = React.memo(({ headerText }) => {
  return (
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
  );
});
