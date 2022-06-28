import { Block } from "baseui/block";
import { Select } from "baseui/select";
import * as React from "react";
import { ITEMS } from "../../../../../constants";
import { componentStyle } from "../../../../incidents/internal/form/styles/BlockStyles";
import { inputStatusStyle } from "../../overrides/componentFormStyles";

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
  console.log(options);

  return (
    <Block {...componentStyle}>
      <Select
        options={options}
        backspaceRemoves={false}
        clearable={false}
        searchable={false}
        placeholder="Select Component Status"
        value={[options[props.id]]}
        onChange={(event) => {
          props.handleStatusChange(event);
        }}
        {...inputStatusStyle}
      />
    </Block>
  );
});
