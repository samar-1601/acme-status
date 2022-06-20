//lib
import * as React from "react";

//components
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";

//constants
import { IncidentNameProps } from "../../../variableTypes";

//styles
import { inputBorder } from "./styles/InputStyles";

/**
 * IncidentName Component
 * @params props contains:
 * updateIncident : Funtion
 * incidentStatus : string
 */
export const IncidentName = React.memo((props: IncidentNameProps) => {
  return (
    <FormControl
      label={"Incident Name"}
      caption={"This incident will be posted to page Acme"}
    >
      <Input
        onChange={(event) => {
          props.handleNameChange(event);
        }}
        value={props.value}
        placeholder={"Incident Name"}
        {...inputBorder}
      />
    </FormControl>
  );
});
