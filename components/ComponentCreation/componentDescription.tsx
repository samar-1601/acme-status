import * as React from "react";
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { useStyletron } from "styletron-react";

export const ComponentDescription = React.memo((props: any) => {
  console.log(props)
  const [css] = useStyletron();
  return (
      <FormControl
        label="Description (optional)"
        caption="Give a helpful description of what this component does"
      >
        <textarea
          value={props.value}
          onChange={e=>props.handleDescriptionChange(e)}
          placeholder={"Frontend application and API servers"}
          className={css({
            resize: "none",
            width: "100%",
            height: "96px",
            font: "inhertit",
            borderRadius: "8px",
            backgroundColor: "white",
            borderColor: "#E6E6E9",
            fontSize: "inhertit",
            padding: "10px 14px 10px 14px",
            boxSizing: "border-box",
            borderWidth: "1px",
            ":hover": {
              borderColor: "#0E61F6",
            },
            ".focus": {
              borderColor: "#0E61F6",
            },
          })}
        />
      </FormControl>
  );
});