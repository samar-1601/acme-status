import * as React from "react";
import { Block } from "baseui/block";
import { headerStyles } from "../../overrides/componentFormStyles";

export const Header = React.memo((props: any) => {
  console.log(props.addComponent);
  let heading = "Edit Component";
  if (props.addComponent) heading = "Add Component";
  return (
    <Block className="header" {...headerStyles}>
      {heading}
    </Block>
  );
});
