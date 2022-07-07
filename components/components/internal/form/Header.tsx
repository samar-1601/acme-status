// lib
import * as React from "react";

// components
import { Block } from "baseui/block";

// styles
import { HEADER_STYLES } from "../overrides/componentFormStyles";

export const Header = React.memo((props: any) => {
  console.log(props.addComponent);
  let heading = "Edit Component";
  if (props.addComponent) heading = "Add Component";
  return (
    <Block className="header" overrides={HEADER_STYLES}>
      {heading}
    </Block>
  );
});
