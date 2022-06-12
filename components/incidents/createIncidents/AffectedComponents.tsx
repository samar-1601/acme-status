import React, { useEffect } from "react";
import { ComponentsAffectedProps } from "../../../variableTypes";
import { SelectStatusComponent } from "./SelectStatusComponent";
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";

function propsAreEqual(
  prevProps: ComponentsAffectedProps,
  nextProps: ComponentsAffectedProps
) {
  return (
    prevProps.componentList.length === prevProps.componentList.length &&
    prevProps.componentList.every(
      (value, index) => value === nextProps.componentList[index]
    )
  );
}

const label = <Block>Components Affected</Block>;

export const AffectedComponents = React.memo(
  (props: ComponentsAffectedProps) => {
    // useEffect(() => {
    //   console.log("Here is a problem!!!");
    // }, [props.toggleCheckBox]);
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
                toggleCheckBox={props.toggleCheckBox}
                changeOption={props.changeOption}
              />
            );
          })}
        </div>
      </FormControl>
    );
  },
  propsAreEqual
);
