//lib
import * as React from "react";

//components
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";

//constants
import { IncidentMessageProps } from "../../../variableTypes";

//styles
import { messageFormControlStyle } from "./styles/FormControlStyles";

/**
 * IncidentMessage Component
 * @params props contains:
 * value: string
 * updateIncidentMessage: Function
 */
export const IncidentMessage = React.memo((props: IncidentMessageProps) => {
  return (
    <FormControl label={"Message"} overrides={{ ...messageFormControlStyle }}>
      <Textarea
        value={props.value}
        onChange={(event) => {
          props.updateIncidentMessage(event);
        }}
        placeholder={"We are currently investigating this issue."}
      />
    </FormControl>
  );
});
