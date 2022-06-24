//lib
import * as React from "react";

//components
import { FormControl } from "baseui/form-control";

//constants
import { IncidentMessageProps } from "../../../variableTypes";

//styles
import { useStyletron } from "styletron-react";

/**
 * IncidentMessage Component
 * @params props contains:
 * value: string
 * updateIncidentMessage: Function
 */

export const IncidentMessage = React.memo((props: IncidentMessageProps) => {
  //as we cannot overload directly the root of Textarea we create a custom component and display it
  const [css] = useStyletron();

  return (
    <FormControl label={"Message"}>
      <textarea
        value={props.value}
        onChange={(event) => {
          props.updateIncidentMessage(event);
        }}
        placeholder={"We are currently investigating this issue."}
        className={css({
          resize: "none",
          width: "100%",
          height: "96px",
          font: "inherit",
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
