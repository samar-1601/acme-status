import * as React from "react";
import { FormControl } from "baseui/form-control";
import { Input, SIZE } from "baseui/input";
import { IncidentNameProps } from "../../../variableTypes";

function propsareEqual(
  prevprops: IncidentNameProps,
  nextprops: IncidentNameProps
) {
  return prevprops.value === nextprops.value;
}

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
      />
    </FormControl>
  );
}, propsareEqual);
