import React, { useCallback, useEffect } from "react";
import { ComponentsAffectedProps } from "../../../variableTypes";
import { SelectStatusComponent } from "./SelectStatusComponent";
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";

const label = <Block>Components Affected</Block>;

export const AffectedComponents = React.memo(
  (props: ComponentsAffectedProps) => {
    const handleChange = useCallback(
      (idx: number, selected: boolean, optionType: number) => {
        const newComponentsAffected = props.componentList.map(
          (value, index) => {
            if (index == idx) {
              return {
                compName: value.compName,
                compType: optionType,
                id: value.id,
                compId: value.compId,
                selected: selected,
              };
            } else {
              return value;
            }
          }
        );
        props.handleComponentUpdate(newComponentsAffected);
      },
      [props.componentList]
    );
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
                handleChange={handleChange}
              />
            );
          })}
        </div>
      </FormControl>
    );
  }
);
