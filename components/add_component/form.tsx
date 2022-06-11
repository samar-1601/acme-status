import * as React from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {Textarea} from 'baseui/textarea';

export const Form = function () {
  return (
    <FormControl
      label={() => "Component name"}
    >
      <Input />
    </FormControl>
  );
}

export const Description  = function () {
  const [value, setValue] = React.useState('');
  return (
    <FormControl label="Description (optional)" caption="Give a helpful description of what this component does">
      <Textarea
        id="textarea-id"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      />
    </FormControl>
  );
}
