// lib
import * as React from "react";

// components
import { Block } from "baseui/block";

// styles
import { headerBar } from "./styles/navStyles";

interface Props {
  headerText: string;
}
export const HeaderBarText: React.FC<Props> = React.memo(({ headerText }) => {
  console.log("headerText rendered");
  return (
    <Block {...headerBar}>
      <h1>{headerText}</h1>
    </Block>
  );
});
