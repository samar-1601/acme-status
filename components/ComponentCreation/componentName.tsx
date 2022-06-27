import * as React from "react";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";

import { inputNameStyle } from "./componentCreationStyles";

export const ComponentName = React.memo((props: any) => {
  return(
    <FormControl label="Component name">
      <Input
        id="input-id"
        value={props.value}
        onChange={props.handleNameChange}
        placeholder="Component name"
        {...inputNameStyle}
      />
    </FormControl>
  )
});