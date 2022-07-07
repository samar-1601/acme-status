// lib
import * as React from "react";

// components
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { Select } from "baseui/select";

// styles
import {
  COMPONENT_OVERRIDES,
  INPUT_STATUS_STYLE,
} from "../overrides/componentFormStyles";

// constants
import { ITEMS } from "../../../../constants";

function Image(props: any) {
  return (
    <Block overrides={{ Block: { style: { display: "flex" } } }}>
      <img className="h-6 w-6 mr-1.5" src={props.imgUrl} />{" "}
      <Block>{props.title}</Block>
    </Block>
  );
}

export const ComponentStatus = React.memo((props: any) => {
  const options = ITEMS.map((item, idx) => {
    return {
      label: (
        <Image key={item.imgUrl} title={item.title} imgUrl={item.imgUrl} />
      ),
      id: idx,
    };
  });

  return (
    <FormControl label="Component Status">
      <Block overrides={COMPONENT_OVERRIDES}>
        <Select
          overrides={INPUT_STATUS_STYLE}
          options={options}
          backspaceRemoves={false}
          clearable={false}
          searchable={false}
          placeholder="Select Component Status"
          value={[options[props.id]]}
          onChange={(event) => {
            props.handleStatusChange(event);
          }}
        />
      </Block>
    </FormControl>
  );
});
