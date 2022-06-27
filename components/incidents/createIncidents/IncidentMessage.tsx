//lib
import * as React from "react";

//components
import { FormControl } from "baseui/form-control";

//constants
import { IncidentMessageProps } from "../../../variableTypes";

//styles
import { StyledTextArea } from "./styles/StyledTextArea";

/**
 * IncidentMessage Component
 * @params props contains:
 * value: string
 * updateIncidentMessage: Function
 */

export const IncidentMessage = React.memo((props: IncidentMessageProps) => {
  //as we cannot overload directly the root of Textarea we create a custom component and display it

  return (
    <FormControl label={"Message"}>
      <StyledTextArea
        value={props.value}
        updateIncidentMessage={props.updateIncidentMessage}
      />
    </FormControl>
  );
});
