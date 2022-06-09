import { FormControl } from "baseui/form-control";
import SelectStatusComponent from "./SelectStatusComponent";
import React from "react";
import { ComponentsAffectedProps } from "../../../variableTypes";
import { Block } from "baseui/block";

const label = <Block>Components Affected</Block>;

export default function ComponentsAffected(props: ComponentsAffectedProps) {
  return (
    <FormControl
      label={label}
      overrides={{
        ControlContainer: {
          style: ({ $theme }) => ({
            borderStyle: "solid none",
            borderColor: $theme.colors.borderOpaque,
          }),
        },
      }}
    >
      <div>
        {props.componentList.map((item) => {
          return (
            <SelectStatusComponent
              key={item.id}
              name={item.compName}
              id={item.id}
              type={item.compType}
              selected={item.selected}
              toggleCheckBox={(event: React.SyntheticEvent) =>
                props.toggleCheckBox(event)
              }
              changeOption={(event: React.SyntheticEvent, compId: Number) =>
                props.changeOption(event, compId)
              }
            />
          );
        })}
      </div>
    </FormControl>
  );
}
