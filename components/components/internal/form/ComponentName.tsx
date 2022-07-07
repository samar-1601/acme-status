// lib
import * as React from "react";

// components
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";

// styles
import { INPUT_NAME_STYLE } from "../../overrides/componentFormStyles";

export const ComponentName = React.memo((props: any) => {
  return (
    <FormControl label="Component name">
      <Input overrides={INPUT_NAME_STYLE}
        id="input-id"
        value={props.value}
        onChange={props.handleNameChange}
        placeholder="Component name"
      />
    </FormControl>
  );
});
