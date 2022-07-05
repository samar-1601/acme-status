import { Block } from "baseui/block";
import * as React from "react";
import { CANCEL_BUTTON, FOOTER_WRAPPER, SAVE_BUTTON } from "../../overrides/componentFormStyles";

export const Footer = React.memo((props: any) => {
  return (
    <Block
      overrides={FOOTER_WRAPPER}
    >
      <Block
        overrides={SAVE_BUTTON}
        onClick={props.handleSubmit}
      >
        {props.addComponent?"Save":"Update"}
      </Block>
      <Block
        overrides={CANCEL_BUTTON}
        onClick={props.handleCancel}
      >
        Cancel
      </Block>
    </Block>
  );
});
