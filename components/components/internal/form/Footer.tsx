import { Block } from "baseui/block";
import * as React from "react";

export const Footer = React.memo((props: any) => {
  return (
    <Block
      overrides={{
        Block: {
          style: {
            display: "flex",
            flexDirection: "row-reverse",
            right: 0,
            alignItems: "center",
            paddingBottom: "20px",
          },
          props: {
            className: "footer-bar",
          },
        },
      }}
    >
      <Block
        overrides={{
          Block: {
            style: {
              marginLeft: "20px",
              width: "92px",
              height: "34px",
            },
            props: {
              className: "primary-button",
            },
          },
        }}
        onClick={props.handleSubmit}
      >
        Save{" "}
      </Block>
      <Block
        overrides={{
          Block: {
            style: {
              marginLeft: "20px",
              width: "92px",
              height: "34px",
            },
            props: {
              className: "secondary-button",
            },
          },
        }}
        onClick={props.handleCancel}
      >
        Cancel
      </Block>
    </Block>
  );
});
