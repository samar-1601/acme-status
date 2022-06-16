// lib
import * as React from "react";

// components
import { Block } from "baseui/block";

// styles
import { headerBar } from "./styles/navStyles";

interface Props {
  headerText: string; // text to render in the header
}

/**
 * React component to render the HeaderText on the top of the fixed navigation bar
 */
export const HeaderBarText: React.FC<Props> = React.memo(({ headerText }) => {
  return (
    <Block {...headerBar}>
      <h1>{headerText}</h1>
    </Block>
  );
});
